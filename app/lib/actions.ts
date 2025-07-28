"use server";

import { auth, signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { IssueCreate, UpdateProfileSchema, UserCreate } from "./schema";
import { sql } from "./db";
import { findUserByEmail } from "./data";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

/* CRUD Interactions ──────────── */

export async function createIssue(formData: FormData): Promise<{ ok: boolean, message: string, fieldErrors?: any }> {
   const session = await auth();
   if (!session || !session.user) return redirect('/login');

   const user = await findUserByEmail(session.user?.email ?? '')

   console.log('createIssue', 'formData', formData);

   const parsed = IssueCreate.safeParse({
      title: formData.get('title'),
      description: formData.get('description'),
      status: formData.get('status') || 'open',
      neighborhood_id: user?.neighborhood_id || null,
      user_id: user?.id || null
   })

   if (!parsed.success) {
      console.error('createIssue', 'validation error', parsed.error.flatten().fieldErrors);
      return {
         ok: false,
         message: "Validation failed. Check for errors.",
         fieldErrors: parsed.error.flatten().fieldErrors
      };
   }

   try {
      await sql`
         INSERT INTO issues ("title", "description", "status", "neighborhood_id")
         VALUES (${parsed.data.title}, ${parsed.data.description}, ${parsed.data.status}, ${parsed.data.neighborhood_id})
      `;

      return { ok: true, message: "Issue created successfully" };
   } catch (error) {
      console.log(error);
      return { ok: false, message: "Failed to create issue" };
   }
}

export async function updateProfile(formData: FormData): Promise<{ ok: boolean, message: string, fieldErrors?: any }> {
   const session = await auth();
   if (!session || !session.user) return redirect('/login');

   console.log('updateProfile', 'formData', formData);

   const parsed = UpdateProfileSchema.safeParse({
      id: formData.get('id'),
      full_name: formData.get('full_name'),
      neighborhood_id: formData.get('neighborhood_id'),
   })

   if (!parsed.success) {
      console.error('updateProfile', 'validation error', parsed.error.flatten().fieldErrors);
      return {
         ok: false,
         message: "Validation failed. Check for errors.",
         fieldErrors: parsed.error.flatten().fieldErrors
      };
   }

   try {
      const users = await sql`
         SELECT "id" FROM users WHERE "id" = ${parsed.data.id}
      `;
      if (users.length === 0) {
         return { ok: false, message: "User not found" };
      }

      await sql`
         UPDATE users SET
         "full_name" = ${parsed.data.full_name},
         "neighborhood_id" = ${parsed.data.neighborhood_id}
         WHERE "id" = ${parsed.data.id};
      `;

      return { ok: true, message: "Profile updated successfully" }
   } catch (error) {
      console.log(error);
      return { ok: false, message: "Failed to update profile" }
   }
}

export async function createAccount(
   _prevState: {
      error: string,
      formData: { full_name: string, email: string, password: string },
      fieldErrors?: any
   } | { ok: boolean } | undefined,
   formData: FormData,
) {
   console.log('createAccount', 'formData', formData);

   const formatted = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      full_name: formData.get('full_name') as string,
   }

   const parsed = UserCreate.safeParse(formatted);

   if (!parsed.success) {
      console.error('createAccount', 'validation error', parsed.error.flatten().fieldErrors);
      return {
         error: "Validation failed. Check for errors.",
         formData: { ...formatted },
         fieldErrors: parsed.error.flatten().fieldErrors,
      };
   }

   try {
      const users = await sql`
         SELECT "id", "email" FROM users WHERE "email" = ${parsed.data.email};
      `;

      if (users.length > 0) {
         return {
            error: "User with email already exists",
            formData: { ...formatted },
         }
      }

      const hash = await bcrypt.hash(parsed.data.password, 10);
      await sql`
         INSERT INTO users("full_name", "email", "password", "neighborhood_id")
         VALUES(${parsed.data.full_name}, ${parsed.data.email}, ${hash}, ${null})
      `;

      return { ok: true }
   } catch (error) {
      return {
         error: "Unexpected server error",
         formData: { ...formatted }
      }
   }
}


/* Other actions ──────────────── */
export async function handleUpvoteIssue(issue_id: string): Promise<{ ok: false, message: string } | { ok: true, action: 'upvoted' | 'removed_upvote' }> {
   const session = await auth();
   if (!session || !session.user) return redirect('/login');

   const user = await findUserByEmail(session.user?.email)
   if (user === null) {
      return { ok: false, message: "Failed to upvote" }
   }

   try {
      const already = await sql`
         SELECT "issue_id", "user_id" FROM issue_upvotes WHERE "user_id" = ${user.id} AND "issue_id" = ${issue_id};
      `;

      if (already.length > 1) {
         return { ok: false, message: "Failed to upvote" }
      }
      if (already.length === 1) {
         await sql`
            DELETE FROM issue_upvotes
            WHERE "user_id" = ${user.id} AND "issue_id" = ${issue_id};
         `;

         revalidatePath("/issues")
         revalidatePath(`/issues/${issue_id}`)
         return { ok: true, action: 'removed_upvote' }
      }
      await sql`
         INSERT INTO issue_upvotes("user_id", "issue_id")
         VALUES(${user.id}, ${issue_id})
      `;

      revalidatePath("/issues")
      revalidatePath(`/issues/${issue_id}`)
      return { ok: true, action: 'upvoted' }
   } catch (error) {
      console.log(error);
      return { ok: false, message: "Failed to upvote. Server error." }
   }
}

export async function authenticate(
   _prevState: { error: string, formData: { email: string, password: string } } | undefined,
   formData: FormData,
) {
   try {
      await signIn('credentials', formData);
   } catch (error) {
      if (error instanceof AuthError && error.type === 'CredentialsSignin')
         return { error: 'Invalid email or password', formData: { email: formData.get('email') as string, password: formData.get('password') as string } };

      throw error;
   }
}
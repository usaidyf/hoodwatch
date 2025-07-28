"use server";

import { auth } from "@/auth";
import { sql } from "./db";
import type { IssueType, NeighborhoodType } from "./types";
import { redirect } from "next/navigation";

export async function findUserByEmail(email?: string | null): Promise<User | null> {
   if (email === undefined || email === null) return null;

   try {
      const [user] = await sql<User[]>`
         SELECT
            "id",
            "full_name",
            "email",
            "password",
            "created_at",
            "neighborhood_id"
         FROM users WHERE email = ${email};
      `;

      if (user === undefined) return null;
      return user;
   } catch (error) {
      console.error("Error finding user by email:", error);
      return null;
   }
}

export async function fetchNeighborhoodById(id: string): Promise<NeighborhoodType | null> {
   try {
      const [neighborhood] = await sql<NeighborhoodType[]>`
         SELECT
            "full_name",
            "address",
            "description",
            "city",
            "state",
            "country",
            "postal_code"
         FROM neighborhoods WHERE "id" = ${id};
      `;

      if (neighborhood === undefined) return null;
      return neighborhood;
   } catch (error) {
      console.error("Error finding neighborhood by id:", error);
      return null;
   }
}

export async function fetchNeighborhoods(): Promise<NeighborhoodType[] | null> {
   // return null;
   try {
      const neighborhoods = await sql<NeighborhoodType[]>`
         SELECT
            "id",
            "full_name",
            "address",
            "description",
            "city",
            "state",
            "country",
            "postal_code"
         FROM neighborhoods;
      `;

      return neighborhoods;
   } catch (error) {
      console.error("Error fetching neighborhoods:", error);
      return null;
   }
}

export async function fetchIssuesByNeighborhood(neighborhood_id: string): Promise<(IssueType & { upvoteCount: number })[] | null> {
   try {
      const issues = await sql<(IssueType & { upvoteCount: number })[]>`
         SELECT
            i."id",
            i."title",
            i."description",
            i."status",
            i."updated_at",
            i."created_at",
            COALESCE(u.upvote_count, 0)  AS "upvoteCount"
         FROM issues AS i
         LEFT JOIN (
            SELECT issue_id, COUNT(*) AS upvote_count
            FROM   issue_upvotes
            GROUP  BY issue_id
         ) AS u ON u.issue_id = i."id"
         WHERE i."neighborhood_id" = ${neighborhood_id};
      `;

      return issues;
   } catch (error) {
      console.error("Error finding issues by neighborhood id:", error);
      return null;
   }
}

export async function hasUpvotedIssue(issue_id: string): Promise<boolean> {
   const session = await auth();
   if (!session || !session.user) return redirect('/login');

   const user = await findUserByEmail(session.user?.email)
   if (!user) return false;

   try {
      const has = await sql`
         SELECT "user_id" FROM issue_upvotes WHERE "user_id" = ${user.id} AND "issue_id" = ${issue_id};
      `;
      if (has.length > 0) {
         return true
      }
      return false;
   } catch(error) {
      console.log(error);
      return false;
   }
}
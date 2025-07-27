import { z } from 'zod';

export const UserSchema = z.object({
   id: z.uuid(),
   full_name: z.string().min(3, { error: "Full name can't have less than 3 characters" }),
   email: z.email(),
   neighborhood_id: z.uuid().nullable(),
   created_at: z.string(),
})

export const IssueSchema = z.object({
   id: z.uuid(),
   title: z.string().min(3, { error: "At least 3 characters required" }).max(100, { error: "Title can't have more than 100 characters" }),
   description: z.string().max(1000, { error: "Description can't have more than 1000 characters" }),
   status: z.enum(['open', 'resolved', 'closed']),
   neighborhood_id: z.uuid(),
   user_id: z.uuid().nullable(),
   updated_at: z.string(),
   created_at: z.string(),
});

export const NeighborhoodSchema = z.object({
   id: z.uuid(),
   full_name: z.string(),
   address: z.string(),
   description: z.string(),
   city: z.string().max(100),
   state: z.string().max(100),
   country: z.string().max(100),
   postal_code: z.string().max(20),
   created_at: z.string(),
})


export const UpdateProfileSchema = UserSchema.omit({ email: true, created_at: true })
export const UpdatePassword = UserSchema.omit({ created_at: true }).extend({
   password: z.string().min(8, { error: "At least 8 characters required" })
})

export const IssueCreate = IssueSchema.omit({ id: true, updated_at: true, created_at: true, user_id: true }).extend({
   user_id: z.uuid(),
})
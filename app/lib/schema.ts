import { z } from 'zod';

const IssueSchema = z.object({
   id: z.uuid(),
   title: z.string().min(3, { message: "At least 3 characters required" }).max(100, { message: "Title can't have more than 100 characters" }),
   description: z.string().max(1000, { message: "Description can't have more than 1000 characters" }),
   status: z.enum(['open', 'resolved', 'closed']),
   neighborhood_id: z.uuid(),
   user_id: z.uuid().nullable(),
   updatedAt: z.string(),
   createdAt: z.string(),
})

export const IssueCreate = IssueSchema.omit({ id: true, updatedAt: true, createdAt: true, user_id: true }).extend({
   user_id: z.uuid(),
})
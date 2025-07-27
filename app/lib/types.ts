import z from "zod";
import { IssueSchema, NeighborhoodSchema } from "./schema";

export type NeighborhoodType = z.infer<typeof NeighborhoodSchema>
export type IssueType = z.infer<typeof IssueSchema>
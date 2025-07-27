import { sql } from "./db";
import type { IssueType, NeighborhoodType } from "./types";

export async function findUserByEmail(email: string): Promise<User | undefined | null> {
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

      return user;
   } catch (error) {
      console.error("Error finding user by email:", error);
      return null;
   }
}

export async function fetchNeighborhoodById(id: string): Promise<NeighborhoodType | undefined | null> {
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

      return neighborhood;
   } catch (error) {
      console.error("Error finding neighborhood by id:", error);
      return null;
   }
}

export async function fetchIssuesByNeighborhood(neighborhood_id: string): Promise<IssueType[] | null> {
   try {
      const issues = await sql<IssueType[]>`
         SELECT
            "title",
            "description",
            "status",
            "updated_at"
         FROM issues WHERE "neighborhood_id" = ${neighborhood_id};
      `;

      return issues;
   } catch (error) {
      console.error("Error finding issues by neighborhood id:", error);
      return null;
   }
}
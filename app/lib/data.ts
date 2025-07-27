import { sql } from "./db";
import type { IssueType, NeighborhoodType } from "./types";

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

export async function fetchIssuesByNeighborhood(neighborhood_id: string): Promise<IssueType[] | null> {
   try {
      const issues = await sql<IssueType[]>`
         SELECT
            "id",
            "title",
            "description",
            "status",
            "updated_at",
            "created_at"
         FROM issues WHERE "neighborhood_id" = ${neighborhood_id};
      `;

      return issues;
   } catch (error) {
      console.error("Error finding issues by neighborhood id:", error);
      return null;
   }
}
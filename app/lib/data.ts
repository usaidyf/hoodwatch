import { sql } from "./db";

export async function findUserByEmail(email: string): Promise<User | null> {
   try {
      const [user] = await sql<User[]>`
         SELECT
            "id",
            "full_name",
            "email",
            "password",
            "created_at"
         FROM users WHERE email = ${email};
      `;

      return user;
   } catch (error) {
      console.error("Error finding user by email:", error);
      return null;
   }
}

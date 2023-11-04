import { and, eq, sql } from "drizzle-orm";
import { db } from ".";
import { accounts } from "./schema/auth";
import { anime } from "./schema/main";

export async function getAccessToken(userId: string) {
  const account = await db.query.accounts.findFirst({
    where: and(eq(accounts.userId, userId), eq(accounts.token_type, "bearer")),
  });
  return account?.access_token;
}

export async function insertAnime(values: {
  slug: string;
  anilistId: number;
  episodes: number;
  image: string | null;
  title: string;
}) {
  await db
    .insert(anime)
    .values(values)
    .onDuplicateKeyUpdate({ set: { id: sql`id` } });
}

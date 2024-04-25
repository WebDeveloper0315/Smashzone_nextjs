import { createKysely } from "@vercel/postgres-kysely";

const db = createKysely<any>();

export default db

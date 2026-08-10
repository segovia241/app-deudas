import * as SQLite from "expo-sqlite";

import { createTableSQL } from "./schema-builder";
import { UsuarioSchema } from "./schema/usuario.schema";

export const dbPromise = SQLite.openDatabaseAsync("gastos.db");

export async function initDatabase() {
  const db = await dbPromise;

  await db.execAsync(createTableSQL(UsuarioSchema));
}

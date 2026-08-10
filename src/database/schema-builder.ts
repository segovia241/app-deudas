import { SQLiteType } from "./types/sqlite-type";

export type ColumnDefinition = {
  type: SQLiteType;
  primaryKey?: boolean;
  autoIncrement?: boolean;
  nullable?: boolean;
  unique?: boolean;
  default?: string | number | boolean | null;
};

export type TableSchema = {
  tableName: string;
  columns: Record<string, ColumnDefinition>;
};

export function createTableSQL(schema: TableSchema): string {
  const columns = Object.entries(schema.columns).map(([columnName, config]) => {
    const parts: string[] = [];

    parts.push(columnName);
    parts.push(config.type);

    if (config.primaryKey) {
      parts.push("PRIMARY KEY");
    }

    if (config.autoIncrement) {
      parts.push("AUTOINCREMENT");
    }

    if (config.nullable === false) {
      parts.push("NOT NULL");
    }

    if (config.unique) {
      parts.push("UNIQUE");
    }

    if (config.default !== undefined) {
      parts.push(`DEFAULT ${formatDefaultValue(config.default)}`);
    }

    return parts.join(" ");
  });

  return `
    CREATE TABLE IF NOT EXISTS ${schema.tableName} (
      ${columns.join(",\n      ")}
    );
  `;
}

function formatDefaultValue(value: string | number | boolean | null): string {
  if (value === null) {
    return "NULL";
  }

  if (typeof value === "string") {
    return `'${value.replace(/'/g, "''")}'`;
  }

  if (typeof value === "boolean") {
    return value ? "1" : "0";
  }

  return String(value);
}

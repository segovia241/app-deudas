import { SQLiteType } from "../types/sqlite-type";

export const UsuarioSchema = {
  tableName: "usuario",

  columns: {
    id_usuario: {
      type: SQLiteType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    nombre: {
      type: SQLiteType.TEXT,
      nullable: false,
    },

    moneda: {
      type: SQLiteType.TEXT,
      nullable: false,
      default: "PEN",
    },

    saldo_actual: {
      type: SQLiteType.REAL,
      nullable: false,
      default: 0,
    },

    ingreso_min_mensual: {
      type: SQLiteType.REAL,
      nullable: false,
      default: 0,
    },

    ingreso_meta_diaria: {
      type: SQLiteType.REAL,
      nullable: false,
      default: 0,
    },
  },
} as const;

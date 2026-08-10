export const UsuarioDB = {
  table: "usuario",

  columns: {
    id: "id_usuario",
    nombre: "nombre",
    moneda: "moneda",
    saldoActual: "saldo_actual",
    ingresoMinMensual: "ingreso_min_mensual",
    ingresoMetaDiaria: "ingreso_meta_diaria",
  },
} as const;

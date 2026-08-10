export interface Usuario {
  id_usuario?: number;
  nombre: string;
  moneda: string;
  saldo_actual: number;
  ingreso_min_mensual: number;
  ingreso_meta_diaria: number;
}

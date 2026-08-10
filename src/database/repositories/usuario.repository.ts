import { Usuario } from "../../models/usuario";

import {
  queryActualizarIngresoMetaDiaria,
  queryActualizarIngresoMinMensual,
  queryActualizarMoneda,
  queryActualizarNombre,
  queryActualizarSaldoActual,
  queryCrearUsuario,
  queryObtenerUsuario,
} from "../queries/usuario.queries";

export async function obtenerUsuario(): Promise<Usuario | null> {
  return await queryObtenerUsuario();
}

export async function actualizarNombre(nombre: string) {
  return await queryActualizarNombre(nombre);
}

export async function actualizarMoneda(moneda: string) {
  return await queryActualizarMoneda(moneda);
}

export async function actualizarSaldoActual(saldoActual: number) {
  return await queryActualizarSaldoActual(saldoActual);
}

export async function actualizarIngresoMinMensual(ingresoMinMensual: number) {
  return await queryActualizarIngresoMinMensual(ingresoMinMensual);
}

export async function actualizarIngresoMetaDiaria(ingresoMetaDiaria: number) {
  return await queryActualizarIngresoMetaDiaria(ingresoMetaDiaria);
}

export async function crearUsuario() {
  return await queryCrearUsuario();
}

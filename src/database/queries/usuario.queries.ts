import { Usuario } from "../../models/usuario";
import { UsuarioDB } from "../constants/usuario-db.constants";
import { dbPromise } from "../db";

async function queryObtenerIdUsuario(): Promise<number | null> {
  const db = await dbPromise;

  const resultado = await db.getFirstAsync<{ id_usuario: number }>(
    `
    SELECT ${UsuarioDB.columns.id}
    FROM ${UsuarioDB.table}
    ORDER BY ${UsuarioDB.columns.id} ASC
    LIMIT 1
    `,
  );

  return resultado?.id_usuario ?? null;
}

export async function queryObtenerUsuario(): Promise<Usuario | null> {
  const db = await dbPromise;

  const idUsuario = await queryObtenerIdUsuario();

  if (idUsuario === null) {
    return null;
  }

  return await db.getFirstAsync<Usuario>(
    `
    SELECT *
    FROM ${UsuarioDB.table}
    WHERE ${UsuarioDB.columns.id} = ?
    `,
    idUsuario,
  );
}

export async function queryActualizarNombre(nombre: string) {
  const db = await dbPromise;

  const idUsuario = await queryObtenerIdUsuario();

  if (idUsuario === null) {
    return null;
  }

  return await db.runAsync(
    `
    UPDATE ${UsuarioDB.table}
    SET ${UsuarioDB.columns.nombre} = ?
    WHERE ${UsuarioDB.columns.id} = ?
    `,
    nombre,
    idUsuario,
  );
}

export async function queryActualizarMoneda(moneda: string) {
  const db = await dbPromise;

  const idUsuario = await queryObtenerIdUsuario();

  if (idUsuario === null) {
    return null;
  }

  return await db.runAsync(
    `
    UPDATE ${UsuarioDB.table}
    SET ${UsuarioDB.columns.moneda} = ?
    WHERE ${UsuarioDB.columns.id} = ?
    `,
    moneda,
    idUsuario,
  );
}

export async function queryActualizarSaldoActual(saldoActual: number) {
  const db = await dbPromise;

  const idUsuario = await queryObtenerIdUsuario();

  if (idUsuario === null) {
    return null;
  }

  return await db.runAsync(
    `
    UPDATE ${UsuarioDB.table}
    SET ${UsuarioDB.columns.saldoActual} = ?
    WHERE ${UsuarioDB.columns.id} = ?
    `,
    saldoActual,
    idUsuario,
  );
}

export async function queryActualizarIngresoMinMensual(
  ingresoMinMensual: number,
) {
  const db = await dbPromise;

  const idUsuario = await queryObtenerIdUsuario();

  if (idUsuario === null) {
    return null;
  }

  return await db.runAsync(
    `
    UPDATE ${UsuarioDB.table}
    SET ${UsuarioDB.columns.ingresoMinMensual} = ?
    WHERE ${UsuarioDB.columns.id} = ?
    `,
    ingresoMinMensual,
    idUsuario,
  );
}

export async function queryActualizarIngresoMetaDiaria(
  ingresoMetaDiaria: number,
) {
  const db = await dbPromise;

  const idUsuario = await queryObtenerIdUsuario();

  if (idUsuario === null) {
    return null;
  }

  return await db.runAsync(
    `
    UPDATE ${UsuarioDB.table}
    SET ${UsuarioDB.columns.ingresoMetaDiaria} = ?
    WHERE ${UsuarioDB.columns.id} = ?
    `,
    ingresoMetaDiaria,
    idUsuario,
  );
}

export async function queryCrearUsuario() {
  const db = await dbPromise;

  return await db.runAsync(
    `
    INSERT INTO ${UsuarioDB.table} (
      ${UsuarioDB.columns.nombre},
      ${UsuarioDB.columns.moneda},
      ${UsuarioDB.columns.saldoActual},
      ${UsuarioDB.columns.ingresoMinMensual},
      ${UsuarioDB.columns.ingresoMetaDiaria}
    )
    VALUES (?, ?, ?, ?, ?)
    `,
    "",
    "PEN",
    0,
    0,
    0,
  );
}

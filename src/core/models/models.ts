export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
  timestamp: string;
}

export interface PageResponse<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: { sorted: boolean; orderBy: string[] };
  };
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  empty: boolean;
}

export type TipoEntidad = "BANCO" | "SERVICIO";
export type EstadoEntidad = "ACTIVO" | "INACTIVO";

export interface EntidadFinanciera {
  idEntidad: number | null;
  denominacion: string;
  tipoEntidad: TipoEntidad;
  descripcion: string;
  codigoEntidad: string;
  estadoEntidad: EstadoEntidad;
  fechaRegistro: string | null;
  id: number | null;
}

export type EstadoSaldo = "ACTIVO" | "BLOQUEADO" | "AGOTADO" | "ANULADO";

export interface Saldo {
  createdAt: string | null;
  entidad: string;
  estado: EstadoSaldo;
  fechaAsignacion: string;
  updatedAt: string;
  montoInicial: number;
  montoDisponible: number;
  idEntidad: number;
  id: number;
  usuarioAsignador: string;
}

export type TipoOperacion = "RETIRO" | "DEPOSITO" | "PAGO_SERVICIO";
export type EstadoOperacion =
  | "PENDIENTE"
  | "COMPLETADA"
  | "ANULADA"
  | "FALLIDA";

export interface Operacion {
  id: number | null;
  tipo: string;
  monto: number;
  descripcion: string;
  numeroReferencia: string;
  fecha: string;
  entidad: string;
  estado: string;
  createdAt: string;
  updatedAt: string;
  servicio: string;
  // para crear o editar
  comision: string;
  idEntidadServicio: string;
  idEntidadBanco: number;
}

export type RolUsuario = "ADMINISTRADOR" | "AGENTE";
export type EstadoUsuario = "ACTIVO" | "INACTIVO";

export interface Usuario {
  idUsuario: number | null;
  nombre: string;
  apellido: string;
  correo: string;
  clave: string | null;
  rol: RolUsuario;
  estado: EstadoUsuario;
  fechaRegistro: string | null;
}

export interface AuthRequest {
  correo: string;
  clave: string;
}

export interface AuthResponse {
  token: string;
  usuario: Usuario;
}

export type TipoReporte = "OPERACIONES" | "SALDOS" | "USUARIOS" | "ENTIDADES";

export interface Reporte {
  idReporte: number | null;
  tipoReporte: TipoReporte;
  parametros: string;
  formatoExportacion: string;
  fechaGeneracion: string;
  usuarioGenerador: string;
  estado: string;
  resultado: string;
  fechaInicio: string | null;
  fechaFin: string | null;
}

export interface FiltroOperacion {
  tipoOperacion?: TipoOperacion | null;
  idEntidad?: number | null;
  usuarioRegistro?: string | null;
  estadoOperacion?: EstadoOperacion | null;
  fechaInicio?: string | null;
  fechaFin?: string | null;
}

export interface DashboardSummary {
  totalEntidadesActivas: number;
  totalSaldoDisponible: number;
  operacionesHoy: number;
  totalOperaciones: number;
}

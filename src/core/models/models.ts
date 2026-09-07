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

export type TipoEntidad = 'BANCO' | 'SERVICIO';
export type EstadoEntidad = 'ACTIVO' | 'INACTIVO';

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

export type EstadoSaldo = 'ACTIVO' | 'AGOTADO' | 'VENCIDO' | 'SUSPENDIDO';

export interface Saldo {
  idEntidad: number;
  entidadFinanciera?: EntidadFinanciera;
  entidadDenominacion?: string;
  entidadFinancieraId: number;
  montoInicial: number;
  montoDisponible: number;
  fechaAsignacion: string;
  fechaVencimiento: string | null;
  usuarioAsignador: string;
  observaciones: string;
  estadoSaldo: EstadoSaldo;
  id: number;
}

export type TipoOperacion = "RETIRO" | "DEPOSITO" | "PAGO_SERVICIO";
export type EstadoOperacion =
  | "PENDIENTE"
  | "COMPLETADA"
  | "ANULADA"
  | "FALLIDA";

export interface Operacion {
  id: number | null;
  idEntidad: number;
  entidadFinanciera?: EntidadFinanciera;
  entidadDenominacion?: string;
  tipoOperacion: string;
  montoOperacion: number;
  descripcionOperacion: string;
  fechaOperacion: string;
  numeroReferencia: string;
  usuarioRegistro: string;
  estadoOperacion: EstadoOperacion;
  servicioPagado: string;
}

export type RolUsuario = 'ADMINISTRADOR' | 'AGENTE';
export type EstadoUsuario = 'ACTIVO' | 'INACTIVO';

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

export type TipoReporte = 'OPERACIONES' | 'SALDOS' | 'USUARIOS' | 'ENTIDADES';

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

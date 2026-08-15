import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, PageResponse, Operacion, TipoOperacion, EstadoOperacion, FiltroOperacion } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class OperacionService {
  constructor(private http: HttpClient) {}

  listar(page: number = 0, size: number = 10, sort: string = 'idOperacion,desc'): Observable<PageResponse<Operacion>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);
    return this.http.get<PageResponse<Operacion>>('/operaciones', { params });
  }

  obtenerPorId(id: number): Observable<ApiResponse<Operacion>> {
    return this.http.get<ApiResponse<Operacion>>(`/operaciones/${id}`);
  }

  crear(operacion: Operacion): Observable<ApiResponse<Operacion>> {
    return this.http.post<ApiResponse<Operacion>>('/operaciones', operacion);
  }

  actualizar(id: number, operacion: Operacion): Observable<ApiResponse<Operacion>> {
    return this.http.put<ApiResponse<Operacion>>(`/operaciones/${id}`, operacion);
  }

  eliminar(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`/operaciones/${id}`);
  }

  listarPorTipo(tipo: TipoOperacion, page: number = 0, size: number = 10): Observable<PageResponse<Operacion>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PageResponse<Operacion>>(`/operaciones/tipo/${tipo}`, { params });
  }

  listarPorEntidad(idEntidad: number, page: number = 0, size: number = 10): Observable<PageResponse<Operacion>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PageResponse<Operacion>>(`/operaciones/entidad/${idEntidad}`, { params });
  }

  listarPorUsuario(usuario: string, page: number = 0, size: number = 10): Observable<PageResponse<Operacion>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PageResponse<Operacion>>(`/operaciones/usuario/${usuario}`, { params });
  }

  listarPorEstado(estado: EstadoOperacion, page: number = 0, size: number = 10): Observable<PageResponse<Operacion>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PageResponse<Operacion>>(`/operaciones/estado/${estado}`, { params });
  }

  listarPorRangoFechas(fechaInicio: string, fechaFin: string, page: number = 0, size: number = 10): Observable<PageResponse<Operacion>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PageResponse<Operacion>>(`/operaciones/rango-fechas/${fechaInicio}/${fechaFin}`, { params });
  }

  buscar(filtro: FiltroOperacion, page: number = 0, size: number = 10): Observable<PageResponse<Operacion>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (filtro.tipoOperacion) params = params.set('tipoOperacion', filtro.tipoOperacion);
    if (filtro.idEntidad) params = params.set('idEntidad', filtro.idEntidad.toString());
    if (filtro.usuarioRegistro) params = params.set('usuarioRegistro', filtro.usuarioRegistro);
    if (filtro.estadoOperacion) params = params.set('estadoOperacion', filtro.estadoOperacion);
    if (filtro.fechaInicio) params = params.set('fechaInicio', filtro.fechaInicio);
    if (filtro.fechaFin) params = params.set('fechaFin', filtro.fechaFin);

    return this.http.get<PageResponse<Operacion>>('/operaciones/buscar', { params });
  }
}

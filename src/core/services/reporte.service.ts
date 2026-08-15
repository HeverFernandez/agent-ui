import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, PageResponse, Reporte, TipoReporte } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class ReporteService {
  constructor(private http: HttpClient) {}

  listar(page: number = 0, size: number = 10, sort: string = 'idReporte,desc'): Observable<PageResponse<Reporte>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);
    return this.http.get<PageResponse<Reporte>>('/reportes', { params });
  }

  obtenerPorId(id: number): Observable<ApiResponse<Reporte>> {
    return this.http.get<ApiResponse<Reporte>>(`/reportes/${id}`);
  }

  crear(reporte: Reporte): Observable<ApiResponse<Reporte>> {
    return this.http.post<ApiResponse<Reporte>>('/reportes', reporte);
  }

  actualizar(id: number, reporte: Reporte): Observable<ApiResponse<Reporte>> {
    return this.http.put<ApiResponse<Reporte>>(`/reportes/${id}`, reporte);
  }

  eliminar(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`/reportes/${id}`);
  }

  listarPorTipo(tipo: TipoReporte, page: number = 0, size: number = 10): Observable<PageResponse<Reporte>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PageResponse<Reporte>>(`/reportes/tipo/${tipo}`, { params });
  }

  listarPorUsuario(usuario: string, page: number = 0, size: number = 10): Observable<PageResponse<Reporte>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PageResponse<Reporte>>(`/reportes/usuario/${usuario}`, { params });
  }

  listarPorRangoFechas(fechaInicio: string, fechaFin: string, page: number = 0, size: number = 10): Observable<PageResponse<Reporte>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PageResponse<Reporte>>(`/reportes/rango-fechas/${fechaInicio}/${fechaFin}`, { params });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, PageResponse, EntidadFinanciera, TipoEntidad } from '../models/models';

@Injectable({
  providedIn: "root",
})
export class EntidadService {
  constructor(private http: HttpClient) {}

  listar(
    page: number = 0,
    size: number = 10,
    sort: string = "idEntidad,asc",
  ): Observable<ApiResponse<PageResponse<EntidadFinanciera>>> {
    const params = new HttpParams()
      .set("page", page.toString())
      .set("size", size.toString())
      .set("sort", sort);
    return this.http.get<ApiResponse<PageResponse<EntidadFinanciera>>>(
      "/entidades-financieras",
      { params },
    );
  }

  obtenerPorId(id: number): Observable<ApiResponse<EntidadFinanciera>> {
    return this.http.get<ApiResponse<EntidadFinanciera>>(
      `/entidades-financieras/${id}`,
    );
  }

  crear(
    entidad: EntidadFinanciera,
  ): Observable<ApiResponse<EntidadFinanciera>> {
    return this.http.post<ApiResponse<EntidadFinanciera>>(
      "/entidades-financieras",
      entidad,
    );
  }

  actualizar(
    id: number,
    entidad: EntidadFinanciera,
  ): Observable<ApiResponse<EntidadFinanciera>> {
    return this.http.put<ApiResponse<EntidadFinanciera>>(
      `/entidades-financieras/${id}`,
      entidad,
    );
  }

  eliminar(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`/entidades-financieras/${id}`);
  }

  listarPorTipo(
    tipo: TipoEntidad,
    page: number = 0,
    size: number = 10,
  ): Observable<PageResponse<EntidadFinanciera>> {
    const params = new HttpParams()
      .set("page", page.toString())
      .set("size", size.toString());
    return this.http.get<PageResponse<EntidadFinanciera>>(
      `/entidades-financieras/tipo/${tipo}`,
      { params },
    );
  }

  listarActivas(): Observable<ApiResponse<EntidadFinanciera[]>> {
    return this.http.get<ApiResponse<EntidadFinanciera[]>>(
      "/entidades-financieras/all/active",
    );
  }
}

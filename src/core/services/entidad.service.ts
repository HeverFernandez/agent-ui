import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, PageResponse, EntidadFinanciera, TipoEntidad } from '../models/models';
import { OptionsRequest } from "../models";

@Injectable({
  providedIn: "root",
})
export class EntidadService {
  constructor(private http: HttpClient) {}

  listar(
    options: OptionsRequest,
  ): Observable<ApiResponse<PageResponse<EntidadFinanciera>>> {
    const {
      page = 0,
      size = 10,
      sortBy = "",
      tipo = "",
      direction = "DESC",
    } = options;
    const params: any = {
      page,
      size,
      direction: direction || "DESC",
    };
    if (sortBy) params.sortBy = sortBy;
    if (tipo && tipo !== "All") params.tipo = tipo;
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

  listarActivas(): Observable<ApiResponse<EntidadFinanciera[]>> {
    return this.http.get<ApiResponse<EntidadFinanciera[]>>(
      "/entidades-financieras/all/active",
    );
  }
}

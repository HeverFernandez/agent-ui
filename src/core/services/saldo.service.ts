import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, PageResponse, Saldo, EstadoSaldo } from '../models/models';
import { OptionsRequest } from "../models";

@Injectable({
  providedIn: "root",
})
export class SaldoService {
  constructor(private http: HttpClient) {}

  listar(
    options: OptionsRequest,
  ): Observable<ApiResponse<PageResponse<Saldo>>> {
    const {
      page = 0,
      size = 10,
      sortBy = "",
      estado = "",
      direction = "ASC",
      entidad = "",
    } = options;
    const params: any = {
      page,
      size,
      direction: direction.toUpperCase() || "ASC",
    };
    if (sortBy) params.sortBy = sortBy;
    if (estado && estado !== "All") params.estado = estado;
    if (entidad && entidad !== "") params.entidad = entidad;
    return this.http.get<ApiResponse<PageResponse<Saldo>>>("/saldos", {
      params,
    });
  }

  obtenerPorId(id: number): Observable<ApiResponse<Saldo>> {
    return this.http.get<ApiResponse<Saldo>>(`/saldos/${id}`);
  }

  crear(saldo: Saldo): Observable<ApiResponse<Saldo>> {
    return this.http.post<ApiResponse<Saldo>>("/saldos", saldo);
  }

  actualizar(id: number, saldo: Saldo): Observable<ApiResponse<Saldo>> {
    return this.http.put<ApiResponse<Saldo>>(`/saldos/${id}`, saldo);
  }

  eliminar(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`/saldos/${id}`);
  }

  listarPorEntidad(
    idEntidad: number,
    page: number = 0,
    size: number = 10,
  ): Observable<PageResponse<Saldo>> {
    const params = new HttpParams()
      .set("page", page.toString())
      .set("size", size.toString());
    return this.http.get<PageResponse<Saldo>>(`/saldos/entidad/${idEntidad}`, {
      params,
    });
  }

  listarPorEstado(
    estado: EstadoSaldo,
    page: number = 0,
    size: number = 10,
  ): Observable<ApiResponse<PageResponse<Saldo>>> {
    const params = new HttpParams()
      .set("page", page.toString())
      .set("size", size.toString());
    return this.http.get<ApiResponse<PageResponse<Saldo>>>(
      `/saldos/estado/${estado}`,
      {
        params,
      },
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, PageResponse, Operacion, TipoOperacion, EstadoOperacion, FiltroOperacion } from '../models/models';
import { OptionsRequest } from "../models";

@Injectable({
  providedIn: "root",
})
export class OperacionService {
  constructor(private http: HttpClient) {}

  listar(
    options: OptionsRequest,
  ): Observable<ApiResponse<PageResponse<Operacion>>> {
    const {
      page = 0,
      size = 10,
      sortBy = "",
      estado = "",
      direction = "ASC",
      entidad = "",
      finicio = "",
      ffin = "",
      tipoOperacion = "",
      estadoOperacion = "",
    } = options;
    const params: any = {
      page,
      size,
      direction: direction.toUpperCase() || "ASC",
    };
    if (sortBy) params.sortBy = sortBy;
    if (estado && estado !== "All") params.estado = estado;
    if (entidad && entidad !== "") params.entidad = entidad;
    if (finicio && finicio !== "") params.finicio = finicio;
    if (ffin && ffin !== "") params.ffin = ffin;
    if (tipoOperacion && tipoOperacion !== "")
      params.tipoOperacion = tipoOperacion;
    if (estadoOperacion && estadoOperacion !== "")
      params.estadoOperacion = estadoOperacion;
    return this.http.get<ApiResponse<PageResponse<Operacion>>>("/operaciones", {
      params,
    });
  }

  obtenerPorId(id: number): Observable<ApiResponse<Operacion>> {
    return this.http.get<ApiResponse<Operacion>>(`/operaciones/${id}`);
  }

  crear(operacion: Operacion): Observable<ApiResponse<Operacion>> {
    return this.http.post<ApiResponse<Operacion>>("/operaciones", operacion);
  }

  actualizar(
    id: number,
    operacion: Operacion,
  ): Observable<ApiResponse<Operacion>> {
    return this.http.put<ApiResponse<Operacion>>(
      `/operaciones/${id}`,
      operacion,
    );
  }

  eliminar(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`/operaciones/${id}`);
  }

  listarPorTipo(
    tipo: TipoOperacion,
    page: number = 0,
    size: number = 10,
  ): Observable<PageResponse<Operacion>> {
    const params = new HttpParams()
      .set("page", page.toString())
      .set("size", size.toString());
    return this.http.get<PageResponse<Operacion>>(`/operaciones/tipo/${tipo}`, {
      params,
    });
  }
}

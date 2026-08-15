import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, PageResponse, Usuario, RolUsuario, EstadoUsuario } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient) {}

  listar(page: number = 0, size: number = 10, sort: string = 'idUsuario,asc'): Observable<PageResponse<Usuario>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);
    return this.http.get<PageResponse<Usuario>>('/usuarios', { params });
  }

  obtenerPorId(id: number): Observable<ApiResponse<Usuario>> {
    return this.http.get<ApiResponse<Usuario>>(`/usuarios/${id}`);
  }

  obtenerPorCorreo(correo: string): Observable<ApiResponse<Usuario>> {
    return this.http.get<ApiResponse<Usuario>>(`/usuarios/correo/${correo}`);
  }

  crear(usuario: Partial<Usuario>): Observable<ApiResponse<Usuario>> {
    return this.http.post<ApiResponse<Usuario>>('/usuarios', usuario);
  }

  actualizar(id: number, usuario: Partial<Usuario>): Observable<ApiResponse<Usuario>> {
    return this.http.put<ApiResponse<Usuario>>(`/usuarios/${id}`, usuario);
  }

  eliminar(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`/usuarios/${id}`);
  }

  listarPorRol(rol: RolUsuario, page: number = 0, size: number = 10): Observable<PageResponse<Usuario>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PageResponse<Usuario>>(`/usuarios/rol/${rol}`, { params });
  }

  listarPorEstado(estado: EstadoUsuario, page: number = 0, size: number = 10): Observable<PageResponse<Usuario>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PageResponse<Usuario>>(`/usuarios/estado/${estado}`, { params });
  }

  listarActivosPorRol(rol: RolUsuario): Observable<ApiResponse<Usuario[]>> {
    return this.http.get<ApiResponse<Usuario[]>>(`/usuarios/activos/rol/${rol}`);
  }
}

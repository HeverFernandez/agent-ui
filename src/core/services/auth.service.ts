import { Injectable, signal, computed, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, of } from 'rxjs';
import { AuthRequest, AuthResponse, Usuario } from '../models/models';
import { environment } from '../../../src/environments/environment';

const MOCK_USERS: { correo: string; clave: string; usuario: Usuario }[] = [
  {
    correo: 'admin@nuvanta.com',
    clave: 'admin123',
    usuario: {
      idUsuario: 1,
      nombre: 'Administrador',
      apellido: 'Sistema',
      correo: 'admin@nuvanta.com',
      clave: null,
      rol: 'ADMINISTRADOR',
      estado: 'ACTIVO',
      fechaRegistro: '2025-01-01T00:00:00',
    },
  },
  {
    correo: 'agente@nuvanta.com',
    clave: 'agente123',
    usuario: {
      idUsuario: 2,
      nombre: 'Carlos',
      apellido: 'Mendoza',
      correo: 'agente@nuvanta.com',
      clave: null,
      rol: 'AGENTE',
      estado: 'ACTIVO',
      fechaRegistro: '2025-01-15T00:00:00',
    },
  },
];

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSignal = signal<Usuario | null>(null);
  private tokenSignal = signal<string | null>(null);

  currentUser = this.currentUserSignal.asReadonly();
  isAuthenticated = computed(() => this.currentUserSignal() !== null);
  isAdmin = computed(
    () => this.currentUserSignal()?.rol === 'ADMINISTRADOR'
  );

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.restoreSession();
  }

  private restoreSession(): void {
    const token = localStorage.getItem('nuvanta_token');
    const userStr = localStorage.getItem('nuvanta_user');
    if (token && userStr) {
      this.tokenSignal.set(token);
      this.currentUserSignal.set(JSON.parse(userStr));
    }
  }

  login(credentials: AuthRequest): Observable<AuthResponse> {
    if (environment.useMockAuth) {
      return this.mockLogin(credentials);
    }

    return this.http.post<AuthResponse>('/auth/login', credentials).pipe(
      tap((response) => this.setSession(response))
    );
  }

  register(usuario: Partial<Usuario>): Observable<Usuario> {
    if (environment.useMockAuth) {
      return this.mockRegister(usuario);
    }

    return this.http.post<Usuario>('/auth/register', usuario);
  }

  private mockLogin(credentials: AuthRequest): Observable<AuthResponse> {
    const found = MOCK_USERS.find(
      (u) => u.correo === credentials.correo && u.clave === credentials.clave
    );

    if (!found) {
      throw new Error('Credenciales inválidas. Verifique su correo y contraseña.');
    }

    const response: AuthResponse = {
      token: 'mock-jwt-token-' + Date.now(),
      usuario: found.usuario,
    };

    this.setSession(response);
    return of(response);
  }

  private mockRegister(usuario: Partial<Usuario>): Observable<Usuario> {
    const newUsuario: Usuario = {
      idUsuario: Date.now(),
      nombre: usuario.nombre || '',
      apellido: usuario.apellido || '',
      correo: usuario.correo || '',
      clave: null,
      rol: usuario.rol || 'AGENTE',
      estado: 'ACTIVO',
      fechaRegistro: new Date().toISOString(),
    };

    return of(newUsuario);
  }

  private setSession(response: AuthResponse): void {
    localStorage.setItem('nuvanta_token', response.token);
    localStorage.setItem('nuvanta_user', JSON.stringify(response.usuario));
    this.tokenSignal.set(response.token);
    this.currentUserSignal.set(response.usuario);
  }

  logout(): void {
    localStorage.removeItem('nuvanta_token');
    localStorage.removeItem('nuvanta_user');
    this.tokenSignal.set(null);
    this.currentUserSignal.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return this.tokenSignal();
  }

  updateProfile(usuario: Usuario): void {
    localStorage.setItem('nuvanta_user', JSON.stringify(usuario));
    this.currentUserSignal.set(usuario);
  }
}

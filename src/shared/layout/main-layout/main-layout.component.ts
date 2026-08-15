import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService } from '../../../core/services/auth.service';
import { filter } from 'rxjs';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  adminOnly?: boolean;
}

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
  ],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private breakpointObserver = inject(BreakpointObserver);

  currentUser = this.authService.currentUser;
  isAdmin = this.authService.isAdmin;

  isHandset = signal(false);
  sidenavOpened = signal(true);
  currentTitle = signal('Dashboard');

  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Entidades Bancarias', icon: 'account_balance', route: '/entidades' },
    { label: 'Saldos', icon: 'account_balance_wallet', route: '/saldos' },
    { label: 'Operaciones', icon: 'swap_horiz', route: '/operaciones' },
    { label: 'Reportes', icon: 'insert_chart', route: '/reportes' },
    { label: 'Usuarios', icon: 'people', route: '/usuarios', adminOnly: true },
  ];

  visibleMenuItems = computed(() =>
    this.menuItems.filter((item) => !item.adminOnly || this.isAdmin())
  );

  constructor() {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isHandset.set(result.matches);
        this.sidenavOpened.set(!result.matches);
      });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const navEvent = event as NavigationEnd;
        const item = this.menuItems.find((i) => navEvent.urlAfterRedirects.startsWith(i.route));
        this.currentTitle.set(item?.label || 'Dashboard');
        if (this.isHandset()) {
          this.sidenavOpened.set(false);
        }
      });
  }

  toggleSidenav(): void {
    this.sidenavOpened.update((v) => !v);
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    if (this.isHandset()) {
      this.sidenavOpened.set(false);
    }
  }

  logout(): void {
    this.authService.logout();
  }

  getInitials(): string {
    const user = this.currentUser();
    if (!user) return '?';
    return `${user.nombre.charAt(0)}${user.apellido.charAt(0)}`.toUpperCase();
  }

  getFullName(): string {
    const user = this.currentUser();
    if (!user) return '';
    return `${user.nombre} ${user.apellido}`;
  }
}

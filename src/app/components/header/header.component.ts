import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router'; // <-- Asegúrate de importar esto
import { CommonModule } from '@angular/common'; // 👈 importa esto
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  currentUser: { name: string } | null = null;
  options = [
    { label: 'Inicio', route: '/' },
    { label: 'Explorar', route: '/explore' },
    // ... tus otras rutas
  ];

  constructor(private authService: AuthService, private router: Router) {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  navigateToLogin() {
    this.router.navigate(['/sign-in']);
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/']);
    });
  }

}

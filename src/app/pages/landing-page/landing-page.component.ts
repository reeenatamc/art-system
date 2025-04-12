import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router'; // <-- Asegúrate de importar esto
import { CommonModule } from '@angular/common'; // <-- Importar esto


@Component({
  selector: 'app-landing-page',
  imports: [RouterModule, CommonModule], // <-- Asegúrate de importar esto
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  currentUser: { name: string } | null = null;
  isLoading: boolean = true;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.isLoading = false;
    });
  }
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";  // <-- Importa ReactiveFormsModule
import { RouterModule } from '@angular/router'; // <-- Asegúrate de importar esto
import { CommonModule } from '@angular/common'; // 👈 importa esto


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, HeaderComponent, FooterComponent, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'art-system';
}

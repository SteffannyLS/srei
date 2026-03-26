import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { EventoAsistenteService } from "../../../core/services/evento-asistente.service";
import { AuthService } from "../../../core/services/auth.service";
@Component({
  selector: 'app-asistente-eventos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './eventos.html',
  styleUrls: ['./eventos.css']
})
export class EventosComponent implements OnInit {

  eventos: any[] = [];
  loading = true;

  private baseUrl = 'http://localhost:8080/';

  constructor(
    private eventoService: EventoAsistenteService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    console.log('TOKEN ASISTENTE:', token);
    this.cargarEventos();
  }

  cargarEventos(): void {
    this.loading = true;

    this.eventoService.listarEventos().subscribe({
      next: (data) => {
        console.log('EVENTOS ASISTENTE:', data);
        this.eventos = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ ERROR ASISTENTE:', err);
        this.loading = false;
      }
    });
  }

  getImagen(url: string | null): string {
    if (!url) return '/img/logo.png';
    if (url.startsWith('data:image')) return url;
    return this.baseUrl + url;
  }

  abrirPdf(url: string | null): void {
    if (!url) return;
    window.open(this.baseUrl + url, '_blank');
  }

  logout(): void {
    this.authService.logout();
  }

}
import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
//import { EventoCoordinadorService } from "../../../core/services/evento-coordinador.service";
import { EventoCoordinadorService } from "../../../core/services/evento-coordinador.service"
import { AuthService } from "../../../core/services/auth.service";

@Component({
  selector: 'app-coordinador-eventos',
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
    private eventoService: EventoCoordinadorService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    console.log('TOKEN COORDINADOR:', token);
    this.cargarEventos();
  }

   cargarEventos(): void {
    this.loading = true;

    this.eventoService.listarEventos().subscribe({
      next: (data) => {
        console.log('EVENTOS :', data);
        this.eventos = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(' ERROR:', err);
        this.loading = false;
      }
    });
  }


  getImagen(url: string | null): string {

    if (!url) {
      return '/img/logo.png'; 
    }


    if (url.startsWith('data:image')) {
      return url;
    }


    return this.baseUrl + url;
  }



  abrirPdf(url: string | null): void {
    if (!url) return;

    const fullUrl = this.baseUrl + url;
    window.open(fullUrl, '_blank');
  }

 

  logout(): void {
    this.authService.logout();
  }

}
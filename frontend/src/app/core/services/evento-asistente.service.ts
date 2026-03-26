import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventoAsistenteService {

  private apiUrl = `${environment.apiUrl}/api/asistente/eventos`;

  constructor(private http: HttpClient) {}

  listarEventos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoordinadorService } from '../../../core/services/coordinador.service';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-aprobar-eventos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './aprobar-eventos.html',
  styleUrls: ['./aprobar-eventos.css']
})
export class AprobarEventosComponent implements OnInit {

  eventos: any[] = [];
  eventosReporte: any[] = [];

  cargando = true;
  procesando = false;

  estadoSeleccionado = 'PENDIENTE';

  mostrarModal = false;
  eventoSeleccionado: number | null = null;
  observacion = '';

  constructor(private coordinadorService: CoordinadorService) {}

  ngOnInit(): void {
    this.cargarPorEstado();
  }

  // 🔥 CARGA PRINCIPAL
  cargarPorEstado() {

    this.cargando = true;

    let request;

    if (this.estadoSeleccionado === 'PENDIENTE') {
      request = this.coordinadorService.listarPendientes();
    } 
    else if (this.estadoSeleccionado === 'APROBADO') {
      request = this.coordinadorService.listarAprobados();
    } 
    else {
      request = this.coordinadorService.listarRechazados();
    }

    request.subscribe({
      next: (data) => {
        this.eventos = data;
        this.cargando = false;
      },
      error: () => this.cargando = false
    });
  }

<<<<<<< HEAD
  // REPORTE (NO pisa eventos)
=======
  // 🔥 REPORTE (NO pisa eventos)
>>>>>>> 927bc787b7ed977d6cc929e279e780df94812d61
cargarReporte() {
  return this.coordinadorService
    .getReporteEventos(this.estadoSeleccionado);
}
<<<<<<< HEAD
  // APROBAR
=======
  // 🔥 APROBAR
>>>>>>> 927bc787b7ed977d6cc929e279e780df94812d61
  aprobarEvento(id: number) {

    if (this.procesando) return;

    this.procesando = true;

    const body = {
      idevento: id,
      estado: 'APROBADO',
      comentario: 'Evento aprobado por coordinador'
    };

    this.coordinadorService.aprobarEvento(body).subscribe({
      next: () => {
        this.procesando = false;
<<<<<<< HEAD
        this.cargarPorEstado(); //  CORREGIDO
=======
        this.cargarPorEstado(); // 🔥 CORREGIDO
>>>>>>> 927bc787b7ed977d6cc929e279e780df94812d61
      },
      error: () => this.procesando = false
    });
  }

<<<<<<< HEAD
  //  MODAL
=======
  // 🔥 MODAL
>>>>>>> 927bc787b7ed977d6cc929e279e780df94812d61
  abrirModalRechazo(id: number) {
    this.eventoSeleccionado = id;
    this.mostrarModal = true;
    this.observacion = '';
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.observacion = '';
    this.eventoSeleccionado = null;
  }

<<<<<<< HEAD
  // 
=======
  // 🔥 RECHAZAR
>>>>>>> 927bc787b7ed977d6cc929e279e780df94812d61
  confirmarRechazo(){

    if(this.procesando) return;

    if(!this.observacion.trim()){
      alert('Debe escribir una observación');
      return;
    }

    if(this.eventoSeleccionado === null) return;

    this.procesando = true;

    const body = {
      idevento: this.eventoSeleccionado,
      estado: 'RECHAZADO',
      comentario: this.observacion
    };

    this.coordinadorService.aprobarEvento(body).subscribe({

      next: () => {
        this.cerrarModal();
        this.procesando = false;
        this.cargarPorEstado(); // 🔥 CORREGIDO
      },

      error: () => this.procesando = false

    });

  }

  // 🔥 PDF
generarPDF() {

  this.cargarReporte().subscribe(data => {

    const doc = new jsPDF();

    const rows = data.map((e:any) => [
      e.idevento,
      e.nombreevento,
      e.nombreDocente || '',
      e.fechainicio,
      e.comentario || 'Sin comentario'
    ]);

    autoTable(doc, {
      head: [['ID','Evento','Docente','Fecha','Comentario']],
      body: rows
    });

    doc.save('reporte-eventos.pdf');

  });

}

  // 🔥 EXCEL
exportarExcel() {

  this.cargarReporte().subscribe(data => {

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Eventos');

    XLSX.writeFile(wb, 'reporte-eventos.xlsx');

  });

}
}
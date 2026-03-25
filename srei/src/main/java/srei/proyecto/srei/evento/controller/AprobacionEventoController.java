package srei.proyecto.srei.evento.controller;

import lombok.RequiredArgsConstructor;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import srei.proyecto.srei.evento.dto.AprobarEventoDTO;
import srei.proyecto.srei.evento.dto.EventoPendienteDTO;
import srei.proyecto.srei.evento.service.AprobacionEventoService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/coordinador")
@CrossOrigin(origins = "http://localhost:4200")
public class AprobacionEventoController {

    private final AprobacionEventoService eventoService;

<<<<<<< HEAD
    //  listar eventos pendientes
=======
<<<<<<< HEAD
    //  listar eventos pendientes
=======
    // 🔹 listar eventos pendientes
>>>>>>> 927bc787b7ed977d6cc929e279e780df94812d61
>>>>>>> 99bf4f14cecae5bd0216f6a35705358283414aba
    @GetMapping("/eventos-pendientes")
    public ResponseEntity<?> listarPendientes() {
        System.out.println("ENTRÓ AL ENDPOINT EVENTOS PENDIENTES");
        return ResponseEntity.ok(eventoService.listarPendientes());
    }

<<<<<<< HEAD
    //  aprobar evento
=======
<<<<<<< HEAD
    //  aprobar evento
=======
    // 🔹 aprobar evento
>>>>>>> 927bc787b7ed977d6cc929e279e780df94812d61
>>>>>>> 99bf4f14cecae5bd0216f6a35705358283414aba
    @PostMapping("/aprobar-evento")
    public ResponseEntity<?> aprobarEvento(@RequestBody AprobarEventoDTO dto){
        eventoService.aprobarEvento(dto);
        return ResponseEntity.ok("Evento aprobado correctamente");
    }

    // 🔹 listar aprobados
    @GetMapping("/eventos-aprobados")
    public ResponseEntity<?> listarAprobados(){
        return ResponseEntity.ok(eventoService.listarAprobados());
    }

    // 🔹 listar rechazados
    @GetMapping("/eventos-rechazados")
    public ResponseEntity<?> listarRechazados(){
        return ResponseEntity.ok(eventoService.listarRechazados());
    }

    // 🔹 dashboard
    @GetMapping("/dashboard")
    public ResponseEntity<?> dashboard() {

        Map<String,Object> data = new HashMap<>();

        data.put("pendientes",eventoService.contarPendientes());
        data.put("aprobados",eventoService.contarAprobados());
        data.put("rechazados",eventoService.contarRechazados());

        return ResponseEntity.ok(data);
    }

    // 🔥🔥🔥 NUEVO ENDPOINT DE REPORTE 🔥🔥🔥
    @GetMapping("/reporte")
    public ResponseEntity<List<EventoPendienteDTO>> reporte(
            @RequestParam String estado) {
        return ResponseEntity.ok(eventoService.reporteEventos(estado));
    }
}
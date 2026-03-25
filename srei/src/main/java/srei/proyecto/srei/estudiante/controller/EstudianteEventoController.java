package srei.proyecto.srei.estudiante.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import srei.proyecto.srei.estudiante.service.EstudianteEventoService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/estudiante/eventos")
@RequiredArgsConstructor
public class EstudianteEventoController {

    private final EstudianteEventoService service;

    @GetMapping
    public List<Map<String, Object>> listarEventos(Authentication auth) {

        // 🔥 obtiene rol desde JWT (ya lo tienes funcionando)
        String rol = auth.getAuthorities()
                .stream()
                .findFirst()
                .map(a -> a.getAuthority()
                        .replace("ROLE_", "")
                        .toLowerCase())
                .orElse("estudiante");

        return service.listarEventos(rol);
    }
}
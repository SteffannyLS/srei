package srei.proyecto.srei.decano.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import srei.proyecto.srei.decano.service.DecanoEventoService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/decano/eventos")
@RequiredArgsConstructor
public class DecanoEventoController {

    private final DecanoEventoService service;

    @GetMapping
    public List<Map<String, Object>> listarEventos(Authentication auth) {

        String rol = auth.getAuthorities()
                .stream()
                .findFirst()
                .map(a -> a.getAuthority()
                        .replace("ROLE_", "")
                        .toLowerCase())
                .orElse("decano");

        return service.listarEventos(rol);
    }
}
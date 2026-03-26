package srei.proyecto.srei.asistente.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import srei.proyecto.srei.asistente.service.AsistenteEventoService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/asistente/eventos")
@RequiredArgsConstructor
public class AsistenteEventoController {

    private final AsistenteEventoService service;

    @GetMapping
    public List<Map<String, Object>> listarEventos(Authentication auth) {

        String rol = auth.getAuthorities()
                .stream()
                .findFirst()
                .map(a -> a.getAuthority()
                        .replace("ROLE_", "")
                        .toLowerCase())
                .orElse("asistente");

        return service.listarEventos(rol);
    }
}
package srei.proyecto.srei.coordinador.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import srei.proyecto.srei.coordinador.Service.CoordinadorEventoService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/coordodinar/eventos")
@RequiredArgsConstructor
public class CoordinadorEventoController {

    private final CoordinadorEventoService service;

    
    @GetMapping
    public List<Map<String, Object>> listarEventos(Authentication auth) {

        String rol = auth.getAuthorities()
                .stream()
                .findFirst()
                .map(a -> a.getAuthority()
                        .replace("ROLE_", "")
                        .toLowerCase())
                .orElse("");

        return service.listarEventos(rol);
    }

}

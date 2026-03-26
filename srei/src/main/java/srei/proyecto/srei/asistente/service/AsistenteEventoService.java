package srei.proyecto.srei.asistente.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AsistenteEventoService {

    private final JdbcTemplate jdbcTemplate;

    public List<Map<String, Object>> listarEventos(String rol) {
        String sql = "SELECT * FROM fn_listar_eventos_por_rol(?)";
        return jdbcTemplate.queryForList(sql, rol);
    }
}
package srei.proyecto.srei.decano.service;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DecanoEventoService {

    private final JdbcTemplate jdbcTemplate;

    public List<Map<String, Object>> listarEventos(String rol) {

        String sql = "SELECT * FROM fn_listar_eventos_por_rol(?)";

        return jdbcTemplate.queryForList(sql, rol.toLowerCase());
    }
}
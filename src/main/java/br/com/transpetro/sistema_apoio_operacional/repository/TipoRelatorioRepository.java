package br.com.transpetro.sistema_apoio_operacional.repository;

import br.com.transpetro.sistema_apoio_operacional.domain.TipoRelatorio;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the TipoRelatorio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoRelatorioRepository extends JpaRepository<TipoRelatorio, Long> {
}

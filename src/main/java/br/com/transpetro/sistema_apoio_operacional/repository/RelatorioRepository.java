package br.com.transpetro.sistema_apoio_operacional.repository;

import br.com.transpetro.sistema_apoio_operacional.domain.Relatorio;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Relatorio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RelatorioRepository extends JpaRepository<Relatorio, Long> {
}

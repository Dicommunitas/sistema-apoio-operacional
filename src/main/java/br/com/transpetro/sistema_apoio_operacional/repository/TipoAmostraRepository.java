package br.com.transpetro.sistema_apoio_operacional.repository;

import br.com.transpetro.sistema_apoio_operacional.domain.TipoAmostra;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the TipoAmostra entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoAmostraRepository extends JpaRepository<TipoAmostra, Long> {
}

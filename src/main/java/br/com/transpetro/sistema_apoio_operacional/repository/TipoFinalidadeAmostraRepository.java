package br.com.transpetro.sistema_apoio_operacional.repository;

import br.com.transpetro.sistema_apoio_operacional.domain.TipoFinalidadeAmostra;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the TipoFinalidadeAmostra entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoFinalidadeAmostraRepository extends JpaRepository<TipoFinalidadeAmostra, Long> {
}

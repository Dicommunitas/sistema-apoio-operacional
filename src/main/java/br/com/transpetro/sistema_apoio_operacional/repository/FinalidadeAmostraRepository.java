package br.com.transpetro.sistema_apoio_operacional.repository;

import br.com.transpetro.sistema_apoio_operacional.domain.FinalidadeAmostra;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the FinalidadeAmostra entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FinalidadeAmostraRepository extends JpaRepository<FinalidadeAmostra, Long> {
}

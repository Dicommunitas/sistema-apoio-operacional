package br.com.transpetro.sistema_apoio_operacional.repository;

import br.com.transpetro.sistema_apoio_operacional.domain.Amostra;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Amostra entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AmostraRepository extends JpaRepository<Amostra, Long> {
}

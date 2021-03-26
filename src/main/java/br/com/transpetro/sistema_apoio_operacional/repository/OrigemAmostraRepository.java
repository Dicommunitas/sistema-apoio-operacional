package br.com.transpetro.sistema_apoio_operacional.repository;

import br.com.transpetro.sistema_apoio_operacional.domain.OrigemAmostra;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the OrigemAmostra entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrigemAmostraRepository extends JpaRepository<OrigemAmostra, Long> {
}

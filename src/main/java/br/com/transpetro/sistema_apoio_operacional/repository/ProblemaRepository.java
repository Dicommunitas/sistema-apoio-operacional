package br.com.transpetro.sistema_apoio_operacional.repository;

import br.com.transpetro.sistema_apoio_operacional.domain.Problema;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Problema entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProblemaRepository extends JpaRepository<Problema, Long> {
}

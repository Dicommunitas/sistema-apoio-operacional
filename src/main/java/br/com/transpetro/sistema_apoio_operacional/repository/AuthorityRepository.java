package br.com.transpetro.sistema_apoio_operacional.repository;

import br.com.transpetro.sistema_apoio_operacional.domain.Authority;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the {@link Authority} entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {}

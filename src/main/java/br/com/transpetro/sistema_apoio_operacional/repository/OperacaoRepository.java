package br.com.transpetro.sistema_apoio_operacional.repository;

import br.com.transpetro.sistema_apoio_operacional.domain.Operacao;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Operacao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OperacaoRepository extends JpaRepository<Operacao, Long> {
}

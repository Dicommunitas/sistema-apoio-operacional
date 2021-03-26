package br.com.transpetro.sistema_apoio_operacional.service;

import br.com.transpetro.sistema_apoio_operacional.domain.Operacao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Operacao}.
 */
public interface OperacaoService {

    /**
     * Save a operacao.
     *
     * @param operacao the entity to save.
     * @return the persisted entity.
     */
    Operacao save(Operacao operacao);

    /**
     * Get all the operacaos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Operacao> findAll(Pageable pageable);


    /**
     * Get the "id" operacao.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Operacao> findOne(Long id);

    /**
     * Delete the "id" operacao.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the operacao corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Operacao> search(String query, Pageable pageable);
}

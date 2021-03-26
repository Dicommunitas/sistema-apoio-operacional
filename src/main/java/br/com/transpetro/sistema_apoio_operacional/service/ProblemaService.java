package br.com.transpetro.sistema_apoio_operacional.service;

import br.com.transpetro.sistema_apoio_operacional.domain.Problema;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Problema}.
 */
public interface ProblemaService {

    /**
     * Save a problema.
     *
     * @param problema the entity to save.
     * @return the persisted entity.
     */
    Problema save(Problema problema);

    /**
     * Get all the problemas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Problema> findAll(Pageable pageable);


    /**
     * Get the "id" problema.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Problema> findOne(Long id);

    /**
     * Delete the "id" problema.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the problema corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Problema> search(String query, Pageable pageable);
}

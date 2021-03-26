package br.com.transpetro.sistema_apoio_operacional.service;

import br.com.transpetro.sistema_apoio_operacional.domain.OrigemAmostra;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link OrigemAmostra}.
 */
public interface OrigemAmostraService {

    /**
     * Save a origemAmostra.
     *
     * @param origemAmostra the entity to save.
     * @return the persisted entity.
     */
    OrigemAmostra save(OrigemAmostra origemAmostra);

    /**
     * Get all the origemAmostras.
     *
     * @return the list of entities.
     */
    List<OrigemAmostra> findAll();


    /**
     * Get the "id" origemAmostra.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<OrigemAmostra> findOne(Long id);

    /**
     * Delete the "id" origemAmostra.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the origemAmostra corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @return the list of entities.
     */
    List<OrigemAmostra> search(String query);
}

package br.com.transpetro.sistema_apoio_operacional.service;

import br.com.transpetro.sistema_apoio_operacional.domain.Amostra;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Amostra}.
 */
public interface AmostraService {

    /**
     * Save a amostra.
     *
     * @param amostra the entity to save.
     * @return the persisted entity.
     */
    Amostra save(Amostra amostra);

    /**
     * Get all the amostras.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Amostra> findAll(Pageable pageable);


    /**
     * Get the "id" amostra.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Amostra> findOne(Long id);

    /**
     * Delete the "id" amostra.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the amostra corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Amostra> search(String query, Pageable pageable);
}

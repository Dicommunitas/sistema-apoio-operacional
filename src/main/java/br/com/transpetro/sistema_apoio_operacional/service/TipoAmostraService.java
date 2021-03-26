package br.com.transpetro.sistema_apoio_operacional.service;

import br.com.transpetro.sistema_apoio_operacional.domain.TipoAmostra;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link TipoAmostra}.
 */
public interface TipoAmostraService {

    /**
     * Save a tipoAmostra.
     *
     * @param tipoAmostra the entity to save.
     * @return the persisted entity.
     */
    TipoAmostra save(TipoAmostra tipoAmostra);

    /**
     * Get all the tipoAmostras.
     *
     * @return the list of entities.
     */
    List<TipoAmostra> findAll();


    /**
     * Get the "id" tipoAmostra.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TipoAmostra> findOne(Long id);

    /**
     * Delete the "id" tipoAmostra.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the tipoAmostra corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @return the list of entities.
     */
    List<TipoAmostra> search(String query);
}

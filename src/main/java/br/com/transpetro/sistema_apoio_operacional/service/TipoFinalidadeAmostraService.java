package br.com.transpetro.sistema_apoio_operacional.service;

import br.com.transpetro.sistema_apoio_operacional.domain.TipoFinalidadeAmostra;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link TipoFinalidadeAmostra}.
 */
public interface TipoFinalidadeAmostraService {

    /**
     * Save a tipoFinalidadeAmostra.
     *
     * @param tipoFinalidadeAmostra the entity to save.
     * @return the persisted entity.
     */
    TipoFinalidadeAmostra save(TipoFinalidadeAmostra tipoFinalidadeAmostra);

    /**
     * Get all the tipoFinalidadeAmostras.
     *
     * @return the list of entities.
     */
    List<TipoFinalidadeAmostra> findAll();


    /**
     * Get the "id" tipoFinalidadeAmostra.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TipoFinalidadeAmostra> findOne(Long id);

    /**
     * Delete the "id" tipoFinalidadeAmostra.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the tipoFinalidadeAmostra corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @return the list of entities.
     */
    List<TipoFinalidadeAmostra> search(String query);
}

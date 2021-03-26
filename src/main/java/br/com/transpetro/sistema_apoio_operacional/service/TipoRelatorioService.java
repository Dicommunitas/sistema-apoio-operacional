package br.com.transpetro.sistema_apoio_operacional.service;

import br.com.transpetro.sistema_apoio_operacional.domain.TipoRelatorio;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link TipoRelatorio}.
 */
public interface TipoRelatorioService {

    /**
     * Save a tipoRelatorio.
     *
     * @param tipoRelatorio the entity to save.
     * @return the persisted entity.
     */
    TipoRelatorio save(TipoRelatorio tipoRelatorio);

    /**
     * Get all the tipoRelatorios.
     *
     * @return the list of entities.
     */
    List<TipoRelatorio> findAll();


    /**
     * Get the "id" tipoRelatorio.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TipoRelatorio> findOne(Long id);

    /**
     * Delete the "id" tipoRelatorio.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the tipoRelatorio corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @return the list of entities.
     */
    List<TipoRelatorio> search(String query);
}

package br.com.transpetro.sistema_apoio_operacional.service;

import br.com.transpetro.sistema_apoio_operacional.domain.Relatorio;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Relatorio}.
 */
public interface RelatorioService {

    /**
     * Save a relatorio.
     *
     * @param relatorio the entity to save.
     * @return the persisted entity.
     */
    Relatorio save(Relatorio relatorio);

    /**
     * Get all the relatorios.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Relatorio> findAll(Pageable pageable);


    /**
     * Get the "id" relatorio.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Relatorio> findOne(Long id);

    /**
     * Delete the "id" relatorio.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the relatorio corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Relatorio> search(String query, Pageable pageable);
}

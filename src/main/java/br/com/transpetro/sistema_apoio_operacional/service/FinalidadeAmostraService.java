package br.com.transpetro.sistema_apoio_operacional.service;

import br.com.transpetro.sistema_apoio_operacional.domain.FinalidadeAmostra;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link FinalidadeAmostra}.
 */
public interface FinalidadeAmostraService {

    /**
     * Save a finalidadeAmostra.
     *
     * @param finalidadeAmostra the entity to save.
     * @return the persisted entity.
     */
    FinalidadeAmostra save(FinalidadeAmostra finalidadeAmostra);

    /**
     * Get all the finalidadeAmostras.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<FinalidadeAmostra> findAll(Pageable pageable);


    /**
     * Get the "id" finalidadeAmostra.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<FinalidadeAmostra> findOne(Long id);

    /**
     * Delete the "id" finalidadeAmostra.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the finalidadeAmostra corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<FinalidadeAmostra> search(String query, Pageable pageable);
}

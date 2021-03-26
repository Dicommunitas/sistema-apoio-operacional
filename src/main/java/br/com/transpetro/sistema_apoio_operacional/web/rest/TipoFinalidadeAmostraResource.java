package br.com.transpetro.sistema_apoio_operacional.web.rest;

import br.com.transpetro.sistema_apoio_operacional.domain.TipoFinalidadeAmostra;
import br.com.transpetro.sistema_apoio_operacional.repository.TipoFinalidadeAmostraRepository;
import br.com.transpetro.sistema_apoio_operacional.repository.search.TipoFinalidadeAmostraSearchRepository;
import br.com.transpetro.sistema_apoio_operacional.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link br.com.transpetro.sistema_apoio_operacional.domain.TipoFinalidadeAmostra}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TipoFinalidadeAmostraResource {

    private final Logger log = LoggerFactory.getLogger(TipoFinalidadeAmostraResource.class);

    private static final String ENTITY_NAME = "tipoFinalidadeAmostra";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipoFinalidadeAmostraRepository tipoFinalidadeAmostraRepository;

    private final TipoFinalidadeAmostraSearchRepository tipoFinalidadeAmostraSearchRepository;

    public TipoFinalidadeAmostraResource(TipoFinalidadeAmostraRepository tipoFinalidadeAmostraRepository, TipoFinalidadeAmostraSearchRepository tipoFinalidadeAmostraSearchRepository) {
        this.tipoFinalidadeAmostraRepository = tipoFinalidadeAmostraRepository;
        this.tipoFinalidadeAmostraSearchRepository = tipoFinalidadeAmostraSearchRepository;
    }

    /**
     * {@code POST  /tipo-finalidade-amostras} : Create a new tipoFinalidadeAmostra.
     *
     * @param tipoFinalidadeAmostra the tipoFinalidadeAmostra to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoFinalidadeAmostra, or with status {@code 400 (Bad Request)} if the tipoFinalidadeAmostra has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tipo-finalidade-amostras")
    public ResponseEntity<TipoFinalidadeAmostra> createTipoFinalidadeAmostra(@Valid @RequestBody TipoFinalidadeAmostra tipoFinalidadeAmostra) throws URISyntaxException {
        log.debug("REST request to save TipoFinalidadeAmostra : {}", tipoFinalidadeAmostra);
        if (tipoFinalidadeAmostra.getId() != null) {
            throw new BadRequestAlertException("A new tipoFinalidadeAmostra cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoFinalidadeAmostra result = tipoFinalidadeAmostraRepository.save(tipoFinalidadeAmostra);
        tipoFinalidadeAmostraSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/tipo-finalidade-amostras/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipo-finalidade-amostras} : Updates an existing tipoFinalidadeAmostra.
     *
     * @param tipoFinalidadeAmostra the tipoFinalidadeAmostra to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoFinalidadeAmostra,
     * or with status {@code 400 (Bad Request)} if the tipoFinalidadeAmostra is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoFinalidadeAmostra couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tipo-finalidade-amostras")
    public ResponseEntity<TipoFinalidadeAmostra> updateTipoFinalidadeAmostra(@Valid @RequestBody TipoFinalidadeAmostra tipoFinalidadeAmostra) throws URISyntaxException {
        log.debug("REST request to update TipoFinalidadeAmostra : {}", tipoFinalidadeAmostra);
        if (tipoFinalidadeAmostra.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TipoFinalidadeAmostra result = tipoFinalidadeAmostraRepository.save(tipoFinalidadeAmostra);
        tipoFinalidadeAmostraSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tipoFinalidadeAmostra.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tipo-finalidade-amostras} : get all the tipoFinalidadeAmostras.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoFinalidadeAmostras in body.
     */
    @GetMapping("/tipo-finalidade-amostras")
    public List<TipoFinalidadeAmostra> getAllTipoFinalidadeAmostras() {
        log.debug("REST request to get all TipoFinalidadeAmostras");
        return tipoFinalidadeAmostraRepository.findAll();
    }

    /**
     * {@code GET  /tipo-finalidade-amostras/:id} : get the "id" tipoFinalidadeAmostra.
     *
     * @param id the id of the tipoFinalidadeAmostra to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoFinalidadeAmostra, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tipo-finalidade-amostras/{id}")
    public ResponseEntity<TipoFinalidadeAmostra> getTipoFinalidadeAmostra(@PathVariable Long id) {
        log.debug("REST request to get TipoFinalidadeAmostra : {}", id);
        Optional<TipoFinalidadeAmostra> tipoFinalidadeAmostra = tipoFinalidadeAmostraRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tipoFinalidadeAmostra);
    }

    /**
     * {@code DELETE  /tipo-finalidade-amostras/:id} : delete the "id" tipoFinalidadeAmostra.
     *
     * @param id the id of the tipoFinalidadeAmostra to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tipo-finalidade-amostras/{id}")
    public ResponseEntity<Void> deleteTipoFinalidadeAmostra(@PathVariable Long id) {
        log.debug("REST request to delete TipoFinalidadeAmostra : {}", id);
        tipoFinalidadeAmostraRepository.deleteById(id);
        tipoFinalidadeAmostraSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/tipo-finalidade-amostras?query=:query} : search for the tipoFinalidadeAmostra corresponding
     * to the query.
     *
     * @param query the query of the tipoFinalidadeAmostra search.
     * @return the result of the search.
     */
    @GetMapping("/_search/tipo-finalidade-amostras")
    public List<TipoFinalidadeAmostra> searchTipoFinalidadeAmostras(@RequestParam String query) {
        log.debug("REST request to search TipoFinalidadeAmostras for query {}", query);
        return StreamSupport
            .stream(tipoFinalidadeAmostraSearchRepository.search(queryStringQuery(query)).spliterator(), false)
        .collect(Collectors.toList());
    }
}

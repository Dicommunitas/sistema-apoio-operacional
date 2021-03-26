package br.com.transpetro.sistema_apoio_operacional.web.rest;

import br.com.transpetro.sistema_apoio_operacional.domain.TipoAmostra;
import br.com.transpetro.sistema_apoio_operacional.service.TipoAmostraService;
import br.com.transpetro.sistema_apoio_operacional.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link br.com.transpetro.sistema_apoio_operacional.domain.TipoAmostra}.
 */
@RestController
@RequestMapping("/api")
public class TipoAmostraResource {

    private final Logger log = LoggerFactory.getLogger(TipoAmostraResource.class);

    private static final String ENTITY_NAME = "tipoAmostra";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipoAmostraService tipoAmostraService;

    public TipoAmostraResource(TipoAmostraService tipoAmostraService) {
        this.tipoAmostraService = tipoAmostraService;
    }

    /**
     * {@code POST  /tipo-amostras} : Create a new tipoAmostra.
     *
     * @param tipoAmostra the tipoAmostra to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoAmostra, or with status {@code 400 (Bad Request)} if the tipoAmostra has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tipo-amostras")
    public ResponseEntity<TipoAmostra> createTipoAmostra(@Valid @RequestBody TipoAmostra tipoAmostra) throws URISyntaxException {
        log.debug("REST request to save TipoAmostra : {}", tipoAmostra);
        if (tipoAmostra.getId() != null) {
            throw new BadRequestAlertException("A new tipoAmostra cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoAmostra result = tipoAmostraService.save(tipoAmostra);
        return ResponseEntity.created(new URI("/api/tipo-amostras/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipo-amostras} : Updates an existing tipoAmostra.
     *
     * @param tipoAmostra the tipoAmostra to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoAmostra,
     * or with status {@code 400 (Bad Request)} if the tipoAmostra is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoAmostra couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tipo-amostras")
    public ResponseEntity<TipoAmostra> updateTipoAmostra(@Valid @RequestBody TipoAmostra tipoAmostra) throws URISyntaxException {
        log.debug("REST request to update TipoAmostra : {}", tipoAmostra);
        if (tipoAmostra.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TipoAmostra result = tipoAmostraService.save(tipoAmostra);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tipoAmostra.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tipo-amostras} : get all the tipoAmostras.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoAmostras in body.
     */
    @GetMapping("/tipo-amostras")
    public List<TipoAmostra> getAllTipoAmostras() {
        log.debug("REST request to get all TipoAmostras");
        return tipoAmostraService.findAll();
    }

    /**
     * {@code GET  /tipo-amostras/:id} : get the "id" tipoAmostra.
     *
     * @param id the id of the tipoAmostra to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoAmostra, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tipo-amostras/{id}")
    public ResponseEntity<TipoAmostra> getTipoAmostra(@PathVariable Long id) {
        log.debug("REST request to get TipoAmostra : {}", id);
        Optional<TipoAmostra> tipoAmostra = tipoAmostraService.findOne(id);
        return ResponseUtil.wrapOrNotFound(tipoAmostra);
    }

    /**
     * {@code DELETE  /tipo-amostras/:id} : delete the "id" tipoAmostra.
     *
     * @param id the id of the tipoAmostra to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tipo-amostras/{id}")
    public ResponseEntity<Void> deleteTipoAmostra(@PathVariable Long id) {
        log.debug("REST request to delete TipoAmostra : {}", id);
        tipoAmostraService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/tipo-amostras?query=:query} : search for the tipoAmostra corresponding
     * to the query.
     *
     * @param query the query of the tipoAmostra search.
     * @return the result of the search.
     */
    @GetMapping("/_search/tipo-amostras")
    public List<TipoAmostra> searchTipoAmostras(@RequestParam String query) {
        log.debug("REST request to search TipoAmostras for query {}", query);
        return tipoAmostraService.search(query);
    }
}

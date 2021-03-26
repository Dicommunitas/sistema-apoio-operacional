package br.com.transpetro.sistema_apoio_operacional.web.rest;

import br.com.transpetro.sistema_apoio_operacional.domain.OrigemAmostra;
import br.com.transpetro.sistema_apoio_operacional.service.OrigemAmostraService;
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
 * REST controller for managing {@link br.com.transpetro.sistema_apoio_operacional.domain.OrigemAmostra}.
 */
@RestController
@RequestMapping("/api")
public class OrigemAmostraResource {

    private final Logger log = LoggerFactory.getLogger(OrigemAmostraResource.class);

    private static final String ENTITY_NAME = "origemAmostra";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OrigemAmostraService origemAmostraService;

    public OrigemAmostraResource(OrigemAmostraService origemAmostraService) {
        this.origemAmostraService = origemAmostraService;
    }

    /**
     * {@code POST  /origem-amostras} : Create a new origemAmostra.
     *
     * @param origemAmostra the origemAmostra to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new origemAmostra, or with status {@code 400 (Bad Request)} if the origemAmostra has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/origem-amostras")
    public ResponseEntity<OrigemAmostra> createOrigemAmostra(@Valid @RequestBody OrigemAmostra origemAmostra) throws URISyntaxException {
        log.debug("REST request to save OrigemAmostra : {}", origemAmostra);
        if (origemAmostra.getId() != null) {
            throw new BadRequestAlertException("A new origemAmostra cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OrigemAmostra result = origemAmostraService.save(origemAmostra);
        return ResponseEntity.created(new URI("/api/origem-amostras/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /origem-amostras} : Updates an existing origemAmostra.
     *
     * @param origemAmostra the origemAmostra to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated origemAmostra,
     * or with status {@code 400 (Bad Request)} if the origemAmostra is not valid,
     * or with status {@code 500 (Internal Server Error)} if the origemAmostra couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/origem-amostras")
    public ResponseEntity<OrigemAmostra> updateOrigemAmostra(@Valid @RequestBody OrigemAmostra origemAmostra) throws URISyntaxException {
        log.debug("REST request to update OrigemAmostra : {}", origemAmostra);
        if (origemAmostra.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OrigemAmostra result = origemAmostraService.save(origemAmostra);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, origemAmostra.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /origem-amostras} : get all the origemAmostras.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of origemAmostras in body.
     */
    @GetMapping("/origem-amostras")
    public List<OrigemAmostra> getAllOrigemAmostras() {
        log.debug("REST request to get all OrigemAmostras");
        return origemAmostraService.findAll();
    }

    /**
     * {@code GET  /origem-amostras/:id} : get the "id" origemAmostra.
     *
     * @param id the id of the origemAmostra to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the origemAmostra, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/origem-amostras/{id}")
    public ResponseEntity<OrigemAmostra> getOrigemAmostra(@PathVariable Long id) {
        log.debug("REST request to get OrigemAmostra : {}", id);
        Optional<OrigemAmostra> origemAmostra = origemAmostraService.findOne(id);
        return ResponseUtil.wrapOrNotFound(origemAmostra);
    }

    /**
     * {@code DELETE  /origem-amostras/:id} : delete the "id" origemAmostra.
     *
     * @param id the id of the origemAmostra to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/origem-amostras/{id}")
    public ResponseEntity<Void> deleteOrigemAmostra(@PathVariable Long id) {
        log.debug("REST request to delete OrigemAmostra : {}", id);
        origemAmostraService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/origem-amostras?query=:query} : search for the origemAmostra corresponding
     * to the query.
     *
     * @param query the query of the origemAmostra search.
     * @return the result of the search.
     */
    @GetMapping("/_search/origem-amostras")
    public List<OrigemAmostra> searchOrigemAmostras(@RequestParam String query) {
        log.debug("REST request to search OrigemAmostras for query {}", query);
        return origemAmostraService.search(query);
    }
}

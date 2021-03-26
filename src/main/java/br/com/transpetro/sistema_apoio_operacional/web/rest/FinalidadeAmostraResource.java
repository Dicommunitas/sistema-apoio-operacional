package br.com.transpetro.sistema_apoio_operacional.web.rest;

import br.com.transpetro.sistema_apoio_operacional.domain.FinalidadeAmostra;
import br.com.transpetro.sistema_apoio_operacional.service.FinalidadeAmostraService;
import br.com.transpetro.sistema_apoio_operacional.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
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
 * REST controller for managing {@link br.com.transpetro.sistema_apoio_operacional.domain.FinalidadeAmostra}.
 */
@RestController
@RequestMapping("/api")
public class FinalidadeAmostraResource {

    private final Logger log = LoggerFactory.getLogger(FinalidadeAmostraResource.class);

    private static final String ENTITY_NAME = "finalidadeAmostra";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FinalidadeAmostraService finalidadeAmostraService;

    public FinalidadeAmostraResource(FinalidadeAmostraService finalidadeAmostraService) {
        this.finalidadeAmostraService = finalidadeAmostraService;
    }

    /**
     * {@code POST  /finalidade-amostras} : Create a new finalidadeAmostra.
     *
     * @param finalidadeAmostra the finalidadeAmostra to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new finalidadeAmostra, or with status {@code 400 (Bad Request)} if the finalidadeAmostra has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/finalidade-amostras")
    public ResponseEntity<FinalidadeAmostra> createFinalidadeAmostra(@Valid @RequestBody FinalidadeAmostra finalidadeAmostra) throws URISyntaxException {
        log.debug("REST request to save FinalidadeAmostra : {}", finalidadeAmostra);
        if (finalidadeAmostra.getId() != null) {
            throw new BadRequestAlertException("A new finalidadeAmostra cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FinalidadeAmostra result = finalidadeAmostraService.save(finalidadeAmostra);
        return ResponseEntity.created(new URI("/api/finalidade-amostras/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /finalidade-amostras} : Updates an existing finalidadeAmostra.
     *
     * @param finalidadeAmostra the finalidadeAmostra to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated finalidadeAmostra,
     * or with status {@code 400 (Bad Request)} if the finalidadeAmostra is not valid,
     * or with status {@code 500 (Internal Server Error)} if the finalidadeAmostra couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/finalidade-amostras")
    public ResponseEntity<FinalidadeAmostra> updateFinalidadeAmostra(@Valid @RequestBody FinalidadeAmostra finalidadeAmostra) throws URISyntaxException {
        log.debug("REST request to update FinalidadeAmostra : {}", finalidadeAmostra);
        if (finalidadeAmostra.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FinalidadeAmostra result = finalidadeAmostraService.save(finalidadeAmostra);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, finalidadeAmostra.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /finalidade-amostras} : get all the finalidadeAmostras.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of finalidadeAmostras in body.
     */
    @GetMapping("/finalidade-amostras")
    public ResponseEntity<List<FinalidadeAmostra>> getAllFinalidadeAmostras(Pageable pageable) {
        log.debug("REST request to get a page of FinalidadeAmostras");
        Page<FinalidadeAmostra> page = finalidadeAmostraService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /finalidade-amostras/:id} : get the "id" finalidadeAmostra.
     *
     * @param id the id of the finalidadeAmostra to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the finalidadeAmostra, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/finalidade-amostras/{id}")
    public ResponseEntity<FinalidadeAmostra> getFinalidadeAmostra(@PathVariable Long id) {
        log.debug("REST request to get FinalidadeAmostra : {}", id);
        Optional<FinalidadeAmostra> finalidadeAmostra = finalidadeAmostraService.findOne(id);
        return ResponseUtil.wrapOrNotFound(finalidadeAmostra);
    }

    /**
     * {@code DELETE  /finalidade-amostras/:id} : delete the "id" finalidadeAmostra.
     *
     * @param id the id of the finalidadeAmostra to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/finalidade-amostras/{id}")
    public ResponseEntity<Void> deleteFinalidadeAmostra(@PathVariable Long id) {
        log.debug("REST request to delete FinalidadeAmostra : {}", id);
        finalidadeAmostraService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/finalidade-amostras?query=:query} : search for the finalidadeAmostra corresponding
     * to the query.
     *
     * @param query the query of the finalidadeAmostra search.
     * @param pageable the pagination information.
     * @return the result of the search.
     */
    @GetMapping("/_search/finalidade-amostras")
    public ResponseEntity<List<FinalidadeAmostra>> searchFinalidadeAmostras(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of FinalidadeAmostras for query {}", query);
        Page<FinalidadeAmostra> page = finalidadeAmostraService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
        }
}

package br.com.transpetro.sistema_apoio_operacional.web.rest;

import br.com.transpetro.sistema_apoio_operacional.domain.Problema;
import br.com.transpetro.sistema_apoio_operacional.service.ProblemaService;
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
 * REST controller for managing {@link br.com.transpetro.sistema_apoio_operacional.domain.Problema}.
 */
@RestController
@RequestMapping("/api")
public class ProblemaResource {

    private final Logger log = LoggerFactory.getLogger(ProblemaResource.class);

    private static final String ENTITY_NAME = "problema";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProblemaService problemaService;

    public ProblemaResource(ProblemaService problemaService) {
        this.problemaService = problemaService;
    }

    /**
     * {@code POST  /problemas} : Create a new problema.
     *
     * @param problema the problema to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new problema, or with status {@code 400 (Bad Request)} if the problema has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/problemas")
    public ResponseEntity<Problema> createProblema(@Valid @RequestBody Problema problema) throws URISyntaxException {
        log.debug("REST request to save Problema : {}", problema);
        if (problema.getId() != null) {
            throw new BadRequestAlertException("A new problema cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Problema result = problemaService.save(problema);
        return ResponseEntity.created(new URI("/api/problemas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /problemas} : Updates an existing problema.
     *
     * @param problema the problema to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated problema,
     * or with status {@code 400 (Bad Request)} if the problema is not valid,
     * or with status {@code 500 (Internal Server Error)} if the problema couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/problemas")
    public ResponseEntity<Problema> updateProblema(@Valid @RequestBody Problema problema) throws URISyntaxException {
        log.debug("REST request to update Problema : {}", problema);
        if (problema.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Problema result = problemaService.save(problema);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, problema.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /problemas} : get all the problemas.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of problemas in body.
     */
    @GetMapping("/problemas")
    public ResponseEntity<List<Problema>> getAllProblemas(Pageable pageable) {
        log.debug("REST request to get a page of Problemas");
        Page<Problema> page = problemaService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /problemas/:id} : get the "id" problema.
     *
     * @param id the id of the problema to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the problema, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/problemas/{id}")
    public ResponseEntity<Problema> getProblema(@PathVariable Long id) {
        log.debug("REST request to get Problema : {}", id);
        Optional<Problema> problema = problemaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(problema);
    }

    /**
     * {@code DELETE  /problemas/:id} : delete the "id" problema.
     *
     * @param id the id of the problema to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/problemas/{id}")
    public ResponseEntity<Void> deleteProblema(@PathVariable Long id) {
        log.debug("REST request to delete Problema : {}", id);
        problemaService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/problemas?query=:query} : search for the problema corresponding
     * to the query.
     *
     * @param query the query of the problema search.
     * @param pageable the pagination information.
     * @return the result of the search.
     */
    @GetMapping("/_search/problemas")
    public ResponseEntity<List<Problema>> searchProblemas(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Problemas for query {}", query);
        Page<Problema> page = problemaService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
        }
}

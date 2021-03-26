package br.com.transpetro.sistema_apoio_operacional.web.rest;

import br.com.transpetro.sistema_apoio_operacional.domain.Relatorio;
import br.com.transpetro.sistema_apoio_operacional.service.RelatorioService;
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
 * REST controller for managing {@link br.com.transpetro.sistema_apoio_operacional.domain.Relatorio}.
 */
@RestController
@RequestMapping("/api")
public class RelatorioResource {

    private final Logger log = LoggerFactory.getLogger(RelatorioResource.class);

    private static final String ENTITY_NAME = "relatorio";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RelatorioService relatorioService;

    public RelatorioResource(RelatorioService relatorioService) {
        this.relatorioService = relatorioService;
    }

    /**
     * {@code POST  /relatorios} : Create a new relatorio.
     *
     * @param relatorio the relatorio to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new relatorio, or with status {@code 400 (Bad Request)} if the relatorio has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/relatorios")
    public ResponseEntity<Relatorio> createRelatorio(@Valid @RequestBody Relatorio relatorio) throws URISyntaxException {
        log.debug("REST request to save Relatorio : {}", relatorio);
        if (relatorio.getId() != null) {
            throw new BadRequestAlertException("A new relatorio cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Relatorio result = relatorioService.save(relatorio);
        return ResponseEntity.created(new URI("/api/relatorios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /relatorios} : Updates an existing relatorio.
     *
     * @param relatorio the relatorio to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated relatorio,
     * or with status {@code 400 (Bad Request)} if the relatorio is not valid,
     * or with status {@code 500 (Internal Server Error)} if the relatorio couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/relatorios")
    public ResponseEntity<Relatorio> updateRelatorio(@Valid @RequestBody Relatorio relatorio) throws URISyntaxException {
        log.debug("REST request to update Relatorio : {}", relatorio);
        if (relatorio.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Relatorio result = relatorioService.save(relatorio);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, relatorio.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /relatorios} : get all the relatorios.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of relatorios in body.
     */
    @GetMapping("/relatorios")
    public ResponseEntity<List<Relatorio>> getAllRelatorios(Pageable pageable) {
        log.debug("REST request to get a page of Relatorios");
        Page<Relatorio> page = relatorioService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /relatorios/:id} : get the "id" relatorio.
     *
     * @param id the id of the relatorio to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the relatorio, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/relatorios/{id}")
    public ResponseEntity<Relatorio> getRelatorio(@PathVariable Long id) {
        log.debug("REST request to get Relatorio : {}", id);
        Optional<Relatorio> relatorio = relatorioService.findOne(id);
        return ResponseUtil.wrapOrNotFound(relatorio);
    }

    /**
     * {@code DELETE  /relatorios/:id} : delete the "id" relatorio.
     *
     * @param id the id of the relatorio to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/relatorios/{id}")
    public ResponseEntity<Void> deleteRelatorio(@PathVariable Long id) {
        log.debug("REST request to delete Relatorio : {}", id);
        relatorioService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/relatorios?query=:query} : search for the relatorio corresponding
     * to the query.
     *
     * @param query the query of the relatorio search.
     * @param pageable the pagination information.
     * @return the result of the search.
     */
    @GetMapping("/_search/relatorios")
    public ResponseEntity<List<Relatorio>> searchRelatorios(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Relatorios for query {}", query);
        Page<Relatorio> page = relatorioService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
        }
}

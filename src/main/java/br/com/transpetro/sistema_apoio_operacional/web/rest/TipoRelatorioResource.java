package br.com.transpetro.sistema_apoio_operacional.web.rest;

import br.com.transpetro.sistema_apoio_operacional.domain.TipoRelatorio;
import br.com.transpetro.sistema_apoio_operacional.service.TipoRelatorioService;
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
 * REST controller for managing {@link br.com.transpetro.sistema_apoio_operacional.domain.TipoRelatorio}.
 */
@RestController
@RequestMapping("/api")
public class TipoRelatorioResource {

    private final Logger log = LoggerFactory.getLogger(TipoRelatorioResource.class);

    private static final String ENTITY_NAME = "tipoRelatorio";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipoRelatorioService tipoRelatorioService;

    public TipoRelatorioResource(TipoRelatorioService tipoRelatorioService) {
        this.tipoRelatorioService = tipoRelatorioService;
    }

    /**
     * {@code POST  /tipo-relatorios} : Create a new tipoRelatorio.
     *
     * @param tipoRelatorio the tipoRelatorio to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoRelatorio, or with status {@code 400 (Bad Request)} if the tipoRelatorio has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tipo-relatorios")
    public ResponseEntity<TipoRelatorio> createTipoRelatorio(@Valid @RequestBody TipoRelatorio tipoRelatorio) throws URISyntaxException {
        log.debug("REST request to save TipoRelatorio : {}", tipoRelatorio);
        if (tipoRelatorio.getId() != null) {
            throw new BadRequestAlertException("A new tipoRelatorio cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoRelatorio result = tipoRelatorioService.save(tipoRelatorio);
        return ResponseEntity.created(new URI("/api/tipo-relatorios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipo-relatorios} : Updates an existing tipoRelatorio.
     *
     * @param tipoRelatorio the tipoRelatorio to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoRelatorio,
     * or with status {@code 400 (Bad Request)} if the tipoRelatorio is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoRelatorio couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tipo-relatorios")
    public ResponseEntity<TipoRelatorio> updateTipoRelatorio(@Valid @RequestBody TipoRelatorio tipoRelatorio) throws URISyntaxException {
        log.debug("REST request to update TipoRelatorio : {}", tipoRelatorio);
        if (tipoRelatorio.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TipoRelatorio result = tipoRelatorioService.save(tipoRelatorio);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tipoRelatorio.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tipo-relatorios} : get all the tipoRelatorios.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoRelatorios in body.
     */
    @GetMapping("/tipo-relatorios")
    public List<TipoRelatorio> getAllTipoRelatorios() {
        log.debug("REST request to get all TipoRelatorios");
        return tipoRelatorioService.findAll();
    }

    /**
     * {@code GET  /tipo-relatorios/:id} : get the "id" tipoRelatorio.
     *
     * @param id the id of the tipoRelatorio to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoRelatorio, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tipo-relatorios/{id}")
    public ResponseEntity<TipoRelatorio> getTipoRelatorio(@PathVariable Long id) {
        log.debug("REST request to get TipoRelatorio : {}", id);
        Optional<TipoRelatorio> tipoRelatorio = tipoRelatorioService.findOne(id);
        return ResponseUtil.wrapOrNotFound(tipoRelatorio);
    }

    /**
     * {@code DELETE  /tipo-relatorios/:id} : delete the "id" tipoRelatorio.
     *
     * @param id the id of the tipoRelatorio to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tipo-relatorios/{id}")
    public ResponseEntity<Void> deleteTipoRelatorio(@PathVariable Long id) {
        log.debug("REST request to delete TipoRelatorio : {}", id);
        tipoRelatorioService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/tipo-relatorios?query=:query} : search for the tipoRelatorio corresponding
     * to the query.
     *
     * @param query the query of the tipoRelatorio search.
     * @return the result of the search.
     */
    @GetMapping("/_search/tipo-relatorios")
    public List<TipoRelatorio> searchTipoRelatorios(@RequestParam String query) {
        log.debug("REST request to search TipoRelatorios for query {}", query);
        return tipoRelatorioService.search(query);
    }
}

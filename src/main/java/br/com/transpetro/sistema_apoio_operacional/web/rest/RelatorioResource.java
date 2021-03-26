package br.com.transpetro.sistema_apoio_operacional.web.rest;

import br.com.transpetro.sistema_apoio_operacional.domain.Relatorio;
import br.com.transpetro.sistema_apoio_operacional.repository.RelatorioRepository;
import br.com.transpetro.sistema_apoio_operacional.repository.search.RelatorioSearchRepository;
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
 * REST controller for managing {@link br.com.transpetro.sistema_apoio_operacional.domain.Relatorio}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class RelatorioResource {

    private final Logger log = LoggerFactory.getLogger(RelatorioResource.class);

    private static final String ENTITY_NAME = "relatorio";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RelatorioRepository relatorioRepository;

    private final RelatorioSearchRepository relatorioSearchRepository;

    public RelatorioResource(RelatorioRepository relatorioRepository, RelatorioSearchRepository relatorioSearchRepository) {
        this.relatorioRepository = relatorioRepository;
        this.relatorioSearchRepository = relatorioSearchRepository;
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
        Relatorio result = relatorioRepository.save(relatorio);
        relatorioSearchRepository.save(result);
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
        Relatorio result = relatorioRepository.save(relatorio);
        relatorioSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, relatorio.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /relatorios} : get all the relatorios.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of relatorios in body.
     */
    @GetMapping("/relatorios")
    public List<Relatorio> getAllRelatorios() {
        log.debug("REST request to get all Relatorios");
        return relatorioRepository.findAll();
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
        Optional<Relatorio> relatorio = relatorioRepository.findById(id);
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
        relatorioRepository.deleteById(id);
        relatorioSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/relatorios?query=:query} : search for the relatorio corresponding
     * to the query.
     *
     * @param query the query of the relatorio search.
     * @return the result of the search.
     */
    @GetMapping("/_search/relatorios")
    public List<Relatorio> searchRelatorios(@RequestParam String query) {
        log.debug("REST request to search Relatorios for query {}", query);
        return StreamSupport
            .stream(relatorioSearchRepository.search(queryStringQuery(query)).spliterator(), false)
        .collect(Collectors.toList());
    }
}

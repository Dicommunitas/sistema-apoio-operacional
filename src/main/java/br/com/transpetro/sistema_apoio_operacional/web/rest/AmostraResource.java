package br.com.transpetro.sistema_apoio_operacional.web.rest;

import br.com.transpetro.sistema_apoio_operacional.domain.Amostra;
import br.com.transpetro.sistema_apoio_operacional.repository.AmostraRepository;
import br.com.transpetro.sistema_apoio_operacional.repository.search.AmostraSearchRepository;
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
 * REST controller for managing {@link br.com.transpetro.sistema_apoio_operacional.domain.Amostra}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AmostraResource {

    private final Logger log = LoggerFactory.getLogger(AmostraResource.class);

    private static final String ENTITY_NAME = "amostra";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AmostraRepository amostraRepository;

    private final AmostraSearchRepository amostraSearchRepository;

    public AmostraResource(AmostraRepository amostraRepository, AmostraSearchRepository amostraSearchRepository) {
        this.amostraRepository = amostraRepository;
        this.amostraSearchRepository = amostraSearchRepository;
    }

    /**
     * {@code POST  /amostras} : Create a new amostra.
     *
     * @param amostra the amostra to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new amostra, or with status {@code 400 (Bad Request)} if the amostra has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/amostras")
    public ResponseEntity<Amostra> createAmostra(@Valid @RequestBody Amostra amostra) throws URISyntaxException {
        log.debug("REST request to save Amostra : {}", amostra);
        if (amostra.getId() != null) {
            throw new BadRequestAlertException("A new amostra cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Amostra result = amostraRepository.save(amostra);
        amostraSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/amostras/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /amostras} : Updates an existing amostra.
     *
     * @param amostra the amostra to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated amostra,
     * or with status {@code 400 (Bad Request)} if the amostra is not valid,
     * or with status {@code 500 (Internal Server Error)} if the amostra couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/amostras")
    public ResponseEntity<Amostra> updateAmostra(@Valid @RequestBody Amostra amostra) throws URISyntaxException {
        log.debug("REST request to update Amostra : {}", amostra);
        if (amostra.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Amostra result = amostraRepository.save(amostra);
        amostraSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, amostra.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /amostras} : get all the amostras.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of amostras in body.
     */
    @GetMapping("/amostras")
    public List<Amostra> getAllAmostras() {
        log.debug("REST request to get all Amostras");
        return amostraRepository.findAll();
    }

    /**
     * {@code GET  /amostras/:id} : get the "id" amostra.
     *
     * @param id the id of the amostra to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the amostra, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/amostras/{id}")
    public ResponseEntity<Amostra> getAmostra(@PathVariable Long id) {
        log.debug("REST request to get Amostra : {}", id);
        Optional<Amostra> amostra = amostraRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(amostra);
    }

    /**
     * {@code DELETE  /amostras/:id} : delete the "id" amostra.
     *
     * @param id the id of the amostra to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/amostras/{id}")
    public ResponseEntity<Void> deleteAmostra(@PathVariable Long id) {
        log.debug("REST request to delete Amostra : {}", id);
        amostraRepository.deleteById(id);
        amostraSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/amostras?query=:query} : search for the amostra corresponding
     * to the query.
     *
     * @param query the query of the amostra search.
     * @return the result of the search.
     */
    @GetMapping("/_search/amostras")
    public List<Amostra> searchAmostras(@RequestParam String query) {
        log.debug("REST request to search Amostras for query {}", query);
        return StreamSupport
            .stream(amostraSearchRepository.search(queryStringQuery(query)).spliterator(), false)
        .collect(Collectors.toList());
    }
}

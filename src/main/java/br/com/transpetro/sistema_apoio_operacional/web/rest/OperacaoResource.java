package br.com.transpetro.sistema_apoio_operacional.web.rest;

import br.com.transpetro.sistema_apoio_operacional.domain.Operacao;
import br.com.transpetro.sistema_apoio_operacional.repository.OperacaoRepository;
import br.com.transpetro.sistema_apoio_operacional.repository.search.OperacaoSearchRepository;
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
 * REST controller for managing {@link br.com.transpetro.sistema_apoio_operacional.domain.Operacao}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class OperacaoResource {

    private final Logger log = LoggerFactory.getLogger(OperacaoResource.class);

    private static final String ENTITY_NAME = "operacao";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OperacaoRepository operacaoRepository;

    private final OperacaoSearchRepository operacaoSearchRepository;

    public OperacaoResource(OperacaoRepository operacaoRepository, OperacaoSearchRepository operacaoSearchRepository) {
        this.operacaoRepository = operacaoRepository;
        this.operacaoSearchRepository = operacaoSearchRepository;
    }

    /**
     * {@code POST  /operacaos} : Create a new operacao.
     *
     * @param operacao the operacao to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new operacao, or with status {@code 400 (Bad Request)} if the operacao has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/operacaos")
    public ResponseEntity<Operacao> createOperacao(@Valid @RequestBody Operacao operacao) throws URISyntaxException {
        log.debug("REST request to save Operacao : {}", operacao);
        if (operacao.getId() != null) {
            throw new BadRequestAlertException("A new operacao cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Operacao result = operacaoRepository.save(operacao);
        operacaoSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/operacaos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /operacaos} : Updates an existing operacao.
     *
     * @param operacao the operacao to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated operacao,
     * or with status {@code 400 (Bad Request)} if the operacao is not valid,
     * or with status {@code 500 (Internal Server Error)} if the operacao couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/operacaos")
    public ResponseEntity<Operacao> updateOperacao(@Valid @RequestBody Operacao operacao) throws URISyntaxException {
        log.debug("REST request to update Operacao : {}", operacao);
        if (operacao.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Operacao result = operacaoRepository.save(operacao);
        operacaoSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, operacao.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /operacaos} : get all the operacaos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of operacaos in body.
     */
    @GetMapping("/operacaos")
    public List<Operacao> getAllOperacaos() {
        log.debug("REST request to get all Operacaos");
        return operacaoRepository.findAll();
    }

    /**
     * {@code GET  /operacaos/:id} : get the "id" operacao.
     *
     * @param id the id of the operacao to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the operacao, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/operacaos/{id}")
    public ResponseEntity<Operacao> getOperacao(@PathVariable Long id) {
        log.debug("REST request to get Operacao : {}", id);
        Optional<Operacao> operacao = operacaoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(operacao);
    }

    /**
     * {@code DELETE  /operacaos/:id} : delete the "id" operacao.
     *
     * @param id the id of the operacao to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/operacaos/{id}")
    public ResponseEntity<Void> deleteOperacao(@PathVariable Long id) {
        log.debug("REST request to delete Operacao : {}", id);
        operacaoRepository.deleteById(id);
        operacaoSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/operacaos?query=:query} : search for the operacao corresponding
     * to the query.
     *
     * @param query the query of the operacao search.
     * @return the result of the search.
     */
    @GetMapping("/_search/operacaos")
    public List<Operacao> searchOperacaos(@RequestParam String query) {
        log.debug("REST request to search Operacaos for query {}", query);
        return StreamSupport
            .stream(operacaoSearchRepository.search(queryStringQuery(query)).spliterator(), false)
        .collect(Collectors.toList());
    }
}

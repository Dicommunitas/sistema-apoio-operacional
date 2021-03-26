package br.com.transpetro.sistema_apoio_operacional.service.impl;

import br.com.transpetro.sistema_apoio_operacional.service.RelatorioService;
import br.com.transpetro.sistema_apoio_operacional.domain.Relatorio;
import br.com.transpetro.sistema_apoio_operacional.repository.RelatorioRepository;
import br.com.transpetro.sistema_apoio_operacional.repository.search.RelatorioSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing {@link Relatorio}.
 */
@Service
@Transactional
public class RelatorioServiceImpl implements RelatorioService {

    private final Logger log = LoggerFactory.getLogger(RelatorioServiceImpl.class);

    private final RelatorioRepository relatorioRepository;

    private final RelatorioSearchRepository relatorioSearchRepository;

    public RelatorioServiceImpl(RelatorioRepository relatorioRepository, RelatorioSearchRepository relatorioSearchRepository) {
        this.relatorioRepository = relatorioRepository;
        this.relatorioSearchRepository = relatorioSearchRepository;
    }

    @Override
    public Relatorio save(Relatorio relatorio) {
        log.debug("Request to save Relatorio : {}", relatorio);
        Relatorio result = relatorioRepository.save(relatorio);
        relatorioSearchRepository.save(result);
        return result;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Relatorio> findAll(Pageable pageable) {
        log.debug("Request to get all Relatorios");
        return relatorioRepository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Relatorio> findOne(Long id) {
        log.debug("Request to get Relatorio : {}", id);
        return relatorioRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Relatorio : {}", id);
        relatorioRepository.deleteById(id);
        relatorioSearchRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Relatorio> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Relatorios for query {}", query);
        return relatorioSearchRepository.search(queryStringQuery(query), pageable);    }
}

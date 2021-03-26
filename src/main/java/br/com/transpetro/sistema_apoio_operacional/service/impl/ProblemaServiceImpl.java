package br.com.transpetro.sistema_apoio_operacional.service.impl;

import br.com.transpetro.sistema_apoio_operacional.service.ProblemaService;
import br.com.transpetro.sistema_apoio_operacional.domain.Problema;
import br.com.transpetro.sistema_apoio_operacional.repository.ProblemaRepository;
import br.com.transpetro.sistema_apoio_operacional.repository.search.ProblemaSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing {@link Problema}.
 */
@Service
@Transactional
public class ProblemaServiceImpl implements ProblemaService {

    private final Logger log = LoggerFactory.getLogger(ProblemaServiceImpl.class);

    private final ProblemaRepository problemaRepository;

    private final ProblemaSearchRepository problemaSearchRepository;

    public ProblemaServiceImpl(ProblemaRepository problemaRepository, ProblemaSearchRepository problemaSearchRepository) {
        this.problemaRepository = problemaRepository;
        this.problemaSearchRepository = problemaSearchRepository;
    }

    @Override
    public Problema save(Problema problema) {
        log.debug("Request to save Problema : {}", problema);
        Problema result = problemaRepository.save(problema);
        problemaSearchRepository.save(result);
        return result;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Problema> findAll(Pageable pageable) {
        log.debug("Request to get all Problemas");
        return problemaRepository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Problema> findOne(Long id) {
        log.debug("Request to get Problema : {}", id);
        return problemaRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Problema : {}", id);
        problemaRepository.deleteById(id);
        problemaSearchRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Problema> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Problemas for query {}", query);
        return problemaSearchRepository.search(queryStringQuery(query), pageable);    }
}

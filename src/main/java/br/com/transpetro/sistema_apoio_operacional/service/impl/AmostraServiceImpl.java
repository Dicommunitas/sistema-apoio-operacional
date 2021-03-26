package br.com.transpetro.sistema_apoio_operacional.service.impl;

import br.com.transpetro.sistema_apoio_operacional.service.AmostraService;
import br.com.transpetro.sistema_apoio_operacional.domain.Amostra;
import br.com.transpetro.sistema_apoio_operacional.repository.AmostraRepository;
import br.com.transpetro.sistema_apoio_operacional.repository.search.AmostraSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing {@link Amostra}.
 */
@Service
@Transactional
public class AmostraServiceImpl implements AmostraService {

    private final Logger log = LoggerFactory.getLogger(AmostraServiceImpl.class);

    private final AmostraRepository amostraRepository;

    private final AmostraSearchRepository amostraSearchRepository;

    public AmostraServiceImpl(AmostraRepository amostraRepository, AmostraSearchRepository amostraSearchRepository) {
        this.amostraRepository = amostraRepository;
        this.amostraSearchRepository = amostraSearchRepository;
    }

    @Override
    public Amostra save(Amostra amostra) {
        log.debug("Request to save Amostra : {}", amostra);
        Amostra result = amostraRepository.save(amostra);
        amostraSearchRepository.save(result);
        return result;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Amostra> findAll(Pageable pageable) {
        log.debug("Request to get all Amostras");
        return amostraRepository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Amostra> findOne(Long id) {
        log.debug("Request to get Amostra : {}", id);
        return amostraRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Amostra : {}", id);
        amostraRepository.deleteById(id);
        amostraSearchRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Amostra> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Amostras for query {}", query);
        return amostraSearchRepository.search(queryStringQuery(query), pageable);    }
}

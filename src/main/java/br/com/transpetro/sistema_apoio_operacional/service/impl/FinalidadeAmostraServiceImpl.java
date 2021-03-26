package br.com.transpetro.sistema_apoio_operacional.service.impl;

import br.com.transpetro.sistema_apoio_operacional.service.FinalidadeAmostraService;
import br.com.transpetro.sistema_apoio_operacional.domain.FinalidadeAmostra;
import br.com.transpetro.sistema_apoio_operacional.repository.FinalidadeAmostraRepository;
import br.com.transpetro.sistema_apoio_operacional.repository.search.FinalidadeAmostraSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing {@link FinalidadeAmostra}.
 */
@Service
@Transactional
public class FinalidadeAmostraServiceImpl implements FinalidadeAmostraService {

    private final Logger log = LoggerFactory.getLogger(FinalidadeAmostraServiceImpl.class);

    private final FinalidadeAmostraRepository finalidadeAmostraRepository;

    private final FinalidadeAmostraSearchRepository finalidadeAmostraSearchRepository;

    public FinalidadeAmostraServiceImpl(FinalidadeAmostraRepository finalidadeAmostraRepository, FinalidadeAmostraSearchRepository finalidadeAmostraSearchRepository) {
        this.finalidadeAmostraRepository = finalidadeAmostraRepository;
        this.finalidadeAmostraSearchRepository = finalidadeAmostraSearchRepository;
    }

    @Override
    public FinalidadeAmostra save(FinalidadeAmostra finalidadeAmostra) {
        log.debug("Request to save FinalidadeAmostra : {}", finalidadeAmostra);
        FinalidadeAmostra result = finalidadeAmostraRepository.save(finalidadeAmostra);
        finalidadeAmostraSearchRepository.save(result);
        return result;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<FinalidadeAmostra> findAll(Pageable pageable) {
        log.debug("Request to get all FinalidadeAmostras");
        return finalidadeAmostraRepository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<FinalidadeAmostra> findOne(Long id) {
        log.debug("Request to get FinalidadeAmostra : {}", id);
        return finalidadeAmostraRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete FinalidadeAmostra : {}", id);
        finalidadeAmostraRepository.deleteById(id);
        finalidadeAmostraSearchRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<FinalidadeAmostra> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of FinalidadeAmostras for query {}", query);
        return finalidadeAmostraSearchRepository.search(queryStringQuery(query), pageable);    }
}

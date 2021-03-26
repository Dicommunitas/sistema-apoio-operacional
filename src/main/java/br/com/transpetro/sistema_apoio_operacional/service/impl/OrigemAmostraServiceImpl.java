package br.com.transpetro.sistema_apoio_operacional.service.impl;

import br.com.transpetro.sistema_apoio_operacional.service.OrigemAmostraService;
import br.com.transpetro.sistema_apoio_operacional.domain.OrigemAmostra;
import br.com.transpetro.sistema_apoio_operacional.repository.OrigemAmostraRepository;
import br.com.transpetro.sistema_apoio_operacional.repository.search.OrigemAmostraSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing {@link OrigemAmostra}.
 */
@Service
@Transactional
public class OrigemAmostraServiceImpl implements OrigemAmostraService {

    private final Logger log = LoggerFactory.getLogger(OrigemAmostraServiceImpl.class);

    private final OrigemAmostraRepository origemAmostraRepository;

    private final OrigemAmostraSearchRepository origemAmostraSearchRepository;

    public OrigemAmostraServiceImpl(OrigemAmostraRepository origemAmostraRepository, OrigemAmostraSearchRepository origemAmostraSearchRepository) {
        this.origemAmostraRepository = origemAmostraRepository;
        this.origemAmostraSearchRepository = origemAmostraSearchRepository;
    }

    @Override
    public OrigemAmostra save(OrigemAmostra origemAmostra) {
        log.debug("Request to save OrigemAmostra : {}", origemAmostra);
        OrigemAmostra result = origemAmostraRepository.save(origemAmostra);
        origemAmostraSearchRepository.save(result);
        return result;
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrigemAmostra> findAll() {
        log.debug("Request to get all OrigemAmostras");
        return origemAmostraRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<OrigemAmostra> findOne(Long id) {
        log.debug("Request to get OrigemAmostra : {}", id);
        return origemAmostraRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete OrigemAmostra : {}", id);
        origemAmostraRepository.deleteById(id);
        origemAmostraSearchRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrigemAmostra> search(String query) {
        log.debug("Request to search OrigemAmostras for query {}", query);
        return StreamSupport
            .stream(origemAmostraSearchRepository.search(queryStringQuery(query)).spliterator(), false)
        .collect(Collectors.toList());
    }
}

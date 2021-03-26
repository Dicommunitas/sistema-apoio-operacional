package br.com.transpetro.sistema_apoio_operacional.service.impl;

import br.com.transpetro.sistema_apoio_operacional.service.TipoAmostraService;
import br.com.transpetro.sistema_apoio_operacional.domain.TipoAmostra;
import br.com.transpetro.sistema_apoio_operacional.repository.TipoAmostraRepository;
import br.com.transpetro.sistema_apoio_operacional.repository.search.TipoAmostraSearchRepository;
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
 * Service Implementation for managing {@link TipoAmostra}.
 */
@Service
@Transactional
public class TipoAmostraServiceImpl implements TipoAmostraService {

    private final Logger log = LoggerFactory.getLogger(TipoAmostraServiceImpl.class);

    private final TipoAmostraRepository tipoAmostraRepository;

    private final TipoAmostraSearchRepository tipoAmostraSearchRepository;

    public TipoAmostraServiceImpl(TipoAmostraRepository tipoAmostraRepository, TipoAmostraSearchRepository tipoAmostraSearchRepository) {
        this.tipoAmostraRepository = tipoAmostraRepository;
        this.tipoAmostraSearchRepository = tipoAmostraSearchRepository;
    }

    @Override
    public TipoAmostra save(TipoAmostra tipoAmostra) {
        log.debug("Request to save TipoAmostra : {}", tipoAmostra);
        TipoAmostra result = tipoAmostraRepository.save(tipoAmostra);
        tipoAmostraSearchRepository.save(result);
        return result;
    }

    @Override
    @Transactional(readOnly = true)
    public List<TipoAmostra> findAll() {
        log.debug("Request to get all TipoAmostras");
        return tipoAmostraRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<TipoAmostra> findOne(Long id) {
        log.debug("Request to get TipoAmostra : {}", id);
        return tipoAmostraRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete TipoAmostra : {}", id);
        tipoAmostraRepository.deleteById(id);
        tipoAmostraSearchRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TipoAmostra> search(String query) {
        log.debug("Request to search TipoAmostras for query {}", query);
        return StreamSupport
            .stream(tipoAmostraSearchRepository.search(queryStringQuery(query)).spliterator(), false)
        .collect(Collectors.toList());
    }
}

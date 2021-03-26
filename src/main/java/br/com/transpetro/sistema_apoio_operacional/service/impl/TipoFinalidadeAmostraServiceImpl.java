package br.com.transpetro.sistema_apoio_operacional.service.impl;

import br.com.transpetro.sistema_apoio_operacional.service.TipoFinalidadeAmostraService;
import br.com.transpetro.sistema_apoio_operacional.domain.TipoFinalidadeAmostra;
import br.com.transpetro.sistema_apoio_operacional.repository.TipoFinalidadeAmostraRepository;
import br.com.transpetro.sistema_apoio_operacional.repository.search.TipoFinalidadeAmostraSearchRepository;
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
 * Service Implementation for managing {@link TipoFinalidadeAmostra}.
 */
@Service
@Transactional
public class TipoFinalidadeAmostraServiceImpl implements TipoFinalidadeAmostraService {

    private final Logger log = LoggerFactory.getLogger(TipoFinalidadeAmostraServiceImpl.class);

    private final TipoFinalidadeAmostraRepository tipoFinalidadeAmostraRepository;

    private final TipoFinalidadeAmostraSearchRepository tipoFinalidadeAmostraSearchRepository;

    public TipoFinalidadeAmostraServiceImpl(TipoFinalidadeAmostraRepository tipoFinalidadeAmostraRepository, TipoFinalidadeAmostraSearchRepository tipoFinalidadeAmostraSearchRepository) {
        this.tipoFinalidadeAmostraRepository = tipoFinalidadeAmostraRepository;
        this.tipoFinalidadeAmostraSearchRepository = tipoFinalidadeAmostraSearchRepository;
    }

    @Override
    public TipoFinalidadeAmostra save(TipoFinalidadeAmostra tipoFinalidadeAmostra) {
        log.debug("Request to save TipoFinalidadeAmostra : {}", tipoFinalidadeAmostra);
        TipoFinalidadeAmostra result = tipoFinalidadeAmostraRepository.save(tipoFinalidadeAmostra);
        tipoFinalidadeAmostraSearchRepository.save(result);
        return result;
    }

    @Override
    @Transactional(readOnly = true)
    public List<TipoFinalidadeAmostra> findAll() {
        log.debug("Request to get all TipoFinalidadeAmostras");
        return tipoFinalidadeAmostraRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<TipoFinalidadeAmostra> findOne(Long id) {
        log.debug("Request to get TipoFinalidadeAmostra : {}", id);
        return tipoFinalidadeAmostraRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete TipoFinalidadeAmostra : {}", id);
        tipoFinalidadeAmostraRepository.deleteById(id);
        tipoFinalidadeAmostraSearchRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TipoFinalidadeAmostra> search(String query) {
        log.debug("Request to search TipoFinalidadeAmostras for query {}", query);
        return StreamSupport
            .stream(tipoFinalidadeAmostraSearchRepository.search(queryStringQuery(query)).spliterator(), false)
        .collect(Collectors.toList());
    }
}

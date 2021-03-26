package br.com.transpetro.sistema_apoio_operacional.service.impl;

import br.com.transpetro.sistema_apoio_operacional.service.TipoRelatorioService;
import br.com.transpetro.sistema_apoio_operacional.domain.TipoRelatorio;
import br.com.transpetro.sistema_apoio_operacional.repository.TipoRelatorioRepository;
import br.com.transpetro.sistema_apoio_operacional.repository.search.TipoRelatorioSearchRepository;
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
 * Service Implementation for managing {@link TipoRelatorio}.
 */
@Service
@Transactional
public class TipoRelatorioServiceImpl implements TipoRelatorioService {

    private final Logger log = LoggerFactory.getLogger(TipoRelatorioServiceImpl.class);

    private final TipoRelatorioRepository tipoRelatorioRepository;

    private final TipoRelatorioSearchRepository tipoRelatorioSearchRepository;

    public TipoRelatorioServiceImpl(TipoRelatorioRepository tipoRelatorioRepository, TipoRelatorioSearchRepository tipoRelatorioSearchRepository) {
        this.tipoRelatorioRepository = tipoRelatorioRepository;
        this.tipoRelatorioSearchRepository = tipoRelatorioSearchRepository;
    }

    @Override
    public TipoRelatorio save(TipoRelatorio tipoRelatorio) {
        log.debug("Request to save TipoRelatorio : {}", tipoRelatorio);
        TipoRelatorio result = tipoRelatorioRepository.save(tipoRelatorio);
        tipoRelatorioSearchRepository.save(result);
        return result;
    }

    @Override
    @Transactional(readOnly = true)
    public List<TipoRelatorio> findAll() {
        log.debug("Request to get all TipoRelatorios");
        return tipoRelatorioRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<TipoRelatorio> findOne(Long id) {
        log.debug("Request to get TipoRelatorio : {}", id);
        return tipoRelatorioRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete TipoRelatorio : {}", id);
        tipoRelatorioRepository.deleteById(id);
        tipoRelatorioSearchRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TipoRelatorio> search(String query) {
        log.debug("Request to search TipoRelatorios for query {}", query);
        return StreamSupport
            .stream(tipoRelatorioSearchRepository.search(queryStringQuery(query)).spliterator(), false)
        .collect(Collectors.toList());
    }
}

package br.com.transpetro.sistema_apoio_operacional.service.impl;

import br.com.transpetro.sistema_apoio_operacional.service.OperacaoService;
import br.com.transpetro.sistema_apoio_operacional.domain.Operacao;
import br.com.transpetro.sistema_apoio_operacional.repository.OperacaoRepository;
import br.com.transpetro.sistema_apoio_operacional.repository.search.OperacaoSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing {@link Operacao}.
 */
@Service
@Transactional
public class OperacaoServiceImpl implements OperacaoService {

    private final Logger log = LoggerFactory.getLogger(OperacaoServiceImpl.class);

    private final OperacaoRepository operacaoRepository;

    private final OperacaoSearchRepository operacaoSearchRepository;

    public OperacaoServiceImpl(OperacaoRepository operacaoRepository, OperacaoSearchRepository operacaoSearchRepository) {
        this.operacaoRepository = operacaoRepository;
        this.operacaoSearchRepository = operacaoSearchRepository;
    }

    @Override
    public Operacao save(Operacao operacao) {
        log.debug("Request to save Operacao : {}", operacao);
        Operacao result = operacaoRepository.save(operacao);
        operacaoSearchRepository.save(result);
        return result;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Operacao> findAll(Pageable pageable) {
        log.debug("Request to get all Operacaos");
        return operacaoRepository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Operacao> findOne(Long id) {
        log.debug("Request to get Operacao : {}", id);
        return operacaoRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Operacao : {}", id);
        operacaoRepository.deleteById(id);
        operacaoSearchRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Operacao> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Operacaos for query {}", query);
        return operacaoSearchRepository.search(queryStringQuery(query), pageable);    }
}

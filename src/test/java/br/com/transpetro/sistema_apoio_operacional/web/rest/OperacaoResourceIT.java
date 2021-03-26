package br.com.transpetro.sistema_apoio_operacional.web.rest;

import br.com.transpetro.sistema_apoio_operacional.SistemaApoioOperacionalApp;
import br.com.transpetro.sistema_apoio_operacional.domain.Operacao;
import br.com.transpetro.sistema_apoio_operacional.repository.OperacaoRepository;
import br.com.transpetro.sistema_apoio_operacional.repository.search.OperacaoSearchRepository;
import br.com.transpetro.sistema_apoio_operacional.service.OperacaoService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link OperacaoResource} REST controller.
 */
@SpringBootTest(classes = SistemaApoioOperacionalApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class OperacaoResourceIT {

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    private static final Instant DEFAULT_INICIO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_INICIO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_FIM = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FIM = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_QUANTIDADE_AMOSTRAS = 1;
    private static final Integer UPDATED_QUANTIDADE_AMOSTRAS = 2;

    private static final String DEFAULT_OBSERVACAO = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACAO = "BBBBBBBBBB";

    @Autowired
    private OperacaoRepository operacaoRepository;

    @Autowired
    private OperacaoService operacaoService;

    /**
     * This repository is mocked in the br.com.transpetro.sistema_apoio_operacional.repository.search test package.
     *
     * @see br.com.transpetro.sistema_apoio_operacional.repository.search.OperacaoSearchRepositoryMockConfiguration
     */
    @Autowired
    private OperacaoSearchRepository mockOperacaoSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restOperacaoMockMvc;

    private Operacao operacao;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Operacao createEntity(EntityManager em) {
        Operacao operacao = new Operacao()
            .descricao(DEFAULT_DESCRICAO)
            .inicio(DEFAULT_INICIO)
            .fim(DEFAULT_FIM)
            .quantidadeAmostras(DEFAULT_QUANTIDADE_AMOSTRAS)
            .observacao(DEFAULT_OBSERVACAO);
        return operacao;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Operacao createUpdatedEntity(EntityManager em) {
        Operacao operacao = new Operacao()
            .descricao(UPDATED_DESCRICAO)
            .inicio(UPDATED_INICIO)
            .fim(UPDATED_FIM)
            .quantidadeAmostras(UPDATED_QUANTIDADE_AMOSTRAS)
            .observacao(UPDATED_OBSERVACAO);
        return operacao;
    }

    @BeforeEach
    public void initTest() {
        operacao = createEntity(em);
    }

    @Test
    @Transactional
    public void createOperacao() throws Exception {
        int databaseSizeBeforeCreate = operacaoRepository.findAll().size();
        // Create the Operacao
        restOperacaoMockMvc.perform(post("/api/operacaos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(operacao)))
            .andExpect(status().isCreated());

        // Validate the Operacao in the database
        List<Operacao> operacaoList = operacaoRepository.findAll();
        assertThat(operacaoList).hasSize(databaseSizeBeforeCreate + 1);
        Operacao testOperacao = operacaoList.get(operacaoList.size() - 1);
        assertThat(testOperacao.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
        assertThat(testOperacao.getInicio()).isEqualTo(DEFAULT_INICIO);
        assertThat(testOperacao.getFim()).isEqualTo(DEFAULT_FIM);
        assertThat(testOperacao.getQuantidadeAmostras()).isEqualTo(DEFAULT_QUANTIDADE_AMOSTRAS);
        assertThat(testOperacao.getObservacao()).isEqualTo(DEFAULT_OBSERVACAO);

        // Validate the Operacao in Elasticsearch
        verify(mockOperacaoSearchRepository, times(1)).save(testOperacao);
    }

    @Test
    @Transactional
    public void createOperacaoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = operacaoRepository.findAll().size();

        // Create the Operacao with an existing ID
        operacao.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOperacaoMockMvc.perform(post("/api/operacaos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(operacao)))
            .andExpect(status().isBadRequest());

        // Validate the Operacao in the database
        List<Operacao> operacaoList = operacaoRepository.findAll();
        assertThat(operacaoList).hasSize(databaseSizeBeforeCreate);

        // Validate the Operacao in Elasticsearch
        verify(mockOperacaoSearchRepository, times(0)).save(operacao);
    }


    @Test
    @Transactional
    public void checkDescricaoIsRequired() throws Exception {
        int databaseSizeBeforeTest = operacaoRepository.findAll().size();
        // set the field null
        operacao.setDescricao(null);

        // Create the Operacao, which fails.


        restOperacaoMockMvc.perform(post("/api/operacaos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(operacao)))
            .andExpect(status().isBadRequest());

        List<Operacao> operacaoList = operacaoRepository.findAll();
        assertThat(operacaoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkQuantidadeAmostrasIsRequired() throws Exception {
        int databaseSizeBeforeTest = operacaoRepository.findAll().size();
        // set the field null
        operacao.setQuantidadeAmostras(null);

        // Create the Operacao, which fails.


        restOperacaoMockMvc.perform(post("/api/operacaos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(operacao)))
            .andExpect(status().isBadRequest());

        List<Operacao> operacaoList = operacaoRepository.findAll();
        assertThat(operacaoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllOperacaos() throws Exception {
        // Initialize the database
        operacaoRepository.saveAndFlush(operacao);

        // Get all the operacaoList
        restOperacaoMockMvc.perform(get("/api/operacaos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(operacao.getId().intValue())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)))
            .andExpect(jsonPath("$.[*].inicio").value(hasItem(DEFAULT_INICIO.toString())))
            .andExpect(jsonPath("$.[*].fim").value(hasItem(DEFAULT_FIM.toString())))
            .andExpect(jsonPath("$.[*].quantidadeAmostras").value(hasItem(DEFAULT_QUANTIDADE_AMOSTRAS)))
            .andExpect(jsonPath("$.[*].observacao").value(hasItem(DEFAULT_OBSERVACAO)));
    }
    
    @Test
    @Transactional
    public void getOperacao() throws Exception {
        // Initialize the database
        operacaoRepository.saveAndFlush(operacao);

        // Get the operacao
        restOperacaoMockMvc.perform(get("/api/operacaos/{id}", operacao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(operacao.getId().intValue()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO))
            .andExpect(jsonPath("$.inicio").value(DEFAULT_INICIO.toString()))
            .andExpect(jsonPath("$.fim").value(DEFAULT_FIM.toString()))
            .andExpect(jsonPath("$.quantidadeAmostras").value(DEFAULT_QUANTIDADE_AMOSTRAS))
            .andExpect(jsonPath("$.observacao").value(DEFAULT_OBSERVACAO));
    }
    @Test
    @Transactional
    public void getNonExistingOperacao() throws Exception {
        // Get the operacao
        restOperacaoMockMvc.perform(get("/api/operacaos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOperacao() throws Exception {
        // Initialize the database
        operacaoService.save(operacao);

        int databaseSizeBeforeUpdate = operacaoRepository.findAll().size();

        // Update the operacao
        Operacao updatedOperacao = operacaoRepository.findById(operacao.getId()).get();
        // Disconnect from session so that the updates on updatedOperacao are not directly saved in db
        em.detach(updatedOperacao);
        updatedOperacao
            .descricao(UPDATED_DESCRICAO)
            .inicio(UPDATED_INICIO)
            .fim(UPDATED_FIM)
            .quantidadeAmostras(UPDATED_QUANTIDADE_AMOSTRAS)
            .observacao(UPDATED_OBSERVACAO);

        restOperacaoMockMvc.perform(put("/api/operacaos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedOperacao)))
            .andExpect(status().isOk());

        // Validate the Operacao in the database
        List<Operacao> operacaoList = operacaoRepository.findAll();
        assertThat(operacaoList).hasSize(databaseSizeBeforeUpdate);
        Operacao testOperacao = operacaoList.get(operacaoList.size() - 1);
        assertThat(testOperacao.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testOperacao.getInicio()).isEqualTo(UPDATED_INICIO);
        assertThat(testOperacao.getFim()).isEqualTo(UPDATED_FIM);
        assertThat(testOperacao.getQuantidadeAmostras()).isEqualTo(UPDATED_QUANTIDADE_AMOSTRAS);
        assertThat(testOperacao.getObservacao()).isEqualTo(UPDATED_OBSERVACAO);

        // Validate the Operacao in Elasticsearch
        verify(mockOperacaoSearchRepository, times(2)).save(testOperacao);
    }

    @Test
    @Transactional
    public void updateNonExistingOperacao() throws Exception {
        int databaseSizeBeforeUpdate = operacaoRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOperacaoMockMvc.perform(put("/api/operacaos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(operacao)))
            .andExpect(status().isBadRequest());

        // Validate the Operacao in the database
        List<Operacao> operacaoList = operacaoRepository.findAll();
        assertThat(operacaoList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Operacao in Elasticsearch
        verify(mockOperacaoSearchRepository, times(0)).save(operacao);
    }

    @Test
    @Transactional
    public void deleteOperacao() throws Exception {
        // Initialize the database
        operacaoService.save(operacao);

        int databaseSizeBeforeDelete = operacaoRepository.findAll().size();

        // Delete the operacao
        restOperacaoMockMvc.perform(delete("/api/operacaos/{id}", operacao.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Operacao> operacaoList = operacaoRepository.findAll();
        assertThat(operacaoList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Operacao in Elasticsearch
        verify(mockOperacaoSearchRepository, times(1)).deleteById(operacao.getId());
    }

    @Test
    @Transactional
    public void searchOperacao() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        operacaoService.save(operacao);
        when(mockOperacaoSearchRepository.search(queryStringQuery("id:" + operacao.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(operacao), PageRequest.of(0, 1), 1));

        // Search the operacao
        restOperacaoMockMvc.perform(get("/api/_search/operacaos?query=id:" + operacao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(operacao.getId().intValue())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)))
            .andExpect(jsonPath("$.[*].inicio").value(hasItem(DEFAULT_INICIO.toString())))
            .andExpect(jsonPath("$.[*].fim").value(hasItem(DEFAULT_FIM.toString())))
            .andExpect(jsonPath("$.[*].quantidadeAmostras").value(hasItem(DEFAULT_QUANTIDADE_AMOSTRAS)))
            .andExpect(jsonPath("$.[*].observacao").value(hasItem(DEFAULT_OBSERVACAO)));
    }
}

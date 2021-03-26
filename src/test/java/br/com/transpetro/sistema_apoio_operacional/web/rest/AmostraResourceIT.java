package br.com.transpetro.sistema_apoio_operacional.web.rest;

import br.com.transpetro.sistema_apoio_operacional.SistemaApoioOperacionalApp;
import br.com.transpetro.sistema_apoio_operacional.domain.Amostra;
import br.com.transpetro.sistema_apoio_operacional.repository.AmostraRepository;
import br.com.transpetro.sistema_apoio_operacional.repository.search.AmostraSearchRepository;
import br.com.transpetro.sistema_apoio_operacional.service.AmostraService;

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

import br.com.transpetro.sistema_apoio_operacional.domain.enumeration.SimNao;
/**
 * Integration tests for the {@link AmostraResource} REST controller.
 */
@SpringBootTest(classes = SistemaApoioOperacionalApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class AmostraResourceIT {

    private static final Instant DEFAULT_DATA_HORA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA_HORA = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_OBSERVACAO = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACAO = "BBBBBBBBBB";

    private static final String DEFAULT_IDENTIFICACAO_OUTRO_SISTEMA = "AAAAAAAAAA";
    private static final String UPDATED_IDENTIFICACAO_OUTRO_SISTEMA = "BBBBBBBBBB";

    private static final SimNao DEFAULT_AMOSTRA_NO_LABORATORIO = SimNao.SIM;
    private static final SimNao UPDATED_AMOSTRA_NO_LABORATORIO = SimNao.NAO;

    @Autowired
    private AmostraRepository amostraRepository;

    @Autowired
    private AmostraService amostraService;

    /**
     * This repository is mocked in the br.com.transpetro.sistema_apoio_operacional.repository.search test package.
     *
     * @see br.com.transpetro.sistema_apoio_operacional.repository.search.AmostraSearchRepositoryMockConfiguration
     */
    @Autowired
    private AmostraSearchRepository mockAmostraSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAmostraMockMvc;

    private Amostra amostra;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Amostra createEntity(EntityManager em) {
        Amostra amostra = new Amostra()
            .dataHora(DEFAULT_DATA_HORA)
            .observacao(DEFAULT_OBSERVACAO)
            .identificacaoOutroSistema(DEFAULT_IDENTIFICACAO_OUTRO_SISTEMA)
            .amostraNoLaboratorio(DEFAULT_AMOSTRA_NO_LABORATORIO);
        return amostra;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Amostra createUpdatedEntity(EntityManager em) {
        Amostra amostra = new Amostra()
            .dataHora(UPDATED_DATA_HORA)
            .observacao(UPDATED_OBSERVACAO)
            .identificacaoOutroSistema(UPDATED_IDENTIFICACAO_OUTRO_SISTEMA)
            .amostraNoLaboratorio(UPDATED_AMOSTRA_NO_LABORATORIO);
        return amostra;
    }

    @BeforeEach
    public void initTest() {
        amostra = createEntity(em);
    }

    @Test
    @Transactional
    public void createAmostra() throws Exception {
        int databaseSizeBeforeCreate = amostraRepository.findAll().size();
        // Create the Amostra
        restAmostraMockMvc.perform(post("/api/amostras")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(amostra)))
            .andExpect(status().isCreated());

        // Validate the Amostra in the database
        List<Amostra> amostraList = amostraRepository.findAll();
        assertThat(amostraList).hasSize(databaseSizeBeforeCreate + 1);
        Amostra testAmostra = amostraList.get(amostraList.size() - 1);
        assertThat(testAmostra.getDataHora()).isEqualTo(DEFAULT_DATA_HORA);
        assertThat(testAmostra.getObservacao()).isEqualTo(DEFAULT_OBSERVACAO);
        assertThat(testAmostra.getIdentificacaoOutroSistema()).isEqualTo(DEFAULT_IDENTIFICACAO_OUTRO_SISTEMA);
        assertThat(testAmostra.getAmostraNoLaboratorio()).isEqualTo(DEFAULT_AMOSTRA_NO_LABORATORIO);

        // Validate the Amostra in Elasticsearch
        verify(mockAmostraSearchRepository, times(1)).save(testAmostra);
    }

    @Test
    @Transactional
    public void createAmostraWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = amostraRepository.findAll().size();

        // Create the Amostra with an existing ID
        amostra.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAmostraMockMvc.perform(post("/api/amostras")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(amostra)))
            .andExpect(status().isBadRequest());

        // Validate the Amostra in the database
        List<Amostra> amostraList = amostraRepository.findAll();
        assertThat(amostraList).hasSize(databaseSizeBeforeCreate);

        // Validate the Amostra in Elasticsearch
        verify(mockAmostraSearchRepository, times(0)).save(amostra);
    }


    @Test
    @Transactional
    public void checkDataHoraIsRequired() throws Exception {
        int databaseSizeBeforeTest = amostraRepository.findAll().size();
        // set the field null
        amostra.setDataHora(null);

        // Create the Amostra, which fails.


        restAmostraMockMvc.perform(post("/api/amostras")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(amostra)))
            .andExpect(status().isBadRequest());

        List<Amostra> amostraList = amostraRepository.findAll();
        assertThat(amostraList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAmostras() throws Exception {
        // Initialize the database
        amostraRepository.saveAndFlush(amostra);

        // Get all the amostraList
        restAmostraMockMvc.perform(get("/api/amostras?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(amostra.getId().intValue())))
            .andExpect(jsonPath("$.[*].dataHora").value(hasItem(DEFAULT_DATA_HORA.toString())))
            .andExpect(jsonPath("$.[*].observacao").value(hasItem(DEFAULT_OBSERVACAO)))
            .andExpect(jsonPath("$.[*].identificacaoOutroSistema").value(hasItem(DEFAULT_IDENTIFICACAO_OUTRO_SISTEMA)))
            .andExpect(jsonPath("$.[*].amostraNoLaboratorio").value(hasItem(DEFAULT_AMOSTRA_NO_LABORATORIO.toString())));
    }
    
    @Test
    @Transactional
    public void getAmostra() throws Exception {
        // Initialize the database
        amostraRepository.saveAndFlush(amostra);

        // Get the amostra
        restAmostraMockMvc.perform(get("/api/amostras/{id}", amostra.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(amostra.getId().intValue()))
            .andExpect(jsonPath("$.dataHora").value(DEFAULT_DATA_HORA.toString()))
            .andExpect(jsonPath("$.observacao").value(DEFAULT_OBSERVACAO))
            .andExpect(jsonPath("$.identificacaoOutroSistema").value(DEFAULT_IDENTIFICACAO_OUTRO_SISTEMA))
            .andExpect(jsonPath("$.amostraNoLaboratorio").value(DEFAULT_AMOSTRA_NO_LABORATORIO.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingAmostra() throws Exception {
        // Get the amostra
        restAmostraMockMvc.perform(get("/api/amostras/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAmostra() throws Exception {
        // Initialize the database
        amostraService.save(amostra);

        int databaseSizeBeforeUpdate = amostraRepository.findAll().size();

        // Update the amostra
        Amostra updatedAmostra = amostraRepository.findById(amostra.getId()).get();
        // Disconnect from session so that the updates on updatedAmostra are not directly saved in db
        em.detach(updatedAmostra);
        updatedAmostra
            .dataHora(UPDATED_DATA_HORA)
            .observacao(UPDATED_OBSERVACAO)
            .identificacaoOutroSistema(UPDATED_IDENTIFICACAO_OUTRO_SISTEMA)
            .amostraNoLaboratorio(UPDATED_AMOSTRA_NO_LABORATORIO);

        restAmostraMockMvc.perform(put("/api/amostras")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAmostra)))
            .andExpect(status().isOk());

        // Validate the Amostra in the database
        List<Amostra> amostraList = amostraRepository.findAll();
        assertThat(amostraList).hasSize(databaseSizeBeforeUpdate);
        Amostra testAmostra = amostraList.get(amostraList.size() - 1);
        assertThat(testAmostra.getDataHora()).isEqualTo(UPDATED_DATA_HORA);
        assertThat(testAmostra.getObservacao()).isEqualTo(UPDATED_OBSERVACAO);
        assertThat(testAmostra.getIdentificacaoOutroSistema()).isEqualTo(UPDATED_IDENTIFICACAO_OUTRO_SISTEMA);
        assertThat(testAmostra.getAmostraNoLaboratorio()).isEqualTo(UPDATED_AMOSTRA_NO_LABORATORIO);

        // Validate the Amostra in Elasticsearch
        verify(mockAmostraSearchRepository, times(2)).save(testAmostra);
    }

    @Test
    @Transactional
    public void updateNonExistingAmostra() throws Exception {
        int databaseSizeBeforeUpdate = amostraRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAmostraMockMvc.perform(put("/api/amostras")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(amostra)))
            .andExpect(status().isBadRequest());

        // Validate the Amostra in the database
        List<Amostra> amostraList = amostraRepository.findAll();
        assertThat(amostraList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Amostra in Elasticsearch
        verify(mockAmostraSearchRepository, times(0)).save(amostra);
    }

    @Test
    @Transactional
    public void deleteAmostra() throws Exception {
        // Initialize the database
        amostraService.save(amostra);

        int databaseSizeBeforeDelete = amostraRepository.findAll().size();

        // Delete the amostra
        restAmostraMockMvc.perform(delete("/api/amostras/{id}", amostra.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Amostra> amostraList = amostraRepository.findAll();
        assertThat(amostraList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Amostra in Elasticsearch
        verify(mockAmostraSearchRepository, times(1)).deleteById(amostra.getId());
    }

    @Test
    @Transactional
    public void searchAmostra() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        amostraService.save(amostra);
        when(mockAmostraSearchRepository.search(queryStringQuery("id:" + amostra.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(amostra), PageRequest.of(0, 1), 1));

        // Search the amostra
        restAmostraMockMvc.perform(get("/api/_search/amostras?query=id:" + amostra.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(amostra.getId().intValue())))
            .andExpect(jsonPath("$.[*].dataHora").value(hasItem(DEFAULT_DATA_HORA.toString())))
            .andExpect(jsonPath("$.[*].observacao").value(hasItem(DEFAULT_OBSERVACAO)))
            .andExpect(jsonPath("$.[*].identificacaoOutroSistema").value(hasItem(DEFAULT_IDENTIFICACAO_OUTRO_SISTEMA)))
            .andExpect(jsonPath("$.[*].amostraNoLaboratorio").value(hasItem(DEFAULT_AMOSTRA_NO_LABORATORIO.toString())));
    }
}

package br.com.transpetro.sistema_apoio_operacional.web.rest;

import br.com.transpetro.sistema_apoio_operacional.SistemaApoioOperacionalApp;
import br.com.transpetro.sistema_apoio_operacional.domain.TipoRelatorio;
import br.com.transpetro.sistema_apoio_operacional.repository.TipoRelatorioRepository;
import br.com.transpetro.sistema_apoio_operacional.repository.search.TipoRelatorioSearchRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TipoRelatorioResource} REST controller.
 */
@SpringBootTest(classes = SistemaApoioOperacionalApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class TipoRelatorioResourceIT {

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    @Autowired
    private TipoRelatorioRepository tipoRelatorioRepository;

    /**
     * This repository is mocked in the br.com.transpetro.sistema_apoio_operacional.repository.search test package.
     *
     * @see br.com.transpetro.sistema_apoio_operacional.repository.search.TipoRelatorioSearchRepositoryMockConfiguration
     */
    @Autowired
    private TipoRelatorioSearchRepository mockTipoRelatorioSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTipoRelatorioMockMvc;

    private TipoRelatorio tipoRelatorio;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoRelatorio createEntity(EntityManager em) {
        TipoRelatorio tipoRelatorio = new TipoRelatorio()
            .descricao(DEFAULT_DESCRICAO);
        return tipoRelatorio;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoRelatorio createUpdatedEntity(EntityManager em) {
        TipoRelatorio tipoRelatorio = new TipoRelatorio()
            .descricao(UPDATED_DESCRICAO);
        return tipoRelatorio;
    }

    @BeforeEach
    public void initTest() {
        tipoRelatorio = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipoRelatorio() throws Exception {
        int databaseSizeBeforeCreate = tipoRelatorioRepository.findAll().size();
        // Create the TipoRelatorio
        restTipoRelatorioMockMvc.perform(post("/api/tipo-relatorios")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoRelatorio)))
            .andExpect(status().isCreated());

        // Validate the TipoRelatorio in the database
        List<TipoRelatorio> tipoRelatorioList = tipoRelatorioRepository.findAll();
        assertThat(tipoRelatorioList).hasSize(databaseSizeBeforeCreate + 1);
        TipoRelatorio testTipoRelatorio = tipoRelatorioList.get(tipoRelatorioList.size() - 1);
        assertThat(testTipoRelatorio.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);

        // Validate the TipoRelatorio in Elasticsearch
        verify(mockTipoRelatorioSearchRepository, times(1)).save(testTipoRelatorio);
    }

    @Test
    @Transactional
    public void createTipoRelatorioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoRelatorioRepository.findAll().size();

        // Create the TipoRelatorio with an existing ID
        tipoRelatorio.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoRelatorioMockMvc.perform(post("/api/tipo-relatorios")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoRelatorio)))
            .andExpect(status().isBadRequest());

        // Validate the TipoRelatorio in the database
        List<TipoRelatorio> tipoRelatorioList = tipoRelatorioRepository.findAll();
        assertThat(tipoRelatorioList).hasSize(databaseSizeBeforeCreate);

        // Validate the TipoRelatorio in Elasticsearch
        verify(mockTipoRelatorioSearchRepository, times(0)).save(tipoRelatorio);
    }


    @Test
    @Transactional
    public void checkDescricaoIsRequired() throws Exception {
        int databaseSizeBeforeTest = tipoRelatorioRepository.findAll().size();
        // set the field null
        tipoRelatorio.setDescricao(null);

        // Create the TipoRelatorio, which fails.


        restTipoRelatorioMockMvc.perform(post("/api/tipo-relatorios")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoRelatorio)))
            .andExpect(status().isBadRequest());

        List<TipoRelatorio> tipoRelatorioList = tipoRelatorioRepository.findAll();
        assertThat(tipoRelatorioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTipoRelatorios() throws Exception {
        // Initialize the database
        tipoRelatorioRepository.saveAndFlush(tipoRelatorio);

        // Get all the tipoRelatorioList
        restTipoRelatorioMockMvc.perform(get("/api/tipo-relatorios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoRelatorio.getId().intValue())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)));
    }
    
    @Test
    @Transactional
    public void getTipoRelatorio() throws Exception {
        // Initialize the database
        tipoRelatorioRepository.saveAndFlush(tipoRelatorio);

        // Get the tipoRelatorio
        restTipoRelatorioMockMvc.perform(get("/api/tipo-relatorios/{id}", tipoRelatorio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tipoRelatorio.getId().intValue()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO));
    }
    @Test
    @Transactional
    public void getNonExistingTipoRelatorio() throws Exception {
        // Get the tipoRelatorio
        restTipoRelatorioMockMvc.perform(get("/api/tipo-relatorios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipoRelatorio() throws Exception {
        // Initialize the database
        tipoRelatorioRepository.saveAndFlush(tipoRelatorio);

        int databaseSizeBeforeUpdate = tipoRelatorioRepository.findAll().size();

        // Update the tipoRelatorio
        TipoRelatorio updatedTipoRelatorio = tipoRelatorioRepository.findById(tipoRelatorio.getId()).get();
        // Disconnect from session so that the updates on updatedTipoRelatorio are not directly saved in db
        em.detach(updatedTipoRelatorio);
        updatedTipoRelatorio
            .descricao(UPDATED_DESCRICAO);

        restTipoRelatorioMockMvc.perform(put("/api/tipo-relatorios")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTipoRelatorio)))
            .andExpect(status().isOk());

        // Validate the TipoRelatorio in the database
        List<TipoRelatorio> tipoRelatorioList = tipoRelatorioRepository.findAll();
        assertThat(tipoRelatorioList).hasSize(databaseSizeBeforeUpdate);
        TipoRelatorio testTipoRelatorio = tipoRelatorioList.get(tipoRelatorioList.size() - 1);
        assertThat(testTipoRelatorio.getDescricao()).isEqualTo(UPDATED_DESCRICAO);

        // Validate the TipoRelatorio in Elasticsearch
        verify(mockTipoRelatorioSearchRepository, times(1)).save(testTipoRelatorio);
    }

    @Test
    @Transactional
    public void updateNonExistingTipoRelatorio() throws Exception {
        int databaseSizeBeforeUpdate = tipoRelatorioRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoRelatorioMockMvc.perform(put("/api/tipo-relatorios")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoRelatorio)))
            .andExpect(status().isBadRequest());

        // Validate the TipoRelatorio in the database
        List<TipoRelatorio> tipoRelatorioList = tipoRelatorioRepository.findAll();
        assertThat(tipoRelatorioList).hasSize(databaseSizeBeforeUpdate);

        // Validate the TipoRelatorio in Elasticsearch
        verify(mockTipoRelatorioSearchRepository, times(0)).save(tipoRelatorio);
    }

    @Test
    @Transactional
    public void deleteTipoRelatorio() throws Exception {
        // Initialize the database
        tipoRelatorioRepository.saveAndFlush(tipoRelatorio);

        int databaseSizeBeforeDelete = tipoRelatorioRepository.findAll().size();

        // Delete the tipoRelatorio
        restTipoRelatorioMockMvc.perform(delete("/api/tipo-relatorios/{id}", tipoRelatorio.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TipoRelatorio> tipoRelatorioList = tipoRelatorioRepository.findAll();
        assertThat(tipoRelatorioList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the TipoRelatorio in Elasticsearch
        verify(mockTipoRelatorioSearchRepository, times(1)).deleteById(tipoRelatorio.getId());
    }

    @Test
    @Transactional
    public void searchTipoRelatorio() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        tipoRelatorioRepository.saveAndFlush(tipoRelatorio);
        when(mockTipoRelatorioSearchRepository.search(queryStringQuery("id:" + tipoRelatorio.getId())))
            .thenReturn(Collections.singletonList(tipoRelatorio));

        // Search the tipoRelatorio
        restTipoRelatorioMockMvc.perform(get("/api/_search/tipo-relatorios?query=id:" + tipoRelatorio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoRelatorio.getId().intValue())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)));
    }
}

package br.com.transpetro.sistema_apoio_operacional.web.rest;

import br.com.transpetro.sistema_apoio_operacional.SistemaApoioOperacionalApp;
import br.com.transpetro.sistema_apoio_operacional.domain.TipoFinalidadeAmostra;
import br.com.transpetro.sistema_apoio_operacional.repository.TipoFinalidadeAmostraRepository;
import br.com.transpetro.sistema_apoio_operacional.repository.search.TipoFinalidadeAmostraSearchRepository;
import br.com.transpetro.sistema_apoio_operacional.service.TipoFinalidadeAmostraService;

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
 * Integration tests for the {@link TipoFinalidadeAmostraResource} REST controller.
 */
@SpringBootTest(classes = SistemaApoioOperacionalApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class TipoFinalidadeAmostraResourceIT {

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    @Autowired
    private TipoFinalidadeAmostraRepository tipoFinalidadeAmostraRepository;

    @Autowired
    private TipoFinalidadeAmostraService tipoFinalidadeAmostraService;

    /**
     * This repository is mocked in the br.com.transpetro.sistema_apoio_operacional.repository.search test package.
     *
     * @see br.com.transpetro.sistema_apoio_operacional.repository.search.TipoFinalidadeAmostraSearchRepositoryMockConfiguration
     */
    @Autowired
    private TipoFinalidadeAmostraSearchRepository mockTipoFinalidadeAmostraSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTipoFinalidadeAmostraMockMvc;

    private TipoFinalidadeAmostra tipoFinalidadeAmostra;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoFinalidadeAmostra createEntity(EntityManager em) {
        TipoFinalidadeAmostra tipoFinalidadeAmostra = new TipoFinalidadeAmostra()
            .descricao(DEFAULT_DESCRICAO);
        return tipoFinalidadeAmostra;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoFinalidadeAmostra createUpdatedEntity(EntityManager em) {
        TipoFinalidadeAmostra tipoFinalidadeAmostra = new TipoFinalidadeAmostra()
            .descricao(UPDATED_DESCRICAO);
        return tipoFinalidadeAmostra;
    }

    @BeforeEach
    public void initTest() {
        tipoFinalidadeAmostra = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipoFinalidadeAmostra() throws Exception {
        int databaseSizeBeforeCreate = tipoFinalidadeAmostraRepository.findAll().size();
        // Create the TipoFinalidadeAmostra
        restTipoFinalidadeAmostraMockMvc.perform(post("/api/tipo-finalidade-amostras")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoFinalidadeAmostra)))
            .andExpect(status().isCreated());

        // Validate the TipoFinalidadeAmostra in the database
        List<TipoFinalidadeAmostra> tipoFinalidadeAmostraList = tipoFinalidadeAmostraRepository.findAll();
        assertThat(tipoFinalidadeAmostraList).hasSize(databaseSizeBeforeCreate + 1);
        TipoFinalidadeAmostra testTipoFinalidadeAmostra = tipoFinalidadeAmostraList.get(tipoFinalidadeAmostraList.size() - 1);
        assertThat(testTipoFinalidadeAmostra.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);

        // Validate the TipoFinalidadeAmostra in Elasticsearch
        verify(mockTipoFinalidadeAmostraSearchRepository, times(1)).save(testTipoFinalidadeAmostra);
    }

    @Test
    @Transactional
    public void createTipoFinalidadeAmostraWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoFinalidadeAmostraRepository.findAll().size();

        // Create the TipoFinalidadeAmostra with an existing ID
        tipoFinalidadeAmostra.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoFinalidadeAmostraMockMvc.perform(post("/api/tipo-finalidade-amostras")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoFinalidadeAmostra)))
            .andExpect(status().isBadRequest());

        // Validate the TipoFinalidadeAmostra in the database
        List<TipoFinalidadeAmostra> tipoFinalidadeAmostraList = tipoFinalidadeAmostraRepository.findAll();
        assertThat(tipoFinalidadeAmostraList).hasSize(databaseSizeBeforeCreate);

        // Validate the TipoFinalidadeAmostra in Elasticsearch
        verify(mockTipoFinalidadeAmostraSearchRepository, times(0)).save(tipoFinalidadeAmostra);
    }


    @Test
    @Transactional
    public void checkDescricaoIsRequired() throws Exception {
        int databaseSizeBeforeTest = tipoFinalidadeAmostraRepository.findAll().size();
        // set the field null
        tipoFinalidadeAmostra.setDescricao(null);

        // Create the TipoFinalidadeAmostra, which fails.


        restTipoFinalidadeAmostraMockMvc.perform(post("/api/tipo-finalidade-amostras")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoFinalidadeAmostra)))
            .andExpect(status().isBadRequest());

        List<TipoFinalidadeAmostra> tipoFinalidadeAmostraList = tipoFinalidadeAmostraRepository.findAll();
        assertThat(tipoFinalidadeAmostraList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTipoFinalidadeAmostras() throws Exception {
        // Initialize the database
        tipoFinalidadeAmostraRepository.saveAndFlush(tipoFinalidadeAmostra);

        // Get all the tipoFinalidadeAmostraList
        restTipoFinalidadeAmostraMockMvc.perform(get("/api/tipo-finalidade-amostras?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoFinalidadeAmostra.getId().intValue())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)));
    }
    
    @Test
    @Transactional
    public void getTipoFinalidadeAmostra() throws Exception {
        // Initialize the database
        tipoFinalidadeAmostraRepository.saveAndFlush(tipoFinalidadeAmostra);

        // Get the tipoFinalidadeAmostra
        restTipoFinalidadeAmostraMockMvc.perform(get("/api/tipo-finalidade-amostras/{id}", tipoFinalidadeAmostra.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tipoFinalidadeAmostra.getId().intValue()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO));
    }
    @Test
    @Transactional
    public void getNonExistingTipoFinalidadeAmostra() throws Exception {
        // Get the tipoFinalidadeAmostra
        restTipoFinalidadeAmostraMockMvc.perform(get("/api/tipo-finalidade-amostras/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipoFinalidadeAmostra() throws Exception {
        // Initialize the database
        tipoFinalidadeAmostraService.save(tipoFinalidadeAmostra);

        int databaseSizeBeforeUpdate = tipoFinalidadeAmostraRepository.findAll().size();

        // Update the tipoFinalidadeAmostra
        TipoFinalidadeAmostra updatedTipoFinalidadeAmostra = tipoFinalidadeAmostraRepository.findById(tipoFinalidadeAmostra.getId()).get();
        // Disconnect from session so that the updates on updatedTipoFinalidadeAmostra are not directly saved in db
        em.detach(updatedTipoFinalidadeAmostra);
        updatedTipoFinalidadeAmostra
            .descricao(UPDATED_DESCRICAO);

        restTipoFinalidadeAmostraMockMvc.perform(put("/api/tipo-finalidade-amostras")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTipoFinalidadeAmostra)))
            .andExpect(status().isOk());

        // Validate the TipoFinalidadeAmostra in the database
        List<TipoFinalidadeAmostra> tipoFinalidadeAmostraList = tipoFinalidadeAmostraRepository.findAll();
        assertThat(tipoFinalidadeAmostraList).hasSize(databaseSizeBeforeUpdate);
        TipoFinalidadeAmostra testTipoFinalidadeAmostra = tipoFinalidadeAmostraList.get(tipoFinalidadeAmostraList.size() - 1);
        assertThat(testTipoFinalidadeAmostra.getDescricao()).isEqualTo(UPDATED_DESCRICAO);

        // Validate the TipoFinalidadeAmostra in Elasticsearch
        verify(mockTipoFinalidadeAmostraSearchRepository, times(2)).save(testTipoFinalidadeAmostra);
    }

    @Test
    @Transactional
    public void updateNonExistingTipoFinalidadeAmostra() throws Exception {
        int databaseSizeBeforeUpdate = tipoFinalidadeAmostraRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoFinalidadeAmostraMockMvc.perform(put("/api/tipo-finalidade-amostras")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoFinalidadeAmostra)))
            .andExpect(status().isBadRequest());

        // Validate the TipoFinalidadeAmostra in the database
        List<TipoFinalidadeAmostra> tipoFinalidadeAmostraList = tipoFinalidadeAmostraRepository.findAll();
        assertThat(tipoFinalidadeAmostraList).hasSize(databaseSizeBeforeUpdate);

        // Validate the TipoFinalidadeAmostra in Elasticsearch
        verify(mockTipoFinalidadeAmostraSearchRepository, times(0)).save(tipoFinalidadeAmostra);
    }

    @Test
    @Transactional
    public void deleteTipoFinalidadeAmostra() throws Exception {
        // Initialize the database
        tipoFinalidadeAmostraService.save(tipoFinalidadeAmostra);

        int databaseSizeBeforeDelete = tipoFinalidadeAmostraRepository.findAll().size();

        // Delete the tipoFinalidadeAmostra
        restTipoFinalidadeAmostraMockMvc.perform(delete("/api/tipo-finalidade-amostras/{id}", tipoFinalidadeAmostra.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TipoFinalidadeAmostra> tipoFinalidadeAmostraList = tipoFinalidadeAmostraRepository.findAll();
        assertThat(tipoFinalidadeAmostraList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the TipoFinalidadeAmostra in Elasticsearch
        verify(mockTipoFinalidadeAmostraSearchRepository, times(1)).deleteById(tipoFinalidadeAmostra.getId());
    }

    @Test
    @Transactional
    public void searchTipoFinalidadeAmostra() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        tipoFinalidadeAmostraService.save(tipoFinalidadeAmostra);
        when(mockTipoFinalidadeAmostraSearchRepository.search(queryStringQuery("id:" + tipoFinalidadeAmostra.getId())))
            .thenReturn(Collections.singletonList(tipoFinalidadeAmostra));

        // Search the tipoFinalidadeAmostra
        restTipoFinalidadeAmostraMockMvc.perform(get("/api/_search/tipo-finalidade-amostras?query=id:" + tipoFinalidadeAmostra.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoFinalidadeAmostra.getId().intValue())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)));
    }
}

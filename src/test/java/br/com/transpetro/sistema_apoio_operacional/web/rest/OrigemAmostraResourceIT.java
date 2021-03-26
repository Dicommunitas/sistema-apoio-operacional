package br.com.transpetro.sistema_apoio_operacional.web.rest;

import br.com.transpetro.sistema_apoio_operacional.SistemaApoioOperacionalApp;
import br.com.transpetro.sistema_apoio_operacional.domain.OrigemAmostra;
import br.com.transpetro.sistema_apoio_operacional.repository.OrigemAmostraRepository;
import br.com.transpetro.sistema_apoio_operacional.repository.search.OrigemAmostraSearchRepository;
import br.com.transpetro.sistema_apoio_operacional.service.OrigemAmostraService;

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
 * Integration tests for the {@link OrigemAmostraResource} REST controller.
 */
@SpringBootTest(classes = SistemaApoioOperacionalApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class OrigemAmostraResourceIT {

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    @Autowired
    private OrigemAmostraRepository origemAmostraRepository;

    @Autowired
    private OrigemAmostraService origemAmostraService;

    /**
     * This repository is mocked in the br.com.transpetro.sistema_apoio_operacional.repository.search test package.
     *
     * @see br.com.transpetro.sistema_apoio_operacional.repository.search.OrigemAmostraSearchRepositoryMockConfiguration
     */
    @Autowired
    private OrigemAmostraSearchRepository mockOrigemAmostraSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restOrigemAmostraMockMvc;

    private OrigemAmostra origemAmostra;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OrigemAmostra createEntity(EntityManager em) {
        OrigemAmostra origemAmostra = new OrigemAmostra()
            .descricao(DEFAULT_DESCRICAO);
        return origemAmostra;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OrigemAmostra createUpdatedEntity(EntityManager em) {
        OrigemAmostra origemAmostra = new OrigemAmostra()
            .descricao(UPDATED_DESCRICAO);
        return origemAmostra;
    }

    @BeforeEach
    public void initTest() {
        origemAmostra = createEntity(em);
    }

    @Test
    @Transactional
    public void createOrigemAmostra() throws Exception {
        int databaseSizeBeforeCreate = origemAmostraRepository.findAll().size();
        // Create the OrigemAmostra
        restOrigemAmostraMockMvc.perform(post("/api/origem-amostras")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(origemAmostra)))
            .andExpect(status().isCreated());

        // Validate the OrigemAmostra in the database
        List<OrigemAmostra> origemAmostraList = origemAmostraRepository.findAll();
        assertThat(origemAmostraList).hasSize(databaseSizeBeforeCreate + 1);
        OrigemAmostra testOrigemAmostra = origemAmostraList.get(origemAmostraList.size() - 1);
        assertThat(testOrigemAmostra.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);

        // Validate the OrigemAmostra in Elasticsearch
        verify(mockOrigemAmostraSearchRepository, times(1)).save(testOrigemAmostra);
    }

    @Test
    @Transactional
    public void createOrigemAmostraWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = origemAmostraRepository.findAll().size();

        // Create the OrigemAmostra with an existing ID
        origemAmostra.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrigemAmostraMockMvc.perform(post("/api/origem-amostras")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(origemAmostra)))
            .andExpect(status().isBadRequest());

        // Validate the OrigemAmostra in the database
        List<OrigemAmostra> origemAmostraList = origemAmostraRepository.findAll();
        assertThat(origemAmostraList).hasSize(databaseSizeBeforeCreate);

        // Validate the OrigemAmostra in Elasticsearch
        verify(mockOrigemAmostraSearchRepository, times(0)).save(origemAmostra);
    }


    @Test
    @Transactional
    public void checkDescricaoIsRequired() throws Exception {
        int databaseSizeBeforeTest = origemAmostraRepository.findAll().size();
        // set the field null
        origemAmostra.setDescricao(null);

        // Create the OrigemAmostra, which fails.


        restOrigemAmostraMockMvc.perform(post("/api/origem-amostras")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(origemAmostra)))
            .andExpect(status().isBadRequest());

        List<OrigemAmostra> origemAmostraList = origemAmostraRepository.findAll();
        assertThat(origemAmostraList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllOrigemAmostras() throws Exception {
        // Initialize the database
        origemAmostraRepository.saveAndFlush(origemAmostra);

        // Get all the origemAmostraList
        restOrigemAmostraMockMvc.perform(get("/api/origem-amostras?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(origemAmostra.getId().intValue())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)));
    }
    
    @Test
    @Transactional
    public void getOrigemAmostra() throws Exception {
        // Initialize the database
        origemAmostraRepository.saveAndFlush(origemAmostra);

        // Get the origemAmostra
        restOrigemAmostraMockMvc.perform(get("/api/origem-amostras/{id}", origemAmostra.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(origemAmostra.getId().intValue()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO));
    }
    @Test
    @Transactional
    public void getNonExistingOrigemAmostra() throws Exception {
        // Get the origemAmostra
        restOrigemAmostraMockMvc.perform(get("/api/origem-amostras/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOrigemAmostra() throws Exception {
        // Initialize the database
        origemAmostraService.save(origemAmostra);

        int databaseSizeBeforeUpdate = origemAmostraRepository.findAll().size();

        // Update the origemAmostra
        OrigemAmostra updatedOrigemAmostra = origemAmostraRepository.findById(origemAmostra.getId()).get();
        // Disconnect from session so that the updates on updatedOrigemAmostra are not directly saved in db
        em.detach(updatedOrigemAmostra);
        updatedOrigemAmostra
            .descricao(UPDATED_DESCRICAO);

        restOrigemAmostraMockMvc.perform(put("/api/origem-amostras")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedOrigemAmostra)))
            .andExpect(status().isOk());

        // Validate the OrigemAmostra in the database
        List<OrigemAmostra> origemAmostraList = origemAmostraRepository.findAll();
        assertThat(origemAmostraList).hasSize(databaseSizeBeforeUpdate);
        OrigemAmostra testOrigemAmostra = origemAmostraList.get(origemAmostraList.size() - 1);
        assertThat(testOrigemAmostra.getDescricao()).isEqualTo(UPDATED_DESCRICAO);

        // Validate the OrigemAmostra in Elasticsearch
        verify(mockOrigemAmostraSearchRepository, times(2)).save(testOrigemAmostra);
    }

    @Test
    @Transactional
    public void updateNonExistingOrigemAmostra() throws Exception {
        int databaseSizeBeforeUpdate = origemAmostraRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOrigemAmostraMockMvc.perform(put("/api/origem-amostras")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(origemAmostra)))
            .andExpect(status().isBadRequest());

        // Validate the OrigemAmostra in the database
        List<OrigemAmostra> origemAmostraList = origemAmostraRepository.findAll();
        assertThat(origemAmostraList).hasSize(databaseSizeBeforeUpdate);

        // Validate the OrigemAmostra in Elasticsearch
        verify(mockOrigemAmostraSearchRepository, times(0)).save(origemAmostra);
    }

    @Test
    @Transactional
    public void deleteOrigemAmostra() throws Exception {
        // Initialize the database
        origemAmostraService.save(origemAmostra);

        int databaseSizeBeforeDelete = origemAmostraRepository.findAll().size();

        // Delete the origemAmostra
        restOrigemAmostraMockMvc.perform(delete("/api/origem-amostras/{id}", origemAmostra.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<OrigemAmostra> origemAmostraList = origemAmostraRepository.findAll();
        assertThat(origemAmostraList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the OrigemAmostra in Elasticsearch
        verify(mockOrigemAmostraSearchRepository, times(1)).deleteById(origemAmostra.getId());
    }

    @Test
    @Transactional
    public void searchOrigemAmostra() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        origemAmostraService.save(origemAmostra);
        when(mockOrigemAmostraSearchRepository.search(queryStringQuery("id:" + origemAmostra.getId())))
            .thenReturn(Collections.singletonList(origemAmostra));

        // Search the origemAmostra
        restOrigemAmostraMockMvc.perform(get("/api/_search/origem-amostras?query=id:" + origemAmostra.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(origemAmostra.getId().intValue())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)));
    }
}

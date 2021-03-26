package br.com.transpetro.sistema_apoio_operacional.web.rest;

import br.com.transpetro.sistema_apoio_operacional.SistemaApoioOperacionalApp;
import br.com.transpetro.sistema_apoio_operacional.domain.FinalidadeAmostra;
import br.com.transpetro.sistema_apoio_operacional.repository.FinalidadeAmostraRepository;
import br.com.transpetro.sistema_apoio_operacional.repository.search.FinalidadeAmostraSearchRepository;
import br.com.transpetro.sistema_apoio_operacional.service.FinalidadeAmostraService;

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
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link FinalidadeAmostraResource} REST controller.
 */
@SpringBootTest(classes = SistemaApoioOperacionalApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class FinalidadeAmostraResourceIT {

    private static final String DEFAULT_LACRE = "AAAAAAAAAA";
    private static final String UPDATED_LACRE = "BBBBBBBBBB";

    @Autowired
    private FinalidadeAmostraRepository finalidadeAmostraRepository;

    @Autowired
    private FinalidadeAmostraService finalidadeAmostraService;

    /**
     * This repository is mocked in the br.com.transpetro.sistema_apoio_operacional.repository.search test package.
     *
     * @see br.com.transpetro.sistema_apoio_operacional.repository.search.FinalidadeAmostraSearchRepositoryMockConfiguration
     */
    @Autowired
    private FinalidadeAmostraSearchRepository mockFinalidadeAmostraSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restFinalidadeAmostraMockMvc;

    private FinalidadeAmostra finalidadeAmostra;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FinalidadeAmostra createEntity(EntityManager em) {
        FinalidadeAmostra finalidadeAmostra = new FinalidadeAmostra()
            .lacre(DEFAULT_LACRE);
        return finalidadeAmostra;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FinalidadeAmostra createUpdatedEntity(EntityManager em) {
        FinalidadeAmostra finalidadeAmostra = new FinalidadeAmostra()
            .lacre(UPDATED_LACRE);
        return finalidadeAmostra;
    }

    @BeforeEach
    public void initTest() {
        finalidadeAmostra = createEntity(em);
    }

    @Test
    @Transactional
    public void createFinalidadeAmostra() throws Exception {
        int databaseSizeBeforeCreate = finalidadeAmostraRepository.findAll().size();
        // Create the FinalidadeAmostra
        restFinalidadeAmostraMockMvc.perform(post("/api/finalidade-amostras")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(finalidadeAmostra)))
            .andExpect(status().isCreated());

        // Validate the FinalidadeAmostra in the database
        List<FinalidadeAmostra> finalidadeAmostraList = finalidadeAmostraRepository.findAll();
        assertThat(finalidadeAmostraList).hasSize(databaseSizeBeforeCreate + 1);
        FinalidadeAmostra testFinalidadeAmostra = finalidadeAmostraList.get(finalidadeAmostraList.size() - 1);
        assertThat(testFinalidadeAmostra.getLacre()).isEqualTo(DEFAULT_LACRE);

        // Validate the FinalidadeAmostra in Elasticsearch
        verify(mockFinalidadeAmostraSearchRepository, times(1)).save(testFinalidadeAmostra);
    }

    @Test
    @Transactional
    public void createFinalidadeAmostraWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = finalidadeAmostraRepository.findAll().size();

        // Create the FinalidadeAmostra with an existing ID
        finalidadeAmostra.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFinalidadeAmostraMockMvc.perform(post("/api/finalidade-amostras")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(finalidadeAmostra)))
            .andExpect(status().isBadRequest());

        // Validate the FinalidadeAmostra in the database
        List<FinalidadeAmostra> finalidadeAmostraList = finalidadeAmostraRepository.findAll();
        assertThat(finalidadeAmostraList).hasSize(databaseSizeBeforeCreate);

        // Validate the FinalidadeAmostra in Elasticsearch
        verify(mockFinalidadeAmostraSearchRepository, times(0)).save(finalidadeAmostra);
    }


    @Test
    @Transactional
    public void checkLacreIsRequired() throws Exception {
        int databaseSizeBeforeTest = finalidadeAmostraRepository.findAll().size();
        // set the field null
        finalidadeAmostra.setLacre(null);

        // Create the FinalidadeAmostra, which fails.


        restFinalidadeAmostraMockMvc.perform(post("/api/finalidade-amostras")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(finalidadeAmostra)))
            .andExpect(status().isBadRequest());

        List<FinalidadeAmostra> finalidadeAmostraList = finalidadeAmostraRepository.findAll();
        assertThat(finalidadeAmostraList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllFinalidadeAmostras() throws Exception {
        // Initialize the database
        finalidadeAmostraRepository.saveAndFlush(finalidadeAmostra);

        // Get all the finalidadeAmostraList
        restFinalidadeAmostraMockMvc.perform(get("/api/finalidade-amostras?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(finalidadeAmostra.getId().intValue())))
            .andExpect(jsonPath("$.[*].lacre").value(hasItem(DEFAULT_LACRE)));
    }
    
    @Test
    @Transactional
    public void getFinalidadeAmostra() throws Exception {
        // Initialize the database
        finalidadeAmostraRepository.saveAndFlush(finalidadeAmostra);

        // Get the finalidadeAmostra
        restFinalidadeAmostraMockMvc.perform(get("/api/finalidade-amostras/{id}", finalidadeAmostra.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(finalidadeAmostra.getId().intValue()))
            .andExpect(jsonPath("$.lacre").value(DEFAULT_LACRE));
    }
    @Test
    @Transactional
    public void getNonExistingFinalidadeAmostra() throws Exception {
        // Get the finalidadeAmostra
        restFinalidadeAmostraMockMvc.perform(get("/api/finalidade-amostras/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFinalidadeAmostra() throws Exception {
        // Initialize the database
        finalidadeAmostraService.save(finalidadeAmostra);

        int databaseSizeBeforeUpdate = finalidadeAmostraRepository.findAll().size();

        // Update the finalidadeAmostra
        FinalidadeAmostra updatedFinalidadeAmostra = finalidadeAmostraRepository.findById(finalidadeAmostra.getId()).get();
        // Disconnect from session so that the updates on updatedFinalidadeAmostra are not directly saved in db
        em.detach(updatedFinalidadeAmostra);
        updatedFinalidadeAmostra
            .lacre(UPDATED_LACRE);

        restFinalidadeAmostraMockMvc.perform(put("/api/finalidade-amostras")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedFinalidadeAmostra)))
            .andExpect(status().isOk());

        // Validate the FinalidadeAmostra in the database
        List<FinalidadeAmostra> finalidadeAmostraList = finalidadeAmostraRepository.findAll();
        assertThat(finalidadeAmostraList).hasSize(databaseSizeBeforeUpdate);
        FinalidadeAmostra testFinalidadeAmostra = finalidadeAmostraList.get(finalidadeAmostraList.size() - 1);
        assertThat(testFinalidadeAmostra.getLacre()).isEqualTo(UPDATED_LACRE);

        // Validate the FinalidadeAmostra in Elasticsearch
        verify(mockFinalidadeAmostraSearchRepository, times(2)).save(testFinalidadeAmostra);
    }

    @Test
    @Transactional
    public void updateNonExistingFinalidadeAmostra() throws Exception {
        int databaseSizeBeforeUpdate = finalidadeAmostraRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFinalidadeAmostraMockMvc.perform(put("/api/finalidade-amostras")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(finalidadeAmostra)))
            .andExpect(status().isBadRequest());

        // Validate the FinalidadeAmostra in the database
        List<FinalidadeAmostra> finalidadeAmostraList = finalidadeAmostraRepository.findAll();
        assertThat(finalidadeAmostraList).hasSize(databaseSizeBeforeUpdate);

        // Validate the FinalidadeAmostra in Elasticsearch
        verify(mockFinalidadeAmostraSearchRepository, times(0)).save(finalidadeAmostra);
    }

    @Test
    @Transactional
    public void deleteFinalidadeAmostra() throws Exception {
        // Initialize the database
        finalidadeAmostraService.save(finalidadeAmostra);

        int databaseSizeBeforeDelete = finalidadeAmostraRepository.findAll().size();

        // Delete the finalidadeAmostra
        restFinalidadeAmostraMockMvc.perform(delete("/api/finalidade-amostras/{id}", finalidadeAmostra.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<FinalidadeAmostra> finalidadeAmostraList = finalidadeAmostraRepository.findAll();
        assertThat(finalidadeAmostraList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the FinalidadeAmostra in Elasticsearch
        verify(mockFinalidadeAmostraSearchRepository, times(1)).deleteById(finalidadeAmostra.getId());
    }

    @Test
    @Transactional
    public void searchFinalidadeAmostra() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        finalidadeAmostraService.save(finalidadeAmostra);
        when(mockFinalidadeAmostraSearchRepository.search(queryStringQuery("id:" + finalidadeAmostra.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(finalidadeAmostra), PageRequest.of(0, 1), 1));

        // Search the finalidadeAmostra
        restFinalidadeAmostraMockMvc.perform(get("/api/_search/finalidade-amostras?query=id:" + finalidadeAmostra.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(finalidadeAmostra.getId().intValue())))
            .andExpect(jsonPath("$.[*].lacre").value(hasItem(DEFAULT_LACRE)));
    }
}

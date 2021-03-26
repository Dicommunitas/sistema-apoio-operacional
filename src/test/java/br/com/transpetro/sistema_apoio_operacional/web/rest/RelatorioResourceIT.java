package br.com.transpetro.sistema_apoio_operacional.web.rest;

import br.com.transpetro.sistema_apoio_operacional.SistemaApoioOperacionalApp;
import br.com.transpetro.sistema_apoio_operacional.domain.Relatorio;
import br.com.transpetro.sistema_apoio_operacional.repository.RelatorioRepository;
import br.com.transpetro.sistema_apoio_operacional.repository.search.RelatorioSearchRepository;
import br.com.transpetro.sistema_apoio_operacional.service.RelatorioService;

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
import org.springframework.util.Base64Utils;
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
 * Integration tests for the {@link RelatorioResource} REST controller.
 */
@SpringBootTest(classes = SistemaApoioOperacionalApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class RelatorioResourceIT {

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    @Autowired
    private RelatorioRepository relatorioRepository;

    @Autowired
    private RelatorioService relatorioService;

    /**
     * This repository is mocked in the br.com.transpetro.sistema_apoio_operacional.repository.search test package.
     *
     * @see br.com.transpetro.sistema_apoio_operacional.repository.search.RelatorioSearchRepositoryMockConfiguration
     */
    @Autowired
    private RelatorioSearchRepository mockRelatorioSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRelatorioMockMvc;

    private Relatorio relatorio;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Relatorio createEntity(EntityManager em) {
        Relatorio relatorio = new Relatorio()
            .descricao(DEFAULT_DESCRICAO);
        return relatorio;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Relatorio createUpdatedEntity(EntityManager em) {
        Relatorio relatorio = new Relatorio()
            .descricao(UPDATED_DESCRICAO);
        return relatorio;
    }

    @BeforeEach
    public void initTest() {
        relatorio = createEntity(em);
    }

    @Test
    @Transactional
    public void createRelatorio() throws Exception {
        int databaseSizeBeforeCreate = relatorioRepository.findAll().size();
        // Create the Relatorio
        restRelatorioMockMvc.perform(post("/api/relatorios")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(relatorio)))
            .andExpect(status().isCreated());

        // Validate the Relatorio in the database
        List<Relatorio> relatorioList = relatorioRepository.findAll();
        assertThat(relatorioList).hasSize(databaseSizeBeforeCreate + 1);
        Relatorio testRelatorio = relatorioList.get(relatorioList.size() - 1);
        assertThat(testRelatorio.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);

        // Validate the Relatorio in Elasticsearch
        verify(mockRelatorioSearchRepository, times(1)).save(testRelatorio);
    }

    @Test
    @Transactional
    public void createRelatorioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = relatorioRepository.findAll().size();

        // Create the Relatorio with an existing ID
        relatorio.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRelatorioMockMvc.perform(post("/api/relatorios")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(relatorio)))
            .andExpect(status().isBadRequest());

        // Validate the Relatorio in the database
        List<Relatorio> relatorioList = relatorioRepository.findAll();
        assertThat(relatorioList).hasSize(databaseSizeBeforeCreate);

        // Validate the Relatorio in Elasticsearch
        verify(mockRelatorioSearchRepository, times(0)).save(relatorio);
    }


    @Test
    @Transactional
    public void getAllRelatorios() throws Exception {
        // Initialize the database
        relatorioRepository.saveAndFlush(relatorio);

        // Get all the relatorioList
        restRelatorioMockMvc.perform(get("/api/relatorios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(relatorio.getId().intValue())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO.toString())));
    }
    
    @Test
    @Transactional
    public void getRelatorio() throws Exception {
        // Initialize the database
        relatorioRepository.saveAndFlush(relatorio);

        // Get the relatorio
        restRelatorioMockMvc.perform(get("/api/relatorios/{id}", relatorio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(relatorio.getId().intValue()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingRelatorio() throws Exception {
        // Get the relatorio
        restRelatorioMockMvc.perform(get("/api/relatorios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRelatorio() throws Exception {
        // Initialize the database
        relatorioService.save(relatorio);

        int databaseSizeBeforeUpdate = relatorioRepository.findAll().size();

        // Update the relatorio
        Relatorio updatedRelatorio = relatorioRepository.findById(relatorio.getId()).get();
        // Disconnect from session so that the updates on updatedRelatorio are not directly saved in db
        em.detach(updatedRelatorio);
        updatedRelatorio
            .descricao(UPDATED_DESCRICAO);

        restRelatorioMockMvc.perform(put("/api/relatorios")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedRelatorio)))
            .andExpect(status().isOk());

        // Validate the Relatorio in the database
        List<Relatorio> relatorioList = relatorioRepository.findAll();
        assertThat(relatorioList).hasSize(databaseSizeBeforeUpdate);
        Relatorio testRelatorio = relatorioList.get(relatorioList.size() - 1);
        assertThat(testRelatorio.getDescricao()).isEqualTo(UPDATED_DESCRICAO);

        // Validate the Relatorio in Elasticsearch
        verify(mockRelatorioSearchRepository, times(2)).save(testRelatorio);
    }

    @Test
    @Transactional
    public void updateNonExistingRelatorio() throws Exception {
        int databaseSizeBeforeUpdate = relatorioRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRelatorioMockMvc.perform(put("/api/relatorios")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(relatorio)))
            .andExpect(status().isBadRequest());

        // Validate the Relatorio in the database
        List<Relatorio> relatorioList = relatorioRepository.findAll();
        assertThat(relatorioList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Relatorio in Elasticsearch
        verify(mockRelatorioSearchRepository, times(0)).save(relatorio);
    }

    @Test
    @Transactional
    public void deleteRelatorio() throws Exception {
        // Initialize the database
        relatorioService.save(relatorio);

        int databaseSizeBeforeDelete = relatorioRepository.findAll().size();

        // Delete the relatorio
        restRelatorioMockMvc.perform(delete("/api/relatorios/{id}", relatorio.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Relatorio> relatorioList = relatorioRepository.findAll();
        assertThat(relatorioList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Relatorio in Elasticsearch
        verify(mockRelatorioSearchRepository, times(1)).deleteById(relatorio.getId());
    }

    @Test
    @Transactional
    public void searchRelatorio() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        relatorioService.save(relatorio);
        when(mockRelatorioSearchRepository.search(queryStringQuery("id:" + relatorio.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(relatorio), PageRequest.of(0, 1), 1));

        // Search the relatorio
        restRelatorioMockMvc.perform(get("/api/_search/relatorios?query=id:" + relatorio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(relatorio.getId().intValue())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO.toString())));
    }
}

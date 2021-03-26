package br.com.transpetro.sistema_apoio_operacional.web.rest;

import br.com.transpetro.sistema_apoio_operacional.SistemaApoioOperacionalApp;
import br.com.transpetro.sistema_apoio_operacional.domain.Problema;
import br.com.transpetro.sistema_apoio_operacional.repository.ProblemaRepository;
import br.com.transpetro.sistema_apoio_operacional.repository.search.ProblemaSearchRepository;
import br.com.transpetro.sistema_apoio_operacional.service.ProblemaService;

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

import br.com.transpetro.sistema_apoio_operacional.domain.enumeration.Criticidade;
import br.com.transpetro.sistema_apoio_operacional.domain.enumeration.SimNao;
/**
 * Integration tests for the {@link ProblemaResource} REST controller.
 */
@SpringBootTest(classes = SistemaApoioOperacionalApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class ProblemaResourceIT {

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    private static final Criticidade DEFAULT_CRITICIDADE = Criticidade.BAIXA;
    private static final Criticidade UPDATED_CRITICIDADE = Criticidade.MEDIA;

    private static final SimNao DEFAULT_ACEITAR_FINALIZACAO = SimNao.NAO;
    private static final SimNao UPDATED_ACEITAR_FINALIZACAO = SimNao.SIM;

    private static final byte[] DEFAULT_FOTO = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_FOTO = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_FOTO_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_FOTO_CONTENT_TYPE = "image/png";

    @Autowired
    private ProblemaRepository problemaRepository;

    @Autowired
    private ProblemaService problemaService;

    /**
     * This repository is mocked in the br.com.transpetro.sistema_apoio_operacional.repository.search test package.
     *
     * @see br.com.transpetro.sistema_apoio_operacional.repository.search.ProblemaSearchRepositoryMockConfiguration
     */
    @Autowired
    private ProblemaSearchRepository mockProblemaSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProblemaMockMvc;

    private Problema problema;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Problema createEntity(EntityManager em) {
        Problema problema = new Problema()
            .descricao(DEFAULT_DESCRICAO)
            .criticidade(DEFAULT_CRITICIDADE)
            .aceitarFinalizacao(DEFAULT_ACEITAR_FINALIZACAO)
            .foto(DEFAULT_FOTO)
            .fotoContentType(DEFAULT_FOTO_CONTENT_TYPE);
        return problema;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Problema createUpdatedEntity(EntityManager em) {
        Problema problema = new Problema()
            .descricao(UPDATED_DESCRICAO)
            .criticidade(UPDATED_CRITICIDADE)
            .aceitarFinalizacao(UPDATED_ACEITAR_FINALIZACAO)
            .foto(UPDATED_FOTO)
            .fotoContentType(UPDATED_FOTO_CONTENT_TYPE);
        return problema;
    }

    @BeforeEach
    public void initTest() {
        problema = createEntity(em);
    }

    @Test
    @Transactional
    public void createProblema() throws Exception {
        int databaseSizeBeforeCreate = problemaRepository.findAll().size();
        // Create the Problema
        restProblemaMockMvc.perform(post("/api/problemas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(problema)))
            .andExpect(status().isCreated());

        // Validate the Problema in the database
        List<Problema> problemaList = problemaRepository.findAll();
        assertThat(problemaList).hasSize(databaseSizeBeforeCreate + 1);
        Problema testProblema = problemaList.get(problemaList.size() - 1);
        assertThat(testProblema.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
        assertThat(testProblema.getCriticidade()).isEqualTo(DEFAULT_CRITICIDADE);
        assertThat(testProblema.getAceitarFinalizacao()).isEqualTo(DEFAULT_ACEITAR_FINALIZACAO);
        assertThat(testProblema.getFoto()).isEqualTo(DEFAULT_FOTO);
        assertThat(testProblema.getFotoContentType()).isEqualTo(DEFAULT_FOTO_CONTENT_TYPE);

        // Validate the Problema in Elasticsearch
        verify(mockProblemaSearchRepository, times(1)).save(testProblema);
    }

    @Test
    @Transactional
    public void createProblemaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = problemaRepository.findAll().size();

        // Create the Problema with an existing ID
        problema.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProblemaMockMvc.perform(post("/api/problemas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(problema)))
            .andExpect(status().isBadRequest());

        // Validate the Problema in the database
        List<Problema> problemaList = problemaRepository.findAll();
        assertThat(problemaList).hasSize(databaseSizeBeforeCreate);

        // Validate the Problema in Elasticsearch
        verify(mockProblemaSearchRepository, times(0)).save(problema);
    }


    @Test
    @Transactional
    public void checkCriticidadeIsRequired() throws Exception {
        int databaseSizeBeforeTest = problemaRepository.findAll().size();
        // set the field null
        problema.setCriticidade(null);

        // Create the Problema, which fails.


        restProblemaMockMvc.perform(post("/api/problemas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(problema)))
            .andExpect(status().isBadRequest());

        List<Problema> problemaList = problemaRepository.findAll();
        assertThat(problemaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProblemas() throws Exception {
        // Initialize the database
        problemaRepository.saveAndFlush(problema);

        // Get all the problemaList
        restProblemaMockMvc.perform(get("/api/problemas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(problema.getId().intValue())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO.toString())))
            .andExpect(jsonPath("$.[*].criticidade").value(hasItem(DEFAULT_CRITICIDADE.toString())))
            .andExpect(jsonPath("$.[*].aceitarFinalizacao").value(hasItem(DEFAULT_ACEITAR_FINALIZACAO.toString())))
            .andExpect(jsonPath("$.[*].fotoContentType").value(hasItem(DEFAULT_FOTO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].foto").value(hasItem(Base64Utils.encodeToString(DEFAULT_FOTO))));
    }
    
    @Test
    @Transactional
    public void getProblema() throws Exception {
        // Initialize the database
        problemaRepository.saveAndFlush(problema);

        // Get the problema
        restProblemaMockMvc.perform(get("/api/problemas/{id}", problema.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(problema.getId().intValue()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO.toString()))
            .andExpect(jsonPath("$.criticidade").value(DEFAULT_CRITICIDADE.toString()))
            .andExpect(jsonPath("$.aceitarFinalizacao").value(DEFAULT_ACEITAR_FINALIZACAO.toString()))
            .andExpect(jsonPath("$.fotoContentType").value(DEFAULT_FOTO_CONTENT_TYPE))
            .andExpect(jsonPath("$.foto").value(Base64Utils.encodeToString(DEFAULT_FOTO)));
    }
    @Test
    @Transactional
    public void getNonExistingProblema() throws Exception {
        // Get the problema
        restProblemaMockMvc.perform(get("/api/problemas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProblema() throws Exception {
        // Initialize the database
        problemaService.save(problema);

        int databaseSizeBeforeUpdate = problemaRepository.findAll().size();

        // Update the problema
        Problema updatedProblema = problemaRepository.findById(problema.getId()).get();
        // Disconnect from session so that the updates on updatedProblema are not directly saved in db
        em.detach(updatedProblema);
        updatedProblema
            .descricao(UPDATED_DESCRICAO)
            .criticidade(UPDATED_CRITICIDADE)
            .aceitarFinalizacao(UPDATED_ACEITAR_FINALIZACAO)
            .foto(UPDATED_FOTO)
            .fotoContentType(UPDATED_FOTO_CONTENT_TYPE);

        restProblemaMockMvc.perform(put("/api/problemas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProblema)))
            .andExpect(status().isOk());

        // Validate the Problema in the database
        List<Problema> problemaList = problemaRepository.findAll();
        assertThat(problemaList).hasSize(databaseSizeBeforeUpdate);
        Problema testProblema = problemaList.get(problemaList.size() - 1);
        assertThat(testProblema.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testProblema.getCriticidade()).isEqualTo(UPDATED_CRITICIDADE);
        assertThat(testProblema.getAceitarFinalizacao()).isEqualTo(UPDATED_ACEITAR_FINALIZACAO);
        assertThat(testProblema.getFoto()).isEqualTo(UPDATED_FOTO);
        assertThat(testProblema.getFotoContentType()).isEqualTo(UPDATED_FOTO_CONTENT_TYPE);

        // Validate the Problema in Elasticsearch
        verify(mockProblemaSearchRepository, times(2)).save(testProblema);
    }

    @Test
    @Transactional
    public void updateNonExistingProblema() throws Exception {
        int databaseSizeBeforeUpdate = problemaRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProblemaMockMvc.perform(put("/api/problemas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(problema)))
            .andExpect(status().isBadRequest());

        // Validate the Problema in the database
        List<Problema> problemaList = problemaRepository.findAll();
        assertThat(problemaList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Problema in Elasticsearch
        verify(mockProblemaSearchRepository, times(0)).save(problema);
    }

    @Test
    @Transactional
    public void deleteProblema() throws Exception {
        // Initialize the database
        problemaService.save(problema);

        int databaseSizeBeforeDelete = problemaRepository.findAll().size();

        // Delete the problema
        restProblemaMockMvc.perform(delete("/api/problemas/{id}", problema.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Problema> problemaList = problemaRepository.findAll();
        assertThat(problemaList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Problema in Elasticsearch
        verify(mockProblemaSearchRepository, times(1)).deleteById(problema.getId());
    }

    @Test
    @Transactional
    public void searchProblema() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        problemaService.save(problema);
        when(mockProblemaSearchRepository.search(queryStringQuery("id:" + problema.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(problema), PageRequest.of(0, 1), 1));

        // Search the problema
        restProblemaMockMvc.perform(get("/api/_search/problemas?query=id:" + problema.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(problema.getId().intValue())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO.toString())))
            .andExpect(jsonPath("$.[*].criticidade").value(hasItem(DEFAULT_CRITICIDADE.toString())))
            .andExpect(jsonPath("$.[*].aceitarFinalizacao").value(hasItem(DEFAULT_ACEITAR_FINALIZACAO.toString())))
            .andExpect(jsonPath("$.[*].fotoContentType").value(hasItem(DEFAULT_FOTO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].foto").value(hasItem(Base64Utils.encodeToString(DEFAULT_FOTO))));
    }
}

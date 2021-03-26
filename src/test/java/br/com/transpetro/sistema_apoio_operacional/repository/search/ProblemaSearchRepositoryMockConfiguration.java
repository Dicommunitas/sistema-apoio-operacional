package br.com.transpetro.sistema_apoio_operacional.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link ProblemaSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class ProblemaSearchRepositoryMockConfiguration {

    @MockBean
    private ProblemaSearchRepository mockProblemaSearchRepository;

}
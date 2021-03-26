package br.com.transpetro.sistema_apoio_operacional.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link TipoRelatorioSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class TipoRelatorioSearchRepositoryMockConfiguration {

    @MockBean
    private TipoRelatorioSearchRepository mockTipoRelatorioSearchRepository;

}

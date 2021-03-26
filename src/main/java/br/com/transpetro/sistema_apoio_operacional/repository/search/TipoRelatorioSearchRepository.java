package br.com.transpetro.sistema_apoio_operacional.repository.search;

import br.com.transpetro.sistema_apoio_operacional.domain.TipoRelatorio;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link TipoRelatorio} entity.
 */
public interface TipoRelatorioSearchRepository extends ElasticsearchRepository<TipoRelatorio, Long> {
}

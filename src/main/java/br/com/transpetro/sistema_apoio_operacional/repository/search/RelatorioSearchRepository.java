package br.com.transpetro.sistema_apoio_operacional.repository.search;

import br.com.transpetro.sistema_apoio_operacional.domain.Relatorio;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link Relatorio} entity.
 */
public interface RelatorioSearchRepository extends ElasticsearchRepository<Relatorio, Long> {
}

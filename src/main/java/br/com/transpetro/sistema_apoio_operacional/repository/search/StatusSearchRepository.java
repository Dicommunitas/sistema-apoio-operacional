package br.com.transpetro.sistema_apoio_operacional.repository.search;

import br.com.transpetro.sistema_apoio_operacional.domain.Status;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link Status} entity.
 */
public interface StatusSearchRepository extends ElasticsearchRepository<Status, Long> {
}

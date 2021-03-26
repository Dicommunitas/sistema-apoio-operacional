package br.com.transpetro.sistema_apoio_operacional.repository.search;

import br.com.transpetro.sistema_apoio_operacional.domain.Problema;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link Problema} entity.
 */
public interface ProblemaSearchRepository extends ElasticsearchRepository<Problema, Long> {
}

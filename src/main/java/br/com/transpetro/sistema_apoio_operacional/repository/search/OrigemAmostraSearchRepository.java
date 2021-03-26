package br.com.transpetro.sistema_apoio_operacional.repository.search;

import br.com.transpetro.sistema_apoio_operacional.domain.OrigemAmostra;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link OrigemAmostra} entity.
 */
public interface OrigemAmostraSearchRepository extends ElasticsearchRepository<OrigemAmostra, Long> {
}

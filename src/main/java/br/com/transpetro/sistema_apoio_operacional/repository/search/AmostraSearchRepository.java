package br.com.transpetro.sistema_apoio_operacional.repository.search;

import br.com.transpetro.sistema_apoio_operacional.domain.Amostra;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link Amostra} entity.
 */
public interface AmostraSearchRepository extends ElasticsearchRepository<Amostra, Long> {
}

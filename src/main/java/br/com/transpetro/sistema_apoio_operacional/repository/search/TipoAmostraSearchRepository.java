package br.com.transpetro.sistema_apoio_operacional.repository.search;

import br.com.transpetro.sistema_apoio_operacional.domain.TipoAmostra;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link TipoAmostra} entity.
 */
public interface TipoAmostraSearchRepository extends ElasticsearchRepository<TipoAmostra, Long> {
}

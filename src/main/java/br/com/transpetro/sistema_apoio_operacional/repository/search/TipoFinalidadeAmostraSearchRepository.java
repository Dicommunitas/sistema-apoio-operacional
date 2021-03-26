package br.com.transpetro.sistema_apoio_operacional.repository.search;

import br.com.transpetro.sistema_apoio_operacional.domain.TipoFinalidadeAmostra;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link TipoFinalidadeAmostra} entity.
 */
public interface TipoFinalidadeAmostraSearchRepository extends ElasticsearchRepository<TipoFinalidadeAmostra, Long> {
}

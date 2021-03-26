package br.com.transpetro.sistema_apoio_operacional.repository.search;

import br.com.transpetro.sistema_apoio_operacional.domain.FinalidadeAmostra;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link FinalidadeAmostra} entity.
 */
public interface FinalidadeAmostraSearchRepository extends ElasticsearchRepository<FinalidadeAmostra, Long> {
}

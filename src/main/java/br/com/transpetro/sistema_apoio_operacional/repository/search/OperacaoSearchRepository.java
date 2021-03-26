package br.com.transpetro.sistema_apoio_operacional.repository.search;

import br.com.transpetro.sistema_apoio_operacional.domain.Operacao;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link Operacao} entity.
 */
public interface OperacaoSearchRepository extends ElasticsearchRepository<Operacao, Long> {
}

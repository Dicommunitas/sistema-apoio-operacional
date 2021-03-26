package br.com.transpetro.sistema_apoio_operacional.repository.search;

import br.com.transpetro.sistema_apoio_operacional.domain.User;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the User entity.
 */
public interface UserSearchRepository extends ElasticsearchRepository<User, Long> {}

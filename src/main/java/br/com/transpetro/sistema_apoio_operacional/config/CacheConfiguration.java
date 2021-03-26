package br.com.transpetro.sistema_apoio_operacional.config;

import io.github.jhipster.config.JHipsterProperties;
import io.github.jhipster.config.cache.PrefixedKeyGenerator;
import java.time.Duration;
import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;
import org.hibernate.cache.jcache.ConfigSettings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.boot.info.BuildProperties;
import org.springframework.boot.info.GitProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.client.serviceregistry.Registration;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {
    private GitProperties gitProperties;
    private BuildProperties buildProperties;
    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration =
            Eh107Configuration.fromEhcacheCacheConfiguration(
                CacheConfigurationBuilder
                    .newCacheConfigurationBuilder(Object.class, Object.class, ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                    .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                    .build()
            );
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, br.com.transpetro.sistema_apoio_operacional.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, br.com.transpetro.sistema_apoio_operacional.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, br.com.transpetro.sistema_apoio_operacional.domain.User.class.getName());
            createCache(cm, br.com.transpetro.sistema_apoio_operacional.domain.Authority.class.getName());
            createCache(cm, br.com.transpetro.sistema_apoio_operacional.domain.User.class.getName() + ".authorities");
            createCache(cm, br.com.transpetro.sistema_apoio_operacional.domain.Problema.class.getName());
            createCache(cm, br.com.transpetro.sistema_apoio_operacional.domain.Status.class.getName());
            createCache(cm, br.com.transpetro.sistema_apoio_operacional.domain.Relatorio.class.getName());
            createCache(cm, br.com.transpetro.sistema_apoio_operacional.domain.TipoRelatorio.class.getName());
            createCache(cm, br.com.transpetro.sistema_apoio_operacional.domain.Amostra.class.getName());
            createCache(cm, br.com.transpetro.sistema_apoio_operacional.domain.Operacao.class.getName());
            createCache(cm, br.com.transpetro.sistema_apoio_operacional.domain.OrigemAmostra.class.getName());
            createCache(cm, br.com.transpetro.sistema_apoio_operacional.domain.TipoAmostra.class.getName());
            createCache(cm, br.com.transpetro.sistema_apoio_operacional.domain.FinalidadeAmostra.class.getName());
            createCache(cm, br.com.transpetro.sistema_apoio_operacional.domain.TipoFinalidadeAmostra.class.getName());
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache == null) {
            cm.createCache(cacheName, jcacheConfiguration);
        }
    }

    @Autowired(required = false)
    public void setGitProperties(GitProperties gitProperties) {
        this.gitProperties = gitProperties;
    }

    @Autowired(required = false)
    public void setBuildProperties(BuildProperties buildProperties) {
        this.buildProperties = buildProperties;
    }

    @Bean
    public KeyGenerator keyGenerator() {
        return new PrefixedKeyGenerator(this.gitProperties, this.buildProperties);
    }
}

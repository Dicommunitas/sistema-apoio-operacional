package br.com.transpetro.sistema_apoio_operacional.domain;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import br.com.transpetro.sistema_apoio_operacional.domain.enumeration.SimNao;

/**
 * Entidade Status.\n@author Diego.
 */
@ApiModel(description = "Entidade Status.\n@author Diego.")
@Entity
@Table(name = "status")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "status")
public class Status implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * Atributo descrição.
     */
    
    @ApiModelProperty(value = "Atributo descrição.", required = true)
    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "descricao", nullable = false)
    private String descricao;

    /**
     * Atributo prazo deve ser do mesmo tipo de createdAt e updetedAt.
     */
    @NotNull
    @ApiModelProperty(value = "Atributo prazo deve ser do mesmo tipo de createdAt e updetedAt.", required = true)
    @Column(name = "prazo", nullable = false)
    private Instant prazo;

    @Enumerated(EnumType.STRING)
    @Column(name = "solicitar_finalizacao")
    private SimNao solicitarFinalizacao;

    @OneToMany(mappedBy = "status")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Problema> statuses = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public Status descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Instant getPrazo() {
        return prazo;
    }

    public Status prazo(Instant prazo) {
        this.prazo = prazo;
        return this;
    }

    public void setPrazo(Instant prazo) {
        this.prazo = prazo;
    }

    public SimNao getSolicitarFinalizacao() {
        return solicitarFinalizacao;
    }

    public Status solicitarFinalizacao(SimNao solicitarFinalizacao) {
        this.solicitarFinalizacao = solicitarFinalizacao;
        return this;
    }

    public void setSolicitarFinalizacao(SimNao solicitarFinalizacao) {
        this.solicitarFinalizacao = solicitarFinalizacao;
    }

    public Set<Problema> getStatuses() {
        return statuses;
    }

    public Status statuses(Set<Problema> problemas) {
        this.statuses = problemas;
        return this;
    }

    public Status addStatus(Problema problema) {
        this.statuses.add(problema);
        problema.setStatus(this);
        return this;
    }

    public Status removeStatus(Problema problema) {
        this.statuses.remove(problema);
        problema.setStatus(null);
        return this;
    }

    public void setStatuses(Set<Problema> problemas) {
        this.statuses = problemas;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Status)) {
            return false;
        }
        return id != null && id.equals(((Status) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Status{" +
            "id=" + getId() +
            ", descricao='" + getDescricao() + "'" +
            ", prazo='" + getPrazo() + "'" +
            ", solicitarFinalizacao='" + getSolicitarFinalizacao() + "'" +
            "}";
    }
}

package br.com.transpetro.sistema_apoio_operacional.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.time.ZonedDateTime;
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
    @NotNull
    @ApiModelProperty(value = "Atributo descrição.", required = true)
    @Column(name = "descricao", nullable = false)
    private String descricao;

    /**
     * Atributo prazo deve ser do mesmo tipo de createdAt e updetedAt.
     */
    @NotNull
    @ApiModelProperty(value = "Atributo prazo deve ser do mesmo tipo de createdAt e updetedAt.", required = true)
    @Column(name = "prazo", nullable = false)
    private ZonedDateTime prazo;

    @Enumerated(EnumType.STRING)
    @Column(name = "solicitar_finalizacao")
    private SimNao solicitarFinalizacao;

    @OneToMany(mappedBy = "status")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<User> responsavel1s = new HashSet<>();

    @OneToMany(mappedBy = "status")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<User> responsavel2s = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "problemas", allowSetters = true)
    private Problema problema;

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

    public ZonedDateTime getPrazo() {
        return prazo;
    }

    public Status prazo(ZonedDateTime prazo) {
        this.prazo = prazo;
        return this;
    }

    public void setPrazo(ZonedDateTime prazo) {
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

    public Set<User> getResponsavel1s() {
        return responsavel1s;
    }

    public Status responsavel1s(Set<User> users) {
        this.responsavel1s = users;
        return this;
    }

    public Status addResponsavel1(User user) {
        this.responsavel1s.add(user);
        user.setStatus(this);
        return this;
    }

    public Status removeResponsavel1(User user) {
        this.responsavel1s.remove(user);
        user.setStatus(null);
        return this;
    }

    public void setResponsavel1s(Set<User> users) {
        this.responsavel1s = users;
    }

    public Set<User> getResponsavel2s() {
        return responsavel2s;
    }

    public Status responsavel2s(Set<User> users) {
        this.responsavel2s = users;
        return this;
    }

    public Status addResponsavel2(User user) {
        this.responsavel2s.add(user);
        user.setStatus(this);
        return this;
    }

    public Status removeResponsavel2(User user) {
        this.responsavel2s.remove(user);
        user.setStatus(null);
        return this;
    }

    public void setResponsavel2s(Set<User> users) {
        this.responsavel2s = users;
    }

    public Problema getProblema() {
        return problema;
    }

    public Status problema(Problema problema) {
        this.problema = problema;
        return this;
    }

    public void setProblema(Problema problema) {
        this.problema = problema;
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

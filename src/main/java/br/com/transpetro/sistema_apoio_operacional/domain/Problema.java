package br.com.transpetro.sistema_apoio_operacional.domain;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import br.com.transpetro.sistema_apoio_operacional.domain.enumeration.Criticidade;

import br.com.transpetro.sistema_apoio_operacional.domain.enumeration.SimNao;

/**
 * Entidade Problema.\n@author Diego.
 */
@ApiModel(description = "Entidade Problema.\n@author Diego.")
@Entity
@Table(name = "problema")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "problema")
public class Problema implements Serializable {

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

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "criticidade", nullable = false)
    private Criticidade criticidade;

    @Enumerated(EnumType.STRING)
    @Column(name = "aceitar_finalizacao")
    private SimNao aceitarFinalizacao;

    
    @Lob
    @Column(name = "foto")
    private byte[] foto;

    @Column(name = "foto_content_type")
    private String fotoContentType;

    @OneToMany(mappedBy = "problema")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Status> problemas = new HashSet<>();

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

    public Problema descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Criticidade getCriticidade() {
        return criticidade;
    }

    public Problema criticidade(Criticidade criticidade) {
        this.criticidade = criticidade;
        return this;
    }

    public void setCriticidade(Criticidade criticidade) {
        this.criticidade = criticidade;
    }

    public SimNao getAceitarFinalizacao() {
        return aceitarFinalizacao;
    }

    public Problema aceitarFinalizacao(SimNao aceitarFinalizacao) {
        this.aceitarFinalizacao = aceitarFinalizacao;
        return this;
    }

    public void setAceitarFinalizacao(SimNao aceitarFinalizacao) {
        this.aceitarFinalizacao = aceitarFinalizacao;
    }

    public byte[] getFoto() {
        return foto;
    }

    public Problema foto(byte[] foto) {
        this.foto = foto;
        return this;
    }

    public void setFoto(byte[] foto) {
        this.foto = foto;
    }

    public String getFotoContentType() {
        return fotoContentType;
    }

    public Problema fotoContentType(String fotoContentType) {
        this.fotoContentType = fotoContentType;
        return this;
    }

    public void setFotoContentType(String fotoContentType) {
        this.fotoContentType = fotoContentType;
    }

    public Set<Status> getProblemas() {
        return problemas;
    }

    public Problema problemas(Set<Status> statuses) {
        this.problemas = statuses;
        return this;
    }

    public Problema addProblema(Status status) {
        this.problemas.add(status);
        status.setProblema(this);
        return this;
    }

    public Problema removeProblema(Status status) {
        this.problemas.remove(status);
        status.setProblema(null);
        return this;
    }

    public void setProblemas(Set<Status> statuses) {
        this.problemas = statuses;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Problema)) {
            return false;
        }
        return id != null && id.equals(((Problema) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Problema{" +
            "id=" + getId() +
            ", descricao='" + getDescricao() + "'" +
            ", criticidade='" + getCriticidade() + "'" +
            ", aceitarFinalizacao='" + getAceitarFinalizacao() + "'" +
            ", foto='" + getFoto() + "'" +
            ", fotoContentType='" + getFotoContentType() + "'" +
            "}";
    }
}

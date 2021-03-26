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

/**
 * Entidade TipoAmostra.\n@author Diego.
 */
@ApiModel(description = "Entidade TipoAmostra.\n@author Diego.")
@Entity
@Table(name = "tipo_amostra")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "tipoamostra")
public class TipoAmostra implements Serializable {

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

    @OneToMany(mappedBy = "tipoAmostra")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Amostra> amostras = new HashSet<>();

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

    public TipoAmostra descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Set<Amostra> getAmostras() {
        return amostras;
    }

    public TipoAmostra amostras(Set<Amostra> amostras) {
        this.amostras = amostras;
        return this;
    }

    public TipoAmostra addAmostra(Amostra amostra) {
        this.amostras.add(amostra);
        amostra.setTipoAmostra(this);
        return this;
    }

    public TipoAmostra removeAmostra(Amostra amostra) {
        this.amostras.remove(amostra);
        amostra.setTipoAmostra(null);
        return this;
    }

    public void setAmostras(Set<Amostra> amostras) {
        this.amostras = amostras;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TipoAmostra)) {
            return false;
        }
        return id != null && id.equals(((TipoAmostra) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TipoAmostra{" +
            "id=" + getId() +
            ", descricao='" + getDescricao() + "'" +
            "}";
    }
}

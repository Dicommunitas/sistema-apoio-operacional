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

/**
 * Entidade TipoFinalidadeAmostra.\n@author Diego.
 */
@ApiModel(description = "Entidade TipoFinalidadeAmostra.\n@author Diego.")
@Entity
@Table(name = "tipo_finalidade_amostra")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "tipofinalidadeamostra")
public class TipoFinalidadeAmostra implements Serializable {

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

    @ManyToOne
    @JsonIgnoreProperties(value = "tipoFinalidadeAmostras", allowSetters = true)
    private FinalidadeAmostra tipoFinalidadeAmostra;

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

    public TipoFinalidadeAmostra descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public FinalidadeAmostra getTipoFinalidadeAmostra() {
        return tipoFinalidadeAmostra;
    }

    public TipoFinalidadeAmostra tipoFinalidadeAmostra(FinalidadeAmostra finalidadeAmostra) {
        this.tipoFinalidadeAmostra = finalidadeAmostra;
        return this;
    }

    public void setTipoFinalidadeAmostra(FinalidadeAmostra finalidadeAmostra) {
        this.tipoFinalidadeAmostra = finalidadeAmostra;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TipoFinalidadeAmostra)) {
            return false;
        }
        return id != null && id.equals(((TipoFinalidadeAmostra) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TipoFinalidadeAmostra{" +
            "id=" + getId() +
            ", descricao='" + getDescricao() + "'" +
            "}";
    }
}

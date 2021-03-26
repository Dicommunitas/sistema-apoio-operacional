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
 * Entidade TipoRelatorio.\n@author Diego.
 */
@ApiModel(description = "Entidade TipoRelatorio.\n@author Diego.")
@Entity
@Table(name = "tipo_relatorio")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "tiporelatorio")
public class TipoRelatorio implements Serializable {

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
    @JsonIgnoreProperties(value = "tipoRelatorios", allowSetters = true)
    private Relatorio tipoRelatorio;

    @ManyToOne
    @JsonIgnoreProperties(value = "relatorios", allowSetters = true)
    private Relatorio relatorio;

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

    public TipoRelatorio descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Relatorio getTipoRelatorio() {
        return tipoRelatorio;
    }

    public TipoRelatorio tipoRelatorio(Relatorio relatorio) {
        this.tipoRelatorio = relatorio;
        return this;
    }

    public void setTipoRelatorio(Relatorio relatorio) {
        this.tipoRelatorio = relatorio;
    }

    public Relatorio getRelatorio() {
        return relatorio;
    }

    public TipoRelatorio relatorio(Relatorio relatorio) {
        this.relatorio = relatorio;
        return this;
    }

    public void setRelatorio(Relatorio relatorio) {
        this.relatorio = relatorio;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TipoRelatorio)) {
            return false;
        }
        return id != null && id.equals(((TipoRelatorio) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TipoRelatorio{" +
            "id=" + getId() +
            ", descricao='" + getDescricao() + "'" +
            "}";
    }
}

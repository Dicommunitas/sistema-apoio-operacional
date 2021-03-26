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
 * Entidade FinalidadeAmostra.\n@author Diego.
 */
@ApiModel(description = "Entidade FinalidadeAmostra.\n@author Diego.")
@Entity
@Table(name = "finalidade_amostra")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "finalidadeamostra")
public class FinalidadeAmostra implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * Atributo lacre.
     */
    @NotNull
    @ApiModelProperty(value = "Atributo lacre.", required = true)
    @Column(name = "lacre", nullable = false)
    private String lacre;

    @ManyToOne
    @JsonIgnoreProperties(value = "finalidadeAmostras", allowSetters = true)
    private Amostra amostra;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLacre() {
        return lacre;
    }

    public FinalidadeAmostra lacre(String lacre) {
        this.lacre = lacre;
        return this;
    }

    public void setLacre(String lacre) {
        this.lacre = lacre;
    }

    public Amostra getAmostra() {
        return amostra;
    }

    public FinalidadeAmostra amostra(Amostra amostra) {
        this.amostra = amostra;
        return this;
    }

    public void setAmostra(Amostra amostra) {
        this.amostra = amostra;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof FinalidadeAmostra)) {
            return false;
        }
        return id != null && id.equals(((FinalidadeAmostra) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "FinalidadeAmostra{" +
            "id=" + getId() +
            ", lacre='" + getLacre() + "'" +
            "}";
    }
}

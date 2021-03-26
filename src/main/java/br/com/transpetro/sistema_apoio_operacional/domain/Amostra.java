package br.com.transpetro.sistema_apoio_operacional.domain;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.time.Instant;

import br.com.transpetro.sistema_apoio_operacional.domain.enumeration.SimNao;

/**
 * Entidade Amostra.\n@author Diego.
 */
@ApiModel(description = "Entidade Amostra.\n@author Diego.")
@Entity
@Table(name = "amostra")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "amostra")
public class Amostra implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * Atributo dataHora.
     */
    @NotNull
    @ApiModelProperty(value = "Atributo dataHora.", required = true)
    @Column(name = "data_hora", nullable = false)
    private Instant dataHora;

    @Column(name = "observacao")
    private String observacao;

    @Column(name = "identificacao_outro_sistema")
    private String identificacaoOutroSistema;

    @Enumerated(EnumType.STRING)
    @Column(name = "amostra_no_laboratorio")
    private SimNao amostraNoLaboratorio;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDataHora() {
        return dataHora;
    }

    public Amostra dataHora(Instant dataHora) {
        this.dataHora = dataHora;
        return this;
    }

    public void setDataHora(Instant dataHora) {
        this.dataHora = dataHora;
    }

    public String getObservacao() {
        return observacao;
    }

    public Amostra observacao(String observacao) {
        this.observacao = observacao;
        return this;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

    public String getIdentificacaoOutroSistema() {
        return identificacaoOutroSistema;
    }

    public Amostra identificacaoOutroSistema(String identificacaoOutroSistema) {
        this.identificacaoOutroSistema = identificacaoOutroSistema;
        return this;
    }

    public void setIdentificacaoOutroSistema(String identificacaoOutroSistema) {
        this.identificacaoOutroSistema = identificacaoOutroSistema;
    }

    public SimNao getAmostraNoLaboratorio() {
        return amostraNoLaboratorio;
    }

    public Amostra amostraNoLaboratorio(SimNao amostraNoLaboratorio) {
        this.amostraNoLaboratorio = amostraNoLaboratorio;
        return this;
    }

    public void setAmostraNoLaboratorio(SimNao amostraNoLaboratorio) {
        this.amostraNoLaboratorio = amostraNoLaboratorio;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Amostra)) {
            return false;
        }
        return id != null && id.equals(((Amostra) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Amostra{" +
            "id=" + getId() +
            ", dataHora='" + getDataHora() + "'" +
            ", observacao='" + getObservacao() + "'" +
            ", identificacaoOutroSistema='" + getIdentificacaoOutroSistema() + "'" +
            ", amostraNoLaboratorio='" + getAmostraNoLaboratorio() + "'" +
            "}";
    }
}
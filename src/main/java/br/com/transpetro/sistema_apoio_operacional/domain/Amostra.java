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
import java.util.HashSet;
import java.util.Set;

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

    @OneToMany(mappedBy = "amostra")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Operacao> amostras = new HashSet<>();

    @OneToMany(mappedBy = "amostra")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<OrigemAmostra> amostras = new HashSet<>();

    @OneToMany(mappedBy = "amostra")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<TipoAmostra> amostras = new HashSet<>();

    @OneToMany(mappedBy = "amostra")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<FinalidadeAmostra> amostras = new HashSet<>();

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

    public Set<Operacao> getAmostras() {
        return amostras;
    }

    public Amostra amostras(Set<Operacao> operacaos) {
        this.amostras = operacaos;
        return this;
    }

    public Amostra addAmostras(Operacao operacao) {
        this.amostras.add(operacao);
        operacao.setAmostra(this);
        return this;
    }

    public Amostra removeAmostras(Operacao operacao) {
        this.amostras.remove(operacao);
        operacao.setAmostra(null);
        return this;
    }

    public void setAmostras(Set<Operacao> operacaos) {
        this.amostras = operacaos;
    }

    public Set<OrigemAmostra> getAmostras() {
        return amostras;
    }

    public Amostra amostras(Set<OrigemAmostra> origemAmostras) {
        this.amostras = origemAmostras;
        return this;
    }

    public Amostra addAmostras(OrigemAmostra origemAmostra) {
        this.amostras.add(origemAmostra);
        origemAmostra.setAmostra(this);
        return this;
    }

    public Amostra removeAmostras(OrigemAmostra origemAmostra) {
        this.amostras.remove(origemAmostra);
        origemAmostra.setAmostra(null);
        return this;
    }

    public void setAmostras(Set<OrigemAmostra> origemAmostras) {
        this.amostras = origemAmostras;
    }

    public Set<TipoAmostra> getAmostras() {
        return amostras;
    }

    public Amostra amostras(Set<TipoAmostra> tipoAmostras) {
        this.amostras = tipoAmostras;
        return this;
    }

    public Amostra addAmostras(TipoAmostra tipoAmostra) {
        this.amostras.add(tipoAmostra);
        tipoAmostra.setAmostra(this);
        return this;
    }

    public Amostra removeAmostras(TipoAmostra tipoAmostra) {
        this.amostras.remove(tipoAmostra);
        tipoAmostra.setAmostra(null);
        return this;
    }

    public void setAmostras(Set<TipoAmostra> tipoAmostras) {
        this.amostras = tipoAmostras;
    }

    public Set<FinalidadeAmostra> getAmostras() {
        return amostras;
    }

    public Amostra amostras(Set<FinalidadeAmostra> finalidadeAmostras) {
        this.amostras = finalidadeAmostras;
        return this;
    }

    public Amostra addAmostras(FinalidadeAmostra finalidadeAmostra) {
        this.amostras.add(finalidadeAmostra);
        finalidadeAmostra.setAmostra(this);
        return this;
    }

    public Amostra removeAmostras(FinalidadeAmostra finalidadeAmostra) {
        this.amostras.remove(finalidadeAmostra);
        finalidadeAmostra.setAmostra(null);
        return this;
    }

    public void setAmostras(Set<FinalidadeAmostra> finalidadeAmostras) {
        this.amostras = finalidadeAmostras;
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

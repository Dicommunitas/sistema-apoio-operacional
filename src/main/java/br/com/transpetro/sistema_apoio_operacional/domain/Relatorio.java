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

/**
 * Entidade Relatorio.\n@author Diego.\nNa tela de visualização de um relatório\ndeve ser mostrado uma lista das operações com fim em branco\nou início em até 12 horas antes da criação do relatório,\numa lista dos problemas com o campo aceitarFinalizacao em falso\ne uma lista das amostras criadas em até 12 horas antes da\ncriação do relatório.
 */
@ApiModel(description = "Entidade Relatorio.\n@author Diego.\nNa tela de visualização de um relatório\ndeve ser mostrado uma lista das operações com fim em branco\nou início em até 12 horas antes da criação do relatório,\numa lista dos problemas com o campo aceitarFinalizacao em falso\ne uma lista das amostras criadas em até 12 horas antes da\ncriação do relatório.")
@Entity
@Table(name = "relatorio")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "relatorio")
public class Relatorio implements Serializable {

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

    public Relatorio descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Relatorio)) {
            return false;
        }
        return id != null && id.equals(((Relatorio) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Relatorio{" +
            "id=" + getId() +
            ", descricao='" + getDescricao() + "'" +
            "}";
    }
}

package br.com.transpetro.sistema_apoio_operacional.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.com.transpetro.sistema_apoio_operacional.web.rest.TestUtil;

public class ProblemaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Problema.class);
        Problema problema1 = new Problema();
        problema1.setId(1L);
        Problema problema2 = new Problema();
        problema2.setId(problema1.getId());
        assertThat(problema1).isEqualTo(problema2);
        problema2.setId(2L);
        assertThat(problema1).isNotEqualTo(problema2);
        problema1.setId(null);
        assertThat(problema1).isNotEqualTo(problema2);
    }
}

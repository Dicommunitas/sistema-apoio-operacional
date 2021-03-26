package br.com.transpetro.sistema_apoio_operacional.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.com.transpetro.sistema_apoio_operacional.web.rest.TestUtil;

public class AmostraTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Amostra.class);
        Amostra amostra1 = new Amostra();
        amostra1.setId(1L);
        Amostra amostra2 = new Amostra();
        amostra2.setId(amostra1.getId());
        assertThat(amostra1).isEqualTo(amostra2);
        amostra2.setId(2L);
        assertThat(amostra1).isNotEqualTo(amostra2);
        amostra1.setId(null);
        assertThat(amostra1).isNotEqualTo(amostra2);
    }
}

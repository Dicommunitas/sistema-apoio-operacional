package br.com.transpetro.sistema_apoio_operacional.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.com.transpetro.sistema_apoio_operacional.web.rest.TestUtil;

public class FinalidadeAmostraTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FinalidadeAmostra.class);
        FinalidadeAmostra finalidadeAmostra1 = new FinalidadeAmostra();
        finalidadeAmostra1.setId(1L);
        FinalidadeAmostra finalidadeAmostra2 = new FinalidadeAmostra();
        finalidadeAmostra2.setId(finalidadeAmostra1.getId());
        assertThat(finalidadeAmostra1).isEqualTo(finalidadeAmostra2);
        finalidadeAmostra2.setId(2L);
        assertThat(finalidadeAmostra1).isNotEqualTo(finalidadeAmostra2);
        finalidadeAmostra1.setId(null);
        assertThat(finalidadeAmostra1).isNotEqualTo(finalidadeAmostra2);
    }
}

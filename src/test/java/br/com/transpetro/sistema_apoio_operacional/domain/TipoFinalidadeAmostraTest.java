package br.com.transpetro.sistema_apoio_operacional.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.com.transpetro.sistema_apoio_operacional.web.rest.TestUtil;

public class TipoFinalidadeAmostraTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoFinalidadeAmostra.class);
        TipoFinalidadeAmostra tipoFinalidadeAmostra1 = new TipoFinalidadeAmostra();
        tipoFinalidadeAmostra1.setId(1L);
        TipoFinalidadeAmostra tipoFinalidadeAmostra2 = new TipoFinalidadeAmostra();
        tipoFinalidadeAmostra2.setId(tipoFinalidadeAmostra1.getId());
        assertThat(tipoFinalidadeAmostra1).isEqualTo(tipoFinalidadeAmostra2);
        tipoFinalidadeAmostra2.setId(2L);
        assertThat(tipoFinalidadeAmostra1).isNotEqualTo(tipoFinalidadeAmostra2);
        tipoFinalidadeAmostra1.setId(null);
        assertThat(tipoFinalidadeAmostra1).isNotEqualTo(tipoFinalidadeAmostra2);
    }
}

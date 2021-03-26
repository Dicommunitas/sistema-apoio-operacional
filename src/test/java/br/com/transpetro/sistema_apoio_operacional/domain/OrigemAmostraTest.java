package br.com.transpetro.sistema_apoio_operacional.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.com.transpetro.sistema_apoio_operacional.web.rest.TestUtil;

public class OrigemAmostraTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrigemAmostra.class);
        OrigemAmostra origemAmostra1 = new OrigemAmostra();
        origemAmostra1.setId(1L);
        OrigemAmostra origemAmostra2 = new OrigemAmostra();
        origemAmostra2.setId(origemAmostra1.getId());
        assertThat(origemAmostra1).isEqualTo(origemAmostra2);
        origemAmostra2.setId(2L);
        assertThat(origemAmostra1).isNotEqualTo(origemAmostra2);
        origemAmostra1.setId(null);
        assertThat(origemAmostra1).isNotEqualTo(origemAmostra2);
    }
}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'problema',
        loadChildren: () => import('./problema/problema.module').then(m => m.SistemaApoioOperacionalProblemaModule),
      },
      {
        path: 'status',
        loadChildren: () => import('./status/status.module').then(m => m.SistemaApoioOperacionalStatusModule),
      },
      {
        path: 'relatorio',
        loadChildren: () => import('./relatorio/relatorio.module').then(m => m.SistemaApoioOperacionalRelatorioModule),
      },
      {
        path: 'tipo-relatorio',
        loadChildren: () => import('./tipo-relatorio/tipo-relatorio.module').then(m => m.SistemaApoioOperacionalTipoRelatorioModule),
      },
      {
        path: 'amostra',
        loadChildren: () => import('./amostra/amostra.module').then(m => m.SistemaApoioOperacionalAmostraModule),
      },
      {
        path: 'operacao',
        loadChildren: () => import('./operacao/operacao.module').then(m => m.SistemaApoioOperacionalOperacaoModule),
      },
      {
        path: 'origem-amostra',
        loadChildren: () => import('./origem-amostra/origem-amostra.module').then(m => m.SistemaApoioOperacionalOrigemAmostraModule),
      },
      {
        path: 'tipo-amostra',
        loadChildren: () => import('./tipo-amostra/tipo-amostra.module').then(m => m.SistemaApoioOperacionalTipoAmostraModule),
      },
      {
        path: 'finalidade-amostra',
        loadChildren: () =>
          import('./finalidade-amostra/finalidade-amostra.module').then(m => m.SistemaApoioOperacionalFinalidadeAmostraModule),
      },
      {
        path: 'tipo-finalidade-amostra',
        loadChildren: () =>
          import('./tipo-finalidade-amostra/tipo-finalidade-amostra.module').then(
            m => m.SistemaApoioOperacionalTipoFinalidadeAmostraModule
          ),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class SistemaApoioOperacionalEntityModule {}

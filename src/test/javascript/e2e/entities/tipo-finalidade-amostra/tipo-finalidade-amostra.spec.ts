import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  TipoFinalidadeAmostraComponentsPage,
  TipoFinalidadeAmostraDeleteDialog,
  TipoFinalidadeAmostraUpdatePage,
} from './tipo-finalidade-amostra.page-object';

const expect = chai.expect;

describe('TipoFinalidadeAmostra e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tipoFinalidadeAmostraComponentsPage: TipoFinalidadeAmostraComponentsPage;
  let tipoFinalidadeAmostraUpdatePage: TipoFinalidadeAmostraUpdatePage;
  let tipoFinalidadeAmostraDeleteDialog: TipoFinalidadeAmostraDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load TipoFinalidadeAmostras', async () => {
    await navBarPage.goToEntity('tipo-finalidade-amostra');
    tipoFinalidadeAmostraComponentsPage = new TipoFinalidadeAmostraComponentsPage();
    await browser.wait(ec.visibilityOf(tipoFinalidadeAmostraComponentsPage.title), 5000);
    expect(await tipoFinalidadeAmostraComponentsPage.getTitle()).to.eq('sistemaApoioOperacionalApp.tipoFinalidadeAmostra.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(tipoFinalidadeAmostraComponentsPage.entities), ec.visibilityOf(tipoFinalidadeAmostraComponentsPage.noResult)),
      1000
    );
  });

  it('should load create TipoFinalidadeAmostra page', async () => {
    await tipoFinalidadeAmostraComponentsPage.clickOnCreateButton();
    tipoFinalidadeAmostraUpdatePage = new TipoFinalidadeAmostraUpdatePage();
    expect(await tipoFinalidadeAmostraUpdatePage.getPageTitle()).to.eq(
      'sistemaApoioOperacionalApp.tipoFinalidadeAmostra.home.createOrEditLabel'
    );
    await tipoFinalidadeAmostraUpdatePage.cancel();
  });

  it('should create and save TipoFinalidadeAmostras', async () => {
    const nbButtonsBeforeCreate = await tipoFinalidadeAmostraComponentsPage.countDeleteButtons();

    await tipoFinalidadeAmostraComponentsPage.clickOnCreateButton();

    await promise.all([
      tipoFinalidadeAmostraUpdatePage.setDescricaoInput('descricao'),
      tipoFinalidadeAmostraUpdatePage.finalidadeAmostraSelectLastOption(),
    ]);

    expect(await tipoFinalidadeAmostraUpdatePage.getDescricaoInput()).to.eq(
      'descricao',
      'Expected Descricao value to be equals to descricao'
    );

    await tipoFinalidadeAmostraUpdatePage.save();
    expect(await tipoFinalidadeAmostraUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await tipoFinalidadeAmostraComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last TipoFinalidadeAmostra', async () => {
    const nbButtonsBeforeDelete = await tipoFinalidadeAmostraComponentsPage.countDeleteButtons();
    await tipoFinalidadeAmostraComponentsPage.clickOnLastDeleteButton();

    tipoFinalidadeAmostraDeleteDialog = new TipoFinalidadeAmostraDeleteDialog();
    expect(await tipoFinalidadeAmostraDeleteDialog.getDialogTitle()).to.eq(
      'sistemaApoioOperacionalApp.tipoFinalidadeAmostra.delete.question'
    );
    await tipoFinalidadeAmostraDeleteDialog.clickOnConfirmButton();

    expect(await tipoFinalidadeAmostraComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

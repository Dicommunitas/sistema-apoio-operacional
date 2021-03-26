import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TipoAmostraComponentsPage, TipoAmostraDeleteDialog, TipoAmostraUpdatePage } from './tipo-amostra.page-object';

const expect = chai.expect;

describe('TipoAmostra e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tipoAmostraComponentsPage: TipoAmostraComponentsPage;
  let tipoAmostraUpdatePage: TipoAmostraUpdatePage;
  let tipoAmostraDeleteDialog: TipoAmostraDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load TipoAmostras', async () => {
    await navBarPage.goToEntity('tipo-amostra');
    tipoAmostraComponentsPage = new TipoAmostraComponentsPage();
    await browser.wait(ec.visibilityOf(tipoAmostraComponentsPage.title), 5000);
    expect(await tipoAmostraComponentsPage.getTitle()).to.eq('sistemaApoioOperacionalApp.tipoAmostra.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(tipoAmostraComponentsPage.entities), ec.visibilityOf(tipoAmostraComponentsPage.noResult)),
      1000
    );
  });

  it('should load create TipoAmostra page', async () => {
    await tipoAmostraComponentsPage.clickOnCreateButton();
    tipoAmostraUpdatePage = new TipoAmostraUpdatePage();
    expect(await tipoAmostraUpdatePage.getPageTitle()).to.eq('sistemaApoioOperacionalApp.tipoAmostra.home.createOrEditLabel');
    await tipoAmostraUpdatePage.cancel();
  });

  it('should create and save TipoAmostras', async () => {
    const nbButtonsBeforeCreate = await tipoAmostraComponentsPage.countDeleteButtons();

    await tipoAmostraComponentsPage.clickOnCreateButton();

    await promise.all([tipoAmostraUpdatePage.setDescricaoInput('descricao'), tipoAmostraUpdatePage.tipoAmostraSelectLastOption()]);

    expect(await tipoAmostraUpdatePage.getDescricaoInput()).to.eq('descricao', 'Expected Descricao value to be equals to descricao');

    await tipoAmostraUpdatePage.save();
    expect(await tipoAmostraUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await tipoAmostraComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last TipoAmostra', async () => {
    const nbButtonsBeforeDelete = await tipoAmostraComponentsPage.countDeleteButtons();
    await tipoAmostraComponentsPage.clickOnLastDeleteButton();

    tipoAmostraDeleteDialog = new TipoAmostraDeleteDialog();
    expect(await tipoAmostraDeleteDialog.getDialogTitle()).to.eq('sistemaApoioOperacionalApp.tipoAmostra.delete.question');
    await tipoAmostraDeleteDialog.clickOnConfirmButton();

    expect(await tipoAmostraComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

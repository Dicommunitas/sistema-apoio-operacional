import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TipoRelatorioComponentsPage, TipoRelatorioDeleteDialog, TipoRelatorioUpdatePage } from './tipo-relatorio.page-object';

const expect = chai.expect;

describe('TipoRelatorio e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tipoRelatorioComponentsPage: TipoRelatorioComponentsPage;
  let tipoRelatorioUpdatePage: TipoRelatorioUpdatePage;
  let tipoRelatorioDeleteDialog: TipoRelatorioDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load TipoRelatorios', async () => {
    await navBarPage.goToEntity('tipo-relatorio');
    tipoRelatorioComponentsPage = new TipoRelatorioComponentsPage();
    await browser.wait(ec.visibilityOf(tipoRelatorioComponentsPage.title), 5000);
    expect(await tipoRelatorioComponentsPage.getTitle()).to.eq('sistemaApoioOperacionalApp.tipoRelatorio.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(tipoRelatorioComponentsPage.entities), ec.visibilityOf(tipoRelatorioComponentsPage.noResult)),
      1000
    );
  });

  it('should load create TipoRelatorio page', async () => {
    await tipoRelatorioComponentsPage.clickOnCreateButton();
    tipoRelatorioUpdatePage = new TipoRelatorioUpdatePage();
    expect(await tipoRelatorioUpdatePage.getPageTitle()).to.eq('sistemaApoioOperacionalApp.tipoRelatorio.home.createOrEditLabel');
    await tipoRelatorioUpdatePage.cancel();
  });

  it('should create and save TipoRelatorios', async () => {
    const nbButtonsBeforeCreate = await tipoRelatorioComponentsPage.countDeleteButtons();

    await tipoRelatorioComponentsPage.clickOnCreateButton();

    await promise.all([tipoRelatorioUpdatePage.setDescricaoInput('descricao'), tipoRelatorioUpdatePage.tipoRelatorioSelectLastOption()]);

    expect(await tipoRelatorioUpdatePage.getDescricaoInput()).to.eq('descricao', 'Expected Descricao value to be equals to descricao');

    await tipoRelatorioUpdatePage.save();
    expect(await tipoRelatorioUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await tipoRelatorioComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last TipoRelatorio', async () => {
    const nbButtonsBeforeDelete = await tipoRelatorioComponentsPage.countDeleteButtons();
    await tipoRelatorioComponentsPage.clickOnLastDeleteButton();

    tipoRelatorioDeleteDialog = new TipoRelatorioDeleteDialog();
    expect(await tipoRelatorioDeleteDialog.getDialogTitle()).to.eq('sistemaApoioOperacionalApp.tipoRelatorio.delete.question');
    await tipoRelatorioDeleteDialog.clickOnConfirmButton();

    expect(await tipoRelatorioComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

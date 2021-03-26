import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RelatorioComponentsPage, RelatorioDeleteDialog, RelatorioUpdatePage } from './relatorio.page-object';

const expect = chai.expect;

describe('Relatorio e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let relatorioComponentsPage: RelatorioComponentsPage;
  let relatorioUpdatePage: RelatorioUpdatePage;
  let relatorioDeleteDialog: RelatorioDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Relatorios', async () => {
    await navBarPage.goToEntity('relatorio');
    relatorioComponentsPage = new RelatorioComponentsPage();
    await browser.wait(ec.visibilityOf(relatorioComponentsPage.title), 5000);
    expect(await relatorioComponentsPage.getTitle()).to.eq('sistemaApoioOperacionalApp.relatorio.home.title');
    await browser.wait(ec.or(ec.visibilityOf(relatorioComponentsPage.entities), ec.visibilityOf(relatorioComponentsPage.noResult)), 1000);
  });

  it('should load create Relatorio page', async () => {
    await relatorioComponentsPage.clickOnCreateButton();
    relatorioUpdatePage = new RelatorioUpdatePage();
    expect(await relatorioUpdatePage.getPageTitle()).to.eq('sistemaApoioOperacionalApp.relatorio.home.createOrEditLabel');
    await relatorioUpdatePage.cancel();
  });

  it('should create and save Relatorios', async () => {
    const nbButtonsBeforeCreate = await relatorioComponentsPage.countDeleteButtons();

    await relatorioComponentsPage.clickOnCreateButton();

    await promise.all([relatorioUpdatePage.setDescricaoInput('descricao'), relatorioUpdatePage.tipoRelatorioSelectLastOption()]);

    expect(await relatorioUpdatePage.getDescricaoInput()).to.eq('descricao', 'Expected Descricao value to be equals to descricao');

    await relatorioUpdatePage.save();
    expect(await relatorioUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await relatorioComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Relatorio', async () => {
    const nbButtonsBeforeDelete = await relatorioComponentsPage.countDeleteButtons();
    await relatorioComponentsPage.clickOnLastDeleteButton();

    relatorioDeleteDialog = new RelatorioDeleteDialog();
    expect(await relatorioDeleteDialog.getDialogTitle()).to.eq('sistemaApoioOperacionalApp.relatorio.delete.question');
    await relatorioDeleteDialog.clickOnConfirmButton();

    expect(await relatorioComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

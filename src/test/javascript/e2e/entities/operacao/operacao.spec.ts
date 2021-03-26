import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { OperacaoComponentsPage, OperacaoDeleteDialog, OperacaoUpdatePage } from './operacao.page-object';

const expect = chai.expect;

describe('Operacao e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let operacaoComponentsPage: OperacaoComponentsPage;
  let operacaoUpdatePage: OperacaoUpdatePage;
  let operacaoDeleteDialog: OperacaoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Operacaos', async () => {
    await navBarPage.goToEntity('operacao');
    operacaoComponentsPage = new OperacaoComponentsPage();
    await browser.wait(ec.visibilityOf(operacaoComponentsPage.title), 5000);
    expect(await operacaoComponentsPage.getTitle()).to.eq('sistemaApoioOperacionalApp.operacao.home.title');
    await browser.wait(ec.or(ec.visibilityOf(operacaoComponentsPage.entities), ec.visibilityOf(operacaoComponentsPage.noResult)), 1000);
  });

  it('should load create Operacao page', async () => {
    await operacaoComponentsPage.clickOnCreateButton();
    operacaoUpdatePage = new OperacaoUpdatePage();
    expect(await operacaoUpdatePage.getPageTitle()).to.eq('sistemaApoioOperacionalApp.operacao.home.createOrEditLabel');
    await operacaoUpdatePage.cancel();
  });

  it('should create and save Operacaos', async () => {
    const nbButtonsBeforeCreate = await operacaoComponentsPage.countDeleteButtons();

    await operacaoComponentsPage.clickOnCreateButton();

    await promise.all([
      operacaoUpdatePage.setDescricaoInput('descricao'),
      operacaoUpdatePage.setInicioInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      operacaoUpdatePage.setFimInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      operacaoUpdatePage.setQuantidadeAmostrasInput('5'),
      operacaoUpdatePage.setObservacaoInput('observacao'),
    ]);

    expect(await operacaoUpdatePage.getDescricaoInput()).to.eq('descricao', 'Expected Descricao value to be equals to descricao');
    expect(await operacaoUpdatePage.getInicioInput()).to.contain('2001-01-01T02:30', 'Expected inicio value to be equals to 2000-12-31');
    expect(await operacaoUpdatePage.getFimInput()).to.contain('2001-01-01T02:30', 'Expected fim value to be equals to 2000-12-31');
    expect(await operacaoUpdatePage.getQuantidadeAmostrasInput()).to.eq('5', 'Expected quantidadeAmostras value to be equals to 5');
    expect(await operacaoUpdatePage.getObservacaoInput()).to.eq('observacao', 'Expected Observacao value to be equals to observacao');

    await operacaoUpdatePage.save();
    expect(await operacaoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await operacaoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Operacao', async () => {
    const nbButtonsBeforeDelete = await operacaoComponentsPage.countDeleteButtons();
    await operacaoComponentsPage.clickOnLastDeleteButton();

    operacaoDeleteDialog = new OperacaoDeleteDialog();
    expect(await operacaoDeleteDialog.getDialogTitle()).to.eq('sistemaApoioOperacionalApp.operacao.delete.question');
    await operacaoDeleteDialog.clickOnConfirmButton();

    expect(await operacaoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AmostraComponentsPage, AmostraDeleteDialog, AmostraUpdatePage } from './amostra.page-object';

const expect = chai.expect;

describe('Amostra e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let amostraComponentsPage: AmostraComponentsPage;
  let amostraUpdatePage: AmostraUpdatePage;
  let amostraDeleteDialog: AmostraDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Amostras', async () => {
    await navBarPage.goToEntity('amostra');
    amostraComponentsPage = new AmostraComponentsPage();
    await browser.wait(ec.visibilityOf(amostraComponentsPage.title), 5000);
    expect(await amostraComponentsPage.getTitle()).to.eq('sistemaApoioOperacionalApp.amostra.home.title');
    await browser.wait(ec.or(ec.visibilityOf(amostraComponentsPage.entities), ec.visibilityOf(amostraComponentsPage.noResult)), 1000);
  });

  it('should load create Amostra page', async () => {
    await amostraComponentsPage.clickOnCreateButton();
    amostraUpdatePage = new AmostraUpdatePage();
    expect(await amostraUpdatePage.getPageTitle()).to.eq('sistemaApoioOperacionalApp.amostra.home.createOrEditLabel');
    await amostraUpdatePage.cancel();
  });

  it('should create and save Amostras', async () => {
    const nbButtonsBeforeCreate = await amostraComponentsPage.countDeleteButtons();

    await amostraComponentsPage.clickOnCreateButton();

    await promise.all([
      amostraUpdatePage.setDataHoraInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      amostraUpdatePage.setObservacaoInput('observacao'),
      amostraUpdatePage.setIdentificacaoOutroSistemaInput('identificacaoOutroSistema'),
      amostraUpdatePage.amostraNoLaboratorioSelectLastOption(),
    ]);

    expect(await amostraUpdatePage.getDataHoraInput()).to.contain('2001-01-01T02:30', 'Expected dataHora value to be equals to 2000-12-31');
    expect(await amostraUpdatePage.getObservacaoInput()).to.eq('observacao', 'Expected Observacao value to be equals to observacao');
    expect(await amostraUpdatePage.getIdentificacaoOutroSistemaInput()).to.eq(
      'identificacaoOutroSistema',
      'Expected IdentificacaoOutroSistema value to be equals to identificacaoOutroSistema'
    );

    await amostraUpdatePage.save();
    expect(await amostraUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await amostraComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Amostra', async () => {
    const nbButtonsBeforeDelete = await amostraComponentsPage.countDeleteButtons();
    await amostraComponentsPage.clickOnLastDeleteButton();

    amostraDeleteDialog = new AmostraDeleteDialog();
    expect(await amostraDeleteDialog.getDialogTitle()).to.eq('sistemaApoioOperacionalApp.amostra.delete.question');
    await amostraDeleteDialog.clickOnConfirmButton();

    expect(await amostraComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

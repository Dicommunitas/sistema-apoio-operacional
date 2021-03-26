import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProblemaComponentsPage, ProblemaDeleteDialog, ProblemaUpdatePage } from './problema.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Problema e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let problemaComponentsPage: ProblemaComponentsPage;
  let problemaUpdatePage: ProblemaUpdatePage;
  let problemaDeleteDialog: ProblemaDeleteDialog;
  const fileNameToUpload = 'logo-jhipster.png';
  const fileToUpload = '../../../../../../src/main/webapp/content/images/' + fileNameToUpload;
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Problemas', async () => {
    await navBarPage.goToEntity('problema');
    problemaComponentsPage = new ProblemaComponentsPage();
    await browser.wait(ec.visibilityOf(problemaComponentsPage.title), 5000);
    expect(await problemaComponentsPage.getTitle()).to.eq('sistemaApoioOperacionalApp.problema.home.title');
    await browser.wait(ec.or(ec.visibilityOf(problemaComponentsPage.entities), ec.visibilityOf(problemaComponentsPage.noResult)), 1000);
  });

  it('should load create Problema page', async () => {
    await problemaComponentsPage.clickOnCreateButton();
    problemaUpdatePage = new ProblemaUpdatePage();
    expect(await problemaUpdatePage.getPageTitle()).to.eq('sistemaApoioOperacionalApp.problema.home.createOrEditLabel');
    await problemaUpdatePage.cancel();
  });

  it('should create and save Problemas', async () => {
    const nbButtonsBeforeCreate = await problemaComponentsPage.countDeleteButtons();

    await problemaComponentsPage.clickOnCreateButton();

    await promise.all([
      problemaUpdatePage.setDescricaoInput('descricao'),
      problemaUpdatePage.criticidadeSelectLastOption(),
      problemaUpdatePage.aceitarFinalizacaoSelectLastOption(),
      problemaUpdatePage.setFotoInput(absolutePath),
      problemaUpdatePage.statusSelectLastOption(),
    ]);

    expect(await problemaUpdatePage.getDescricaoInput()).to.eq('descricao', 'Expected Descricao value to be equals to descricao');
    expect(await problemaUpdatePage.getFotoInput()).to.endsWith(fileNameToUpload, 'Expected Foto value to be end with ' + fileNameToUpload);

    await problemaUpdatePage.save();
    expect(await problemaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await problemaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Problema', async () => {
    const nbButtonsBeforeDelete = await problemaComponentsPage.countDeleteButtons();
    await problemaComponentsPage.clickOnLastDeleteButton();

    problemaDeleteDialog = new ProblemaDeleteDialog();
    expect(await problemaDeleteDialog.getDialogTitle()).to.eq('sistemaApoioOperacionalApp.problema.delete.question');
    await problemaDeleteDialog.clickOnConfirmButton();

    expect(await problemaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

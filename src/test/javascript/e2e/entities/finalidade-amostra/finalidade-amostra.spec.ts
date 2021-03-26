import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  FinalidadeAmostraComponentsPage,
  FinalidadeAmostraDeleteDialog,
  FinalidadeAmostraUpdatePage,
} from './finalidade-amostra.page-object';

const expect = chai.expect;

describe('FinalidadeAmostra e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let finalidadeAmostraComponentsPage: FinalidadeAmostraComponentsPage;
  let finalidadeAmostraUpdatePage: FinalidadeAmostraUpdatePage;
  let finalidadeAmostraDeleteDialog: FinalidadeAmostraDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load FinalidadeAmostras', async () => {
    await navBarPage.goToEntity('finalidade-amostra');
    finalidadeAmostraComponentsPage = new FinalidadeAmostraComponentsPage();
    await browser.wait(ec.visibilityOf(finalidadeAmostraComponentsPage.title), 5000);
    expect(await finalidadeAmostraComponentsPage.getTitle()).to.eq('sistemaApoioOperacionalApp.finalidadeAmostra.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(finalidadeAmostraComponentsPage.entities), ec.visibilityOf(finalidadeAmostraComponentsPage.noResult)),
      1000
    );
  });

  it('should load create FinalidadeAmostra page', async () => {
    await finalidadeAmostraComponentsPage.clickOnCreateButton();
    finalidadeAmostraUpdatePage = new FinalidadeAmostraUpdatePage();
    expect(await finalidadeAmostraUpdatePage.getPageTitle()).to.eq('sistemaApoioOperacionalApp.finalidadeAmostra.home.createOrEditLabel');
    await finalidadeAmostraUpdatePage.cancel();
  });

  it('should create and save FinalidadeAmostras', async () => {
    const nbButtonsBeforeCreate = await finalidadeAmostraComponentsPage.countDeleteButtons();

    await finalidadeAmostraComponentsPage.clickOnCreateButton();

    await promise.all([finalidadeAmostraUpdatePage.setLacreInput('lacre')]);

    expect(await finalidadeAmostraUpdatePage.getLacreInput()).to.eq('lacre', 'Expected Lacre value to be equals to lacre');

    await finalidadeAmostraUpdatePage.save();
    expect(await finalidadeAmostraUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await finalidadeAmostraComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last FinalidadeAmostra', async () => {
    const nbButtonsBeforeDelete = await finalidadeAmostraComponentsPage.countDeleteButtons();
    await finalidadeAmostraComponentsPage.clickOnLastDeleteButton();

    finalidadeAmostraDeleteDialog = new FinalidadeAmostraDeleteDialog();
    expect(await finalidadeAmostraDeleteDialog.getDialogTitle()).to.eq('sistemaApoioOperacionalApp.finalidadeAmostra.delete.question');
    await finalidadeAmostraDeleteDialog.clickOnConfirmButton();

    expect(await finalidadeAmostraComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

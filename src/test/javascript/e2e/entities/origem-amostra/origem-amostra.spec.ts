import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { OrigemAmostraComponentsPage, OrigemAmostraDeleteDialog, OrigemAmostraUpdatePage } from './origem-amostra.page-object';

const expect = chai.expect;

describe('OrigemAmostra e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let origemAmostraComponentsPage: OrigemAmostraComponentsPage;
  let origemAmostraUpdatePage: OrigemAmostraUpdatePage;
  let origemAmostraDeleteDialog: OrigemAmostraDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load OrigemAmostras', async () => {
    await navBarPage.goToEntity('origem-amostra');
    origemAmostraComponentsPage = new OrigemAmostraComponentsPage();
    await browser.wait(ec.visibilityOf(origemAmostraComponentsPage.title), 5000);
    expect(await origemAmostraComponentsPage.getTitle()).to.eq('sistemaApoioOperacionalApp.origemAmostra.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(origemAmostraComponentsPage.entities), ec.visibilityOf(origemAmostraComponentsPage.noResult)),
      1000
    );
  });

  it('should load create OrigemAmostra page', async () => {
    await origemAmostraComponentsPage.clickOnCreateButton();
    origemAmostraUpdatePage = new OrigemAmostraUpdatePage();
    expect(await origemAmostraUpdatePage.getPageTitle()).to.eq('sistemaApoioOperacionalApp.origemAmostra.home.createOrEditLabel');
    await origemAmostraUpdatePage.cancel();
  });

  it('should create and save OrigemAmostras', async () => {
    const nbButtonsBeforeCreate = await origemAmostraComponentsPage.countDeleteButtons();

    await origemAmostraComponentsPage.clickOnCreateButton();

    await promise.all([origemAmostraUpdatePage.setDescricaoInput('descricao')]);

    expect(await origemAmostraUpdatePage.getDescricaoInput()).to.eq('descricao', 'Expected Descricao value to be equals to descricao');

    await origemAmostraUpdatePage.save();
    expect(await origemAmostraUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await origemAmostraComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last OrigemAmostra', async () => {
    const nbButtonsBeforeDelete = await origemAmostraComponentsPage.countDeleteButtons();
    await origemAmostraComponentsPage.clickOnLastDeleteButton();

    origemAmostraDeleteDialog = new OrigemAmostraDeleteDialog();
    expect(await origemAmostraDeleteDialog.getDialogTitle()).to.eq('sistemaApoioOperacionalApp.origemAmostra.delete.question');
    await origemAmostraDeleteDialog.clickOnConfirmButton();

    expect(await origemAmostraComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

import { element, by, ElementFinder } from 'protractor';

export class TipoAmostraComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-tipo-amostra div table .btn-danger'));
  title = element.all(by.css('jhi-tipo-amostra div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class TipoAmostraUpdatePage {
  pageTitle = element(by.id('jhi-tipo-amostra-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  descricaoInput = element(by.id('field_descricao'));

  tipoAmostraSelect = element(by.id('field_tipoAmostra'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDescricaoInput(descricao: string): Promise<void> {
    await this.descricaoInput.sendKeys(descricao);
  }

  async getDescricaoInput(): Promise<string> {
    return await this.descricaoInput.getAttribute('value');
  }

  async tipoAmostraSelectLastOption(): Promise<void> {
    await this.tipoAmostraSelect.all(by.tagName('option')).last().click();
  }

  async tipoAmostraSelectOption(option: string): Promise<void> {
    await this.tipoAmostraSelect.sendKeys(option);
  }

  getTipoAmostraSelect(): ElementFinder {
    return this.tipoAmostraSelect;
  }

  async getTipoAmostraSelectedOption(): Promise<string> {
    return await this.tipoAmostraSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class TipoAmostraDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-tipoAmostra-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-tipoAmostra'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}

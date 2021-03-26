import { element, by, ElementFinder } from 'protractor';

export class FinalidadeAmostraComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-finalidade-amostra div table .btn-danger'));
  title = element.all(by.css('jhi-finalidade-amostra div h2#page-heading span')).first();
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

export class FinalidadeAmostraUpdatePage {
  pageTitle = element(by.id('jhi-finalidade-amostra-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  lacreInput = element(by.id('field_lacre'));

  finalidadeAmostraSelect = element(by.id('field_finalidadeAmostra'));
  amostraSelect = element(by.id('field_amostra'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setLacreInput(lacre: string): Promise<void> {
    await this.lacreInput.sendKeys(lacre);
  }

  async getLacreInput(): Promise<string> {
    return await this.lacreInput.getAttribute('value');
  }

  async finalidadeAmostraSelectLastOption(): Promise<void> {
    await this.finalidadeAmostraSelect.all(by.tagName('option')).last().click();
  }

  async finalidadeAmostraSelectOption(option: string): Promise<void> {
    await this.finalidadeAmostraSelect.sendKeys(option);
  }

  getFinalidadeAmostraSelect(): ElementFinder {
    return this.finalidadeAmostraSelect;
  }

  async getFinalidadeAmostraSelectedOption(): Promise<string> {
    return await this.finalidadeAmostraSelect.element(by.css('option:checked')).getText();
  }

  async amostraSelectLastOption(): Promise<void> {
    await this.amostraSelect.all(by.tagName('option')).last().click();
  }

  async amostraSelectOption(option: string): Promise<void> {
    await this.amostraSelect.sendKeys(option);
  }

  getAmostraSelect(): ElementFinder {
    return this.amostraSelect;
  }

  async getAmostraSelectedOption(): Promise<string> {
    return await this.amostraSelect.element(by.css('option:checked')).getText();
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

export class FinalidadeAmostraDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-finalidadeAmostra-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-finalidadeAmostra'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}

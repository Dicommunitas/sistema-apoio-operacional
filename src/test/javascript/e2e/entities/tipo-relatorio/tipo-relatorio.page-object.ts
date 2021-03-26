import { element, by, ElementFinder } from 'protractor';

export class TipoRelatorioComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-tipo-relatorio div table .btn-danger'));
  title = element.all(by.css('jhi-tipo-relatorio div h2#page-heading span')).first();
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

export class TipoRelatorioUpdatePage {
  pageTitle = element(by.id('jhi-tipo-relatorio-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  descricaoInput = element(by.id('field_descricao'));

  relatoriosSelect = element(by.id('field_relatorios'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDescricaoInput(descricao: string): Promise<void> {
    await this.descricaoInput.sendKeys(descricao);
  }

  async getDescricaoInput(): Promise<string> {
    return await this.descricaoInput.getAttribute('value');
  }

  async relatoriosSelectLastOption(): Promise<void> {
    await this.relatoriosSelect.all(by.tagName('option')).last().click();
  }

  async relatoriosSelectOption(option: string): Promise<void> {
    await this.relatoriosSelect.sendKeys(option);
  }

  getRelatoriosSelect(): ElementFinder {
    return this.relatoriosSelect;
  }

  async getRelatoriosSelectedOption(): Promise<string> {
    return await this.relatoriosSelect.element(by.css('option:checked')).getText();
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

export class TipoRelatorioDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-tipoRelatorio-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-tipoRelatorio'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}

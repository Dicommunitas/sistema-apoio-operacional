import { element, by, ElementFinder } from 'protractor';

export class RelatorioComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-relatorio div table .btn-danger'));
  title = element.all(by.css('jhi-relatorio div h2#page-heading span')).first();
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

export class RelatorioUpdatePage {
  pageTitle = element(by.id('jhi-relatorio-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  descricaoInput = element(by.id('field_descricao'));

  tipoRelatorioSelect = element(by.id('field_tipoRelatorio'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDescricaoInput(descricao: string): Promise<void> {
    await this.descricaoInput.sendKeys(descricao);
  }

  async getDescricaoInput(): Promise<string> {
    return await this.descricaoInput.getAttribute('value');
  }

  async tipoRelatorioSelectLastOption(): Promise<void> {
    await this.tipoRelatorioSelect.all(by.tagName('option')).last().click();
  }

  async tipoRelatorioSelectOption(option: string): Promise<void> {
    await this.tipoRelatorioSelect.sendKeys(option);
  }

  getTipoRelatorioSelect(): ElementFinder {
    return this.tipoRelatorioSelect;
  }

  async getTipoRelatorioSelectedOption(): Promise<string> {
    return await this.tipoRelatorioSelect.element(by.css('option:checked')).getText();
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

export class RelatorioDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-relatorio-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-relatorio'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}

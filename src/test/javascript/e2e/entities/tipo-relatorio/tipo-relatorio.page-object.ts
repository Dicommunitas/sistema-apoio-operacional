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

  tipoRelatorioSelect = element(by.id('field_tipoRelatorio'));
  relatorioSelect = element(by.id('field_relatorio'));

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

  async relatorioSelectLastOption(): Promise<void> {
    await this.relatorioSelect.all(by.tagName('option')).last().click();
  }

  async relatorioSelectOption(option: string): Promise<void> {
    await this.relatorioSelect.sendKeys(option);
  }

  getRelatorioSelect(): ElementFinder {
    return this.relatorioSelect;
  }

  async getRelatorioSelectedOption(): Promise<string> {
    return await this.relatorioSelect.element(by.css('option:checked')).getText();
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

import { element, by, ElementFinder } from 'protractor';

export class OperacaoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-operacao div table .btn-danger'));
  title = element.all(by.css('jhi-operacao div h2#page-heading span')).first();
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

export class OperacaoUpdatePage {
  pageTitle = element(by.id('jhi-operacao-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  descricaoInput = element(by.id('field_descricao'));
  inicioInput = element(by.id('field_inicio'));
  fimInput = element(by.id('field_fim'));
  quantidadeAmostrasInput = element(by.id('field_quantidadeAmostras'));
  observacaoInput = element(by.id('field_observacao'));

  amostraSelect = element(by.id('field_amostra'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDescricaoInput(descricao: string): Promise<void> {
    await this.descricaoInput.sendKeys(descricao);
  }

  async getDescricaoInput(): Promise<string> {
    return await this.descricaoInput.getAttribute('value');
  }

  async setInicioInput(inicio: string): Promise<void> {
    await this.inicioInput.sendKeys(inicio);
  }

  async getInicioInput(): Promise<string> {
    return await this.inicioInput.getAttribute('value');
  }

  async setFimInput(fim: string): Promise<void> {
    await this.fimInput.sendKeys(fim);
  }

  async getFimInput(): Promise<string> {
    return await this.fimInput.getAttribute('value');
  }

  async setQuantidadeAmostrasInput(quantidadeAmostras: string): Promise<void> {
    await this.quantidadeAmostrasInput.sendKeys(quantidadeAmostras);
  }

  async getQuantidadeAmostrasInput(): Promise<string> {
    return await this.quantidadeAmostrasInput.getAttribute('value');
  }

  async setObservacaoInput(observacao: string): Promise<void> {
    await this.observacaoInput.sendKeys(observacao);
  }

  async getObservacaoInput(): Promise<string> {
    return await this.observacaoInput.getAttribute('value');
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

export class OperacaoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-operacao-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-operacao'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}

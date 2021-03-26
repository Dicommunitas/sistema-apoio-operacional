import { element, by, ElementFinder } from 'protractor';

export class AmostraComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-amostra div table .btn-danger'));
  title = element.all(by.css('jhi-amostra div h2#page-heading span')).first();
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

export class AmostraUpdatePage {
  pageTitle = element(by.id('jhi-amostra-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  dataHoraInput = element(by.id('field_dataHora'));
  observacaoInput = element(by.id('field_observacao'));
  identificacaoOutroSistemaInput = element(by.id('field_identificacaoOutroSistema'));
  amostraNoLaboratorioSelect = element(by.id('field_amostraNoLaboratorio'));

  operacaoSelect = element(by.id('field_operacao'));
  origemAmostraSelect = element(by.id('field_origemAmostra'));
  tipoAmostraSelect = element(by.id('field_tipoAmostra'));
  finalidadeAmostraSelect = element(by.id('field_finalidadeAmostra'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDataHoraInput(dataHora: string): Promise<void> {
    await this.dataHoraInput.sendKeys(dataHora);
  }

  async getDataHoraInput(): Promise<string> {
    return await this.dataHoraInput.getAttribute('value');
  }

  async setObservacaoInput(observacao: string): Promise<void> {
    await this.observacaoInput.sendKeys(observacao);
  }

  async getObservacaoInput(): Promise<string> {
    return await this.observacaoInput.getAttribute('value');
  }

  async setIdentificacaoOutroSistemaInput(identificacaoOutroSistema: string): Promise<void> {
    await this.identificacaoOutroSistemaInput.sendKeys(identificacaoOutroSistema);
  }

  async getIdentificacaoOutroSistemaInput(): Promise<string> {
    return await this.identificacaoOutroSistemaInput.getAttribute('value');
  }

  async setAmostraNoLaboratorioSelect(amostraNoLaboratorio: string): Promise<void> {
    await this.amostraNoLaboratorioSelect.sendKeys(amostraNoLaboratorio);
  }

  async getAmostraNoLaboratorioSelect(): Promise<string> {
    return await this.amostraNoLaboratorioSelect.element(by.css('option:checked')).getText();
  }

  async amostraNoLaboratorioSelectLastOption(): Promise<void> {
    await this.amostraNoLaboratorioSelect.all(by.tagName('option')).last().click();
  }

  async operacaoSelectLastOption(): Promise<void> {
    await this.operacaoSelect.all(by.tagName('option')).last().click();
  }

  async operacaoSelectOption(option: string): Promise<void> {
    await this.operacaoSelect.sendKeys(option);
  }

  getOperacaoSelect(): ElementFinder {
    return this.operacaoSelect;
  }

  async getOperacaoSelectedOption(): Promise<string> {
    return await this.operacaoSelect.element(by.css('option:checked')).getText();
  }

  async origemAmostraSelectLastOption(): Promise<void> {
    await this.origemAmostraSelect.all(by.tagName('option')).last().click();
  }

  async origemAmostraSelectOption(option: string): Promise<void> {
    await this.origemAmostraSelect.sendKeys(option);
  }

  getOrigemAmostraSelect(): ElementFinder {
    return this.origemAmostraSelect;
  }

  async getOrigemAmostraSelectedOption(): Promise<string> {
    return await this.origemAmostraSelect.element(by.css('option:checked')).getText();
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

export class AmostraDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-amostra-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-amostra'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}

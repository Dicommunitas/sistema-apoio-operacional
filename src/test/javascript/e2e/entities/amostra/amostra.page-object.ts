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

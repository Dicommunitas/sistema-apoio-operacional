import { element, by, ElementFinder } from 'protractor';

export class StatusComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-status div table .btn-danger'));
  title = element.all(by.css('jhi-status div h2#page-heading span')).first();
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

export class StatusUpdatePage {
  pageTitle = element(by.id('jhi-status-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  descricaoInput = element(by.id('field_descricao'));
  prazoInput = element(by.id('field_prazo'));
  solicitarFinalizacaoSelect = element(by.id('field_solicitarFinalizacao'));

  problemaSelect = element(by.id('field_problema'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDescricaoInput(descricao: string): Promise<void> {
    await this.descricaoInput.sendKeys(descricao);
  }

  async getDescricaoInput(): Promise<string> {
    return await this.descricaoInput.getAttribute('value');
  }

  async setPrazoInput(prazo: string): Promise<void> {
    await this.prazoInput.sendKeys(prazo);
  }

  async getPrazoInput(): Promise<string> {
    return await this.prazoInput.getAttribute('value');
  }

  async setSolicitarFinalizacaoSelect(solicitarFinalizacao: string): Promise<void> {
    await this.solicitarFinalizacaoSelect.sendKeys(solicitarFinalizacao);
  }

  async getSolicitarFinalizacaoSelect(): Promise<string> {
    return await this.solicitarFinalizacaoSelect.element(by.css('option:checked')).getText();
  }

  async solicitarFinalizacaoSelectLastOption(): Promise<void> {
    await this.solicitarFinalizacaoSelect.all(by.tagName('option')).last().click();
  }

  async problemaSelectLastOption(): Promise<void> {
    await this.problemaSelect.all(by.tagName('option')).last().click();
  }

  async problemaSelectOption(option: string): Promise<void> {
    await this.problemaSelect.sendKeys(option);
  }

  getProblemaSelect(): ElementFinder {
    return this.problemaSelect;
  }

  async getProblemaSelectedOption(): Promise<string> {
    return await this.problemaSelect.element(by.css('option:checked')).getText();
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

export class StatusDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-status-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-status'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}

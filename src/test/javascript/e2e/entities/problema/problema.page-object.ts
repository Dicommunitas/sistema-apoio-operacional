import { element, by, ElementFinder } from 'protractor';

export class ProblemaComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-problema div table .btn-danger'));
  title = element.all(by.css('jhi-problema div h2#page-heading span')).first();
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

export class ProblemaUpdatePage {
  pageTitle = element(by.id('jhi-problema-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  descricaoInput = element(by.id('field_descricao'));
  criticidadeSelect = element(by.id('field_criticidade'));
  aceitarFinalizacaoSelect = element(by.id('field_aceitarFinalizacao'));
  fotoInput = element(by.id('file_foto'));

  statusSelect = element(by.id('field_status'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDescricaoInput(descricao: string): Promise<void> {
    await this.descricaoInput.sendKeys(descricao);
  }

  async getDescricaoInput(): Promise<string> {
    return await this.descricaoInput.getAttribute('value');
  }

  async setCriticidadeSelect(criticidade: string): Promise<void> {
    await this.criticidadeSelect.sendKeys(criticidade);
  }

  async getCriticidadeSelect(): Promise<string> {
    return await this.criticidadeSelect.element(by.css('option:checked')).getText();
  }

  async criticidadeSelectLastOption(): Promise<void> {
    await this.criticidadeSelect.all(by.tagName('option')).last().click();
  }

  async setAceitarFinalizacaoSelect(aceitarFinalizacao: string): Promise<void> {
    await this.aceitarFinalizacaoSelect.sendKeys(aceitarFinalizacao);
  }

  async getAceitarFinalizacaoSelect(): Promise<string> {
    return await this.aceitarFinalizacaoSelect.element(by.css('option:checked')).getText();
  }

  async aceitarFinalizacaoSelectLastOption(): Promise<void> {
    await this.aceitarFinalizacaoSelect.all(by.tagName('option')).last().click();
  }

  async setFotoInput(foto: string): Promise<void> {
    await this.fotoInput.sendKeys(foto);
  }

  async getFotoInput(): Promise<string> {
    return await this.fotoInput.getAttribute('value');
  }

  async statusSelectLastOption(): Promise<void> {
    await this.statusSelect.all(by.tagName('option')).last().click();
  }

  async statusSelectOption(option: string): Promise<void> {
    await this.statusSelect.sendKeys(option);
  }

  getStatusSelect(): ElementFinder {
    return this.statusSelect;
  }

  async getStatusSelectedOption(): Promise<string> {
    return await this.statusSelect.element(by.css('option:checked')).getText();
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

export class ProblemaDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-problema-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-problema'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}

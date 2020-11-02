export enum FormModeEnum {
  create = 'create',
  update = 'update',
  view = 'view',
}

export interface FormTitleInterface {
  formMode: FormModeEnum
  label: string
}

export enum childrenTypeEnum {
  before = 'before',
  after = 'after'
}
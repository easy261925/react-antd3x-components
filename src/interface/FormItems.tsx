import { FormItemLayoutInterface, LayoutInterface } from './Layout'
import { ReactNode } from 'react';

export interface FormItemsInterface {
  hideInForm?: boolean
  hideInSearch?: boolean
  formItemLayout?: FormItemLayoutInterface
  colLayout?: LayoutInterface
  style?: Object
  valuePropName?: string
  label?: string | ReactNode
  field: string
  initialValue?: any
  rules?: Array<any>
  content?: any
  props?: any
  type?: 'date'
}
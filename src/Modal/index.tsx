import React, { ReactNode } from 'react';
import { FormComponentProps } from 'antd/es/form';
import { FormModeEnum } from '../interface';
import BaseModal from '../BaseModal';
import CCForm from '../Form';

enum childrenTypeEnum {
  before = 'before',
  after = 'after',
}

interface TitleObject {
  formMode: FormModeEnum;
  label: string;
}

interface CCModalProps {
  title: string | TitleObject;
  visible?: boolean;
  formitems?: Array<any>;
  width?: number;
  onCancel: (e?: React.MouseEvent<HTMLElement>) => void;
  onSubmit: (...args: any[]) => void;
  record?: any;
  maskClosable?: true;
  form: FormComponentProps['form'];
  disabled?: boolean;
  footer?: ReactNode;
  childrenType?: childrenTypeEnum;
  loading?: boolean | undefined;
}

const CCModal: React.FC<CCModalProps> = props => {
  const {
    title = { formMode: 'create', label: '抽屉' },
    visible,
    formitems,
    width = 800,
    onCancel = () => console.log('onCancle'),
    onSubmit = () => console.log('onSubmit'),
    children,
    record,
    maskClosable = true,
    form,
    disabled = false,
    footer = null,
    childrenType = 'before',
    loading = false,
    ...ext
  } = props;

  const { validateFields } = form;

  const onOk = () => {
    // if (onSubmit) {
    //   onSubmit();
    //   return
    // }
    validateFields &&
      validateFields((err, values: any) => {
        if (!err) {
          onSubmit(values);
        }
      });
  };

  const renderTitle = () => {
    if (typeof title === 'string') {
      return title;
    }
    const { formMode, label } = title;
    if (formMode === 'create') {
      return `新建${label}`;
    }
    if (formMode === 'update') {
      return `修改${label}`;
    }
    if (formMode === 'view') {
      return `查看${label}`;
    }
    return '';
  };

  return (
    <BaseModal
      title={renderTitle()}
      width={width}
      visible={visible}
      destroyOnClose
      maskClosable={maskClosable}
      closable
      onCancel={onCancel}
      onOk={onOk}
      loading={loading}
      {...ext}
    >
      {childrenType === 'before' && children}
      {formitems && (
        <CCForm formitems={formitems} disabled={disabled} record={record} form={form} />
      )}
      {childrenType === 'after' && children}
      {footer}
    </BaseModal>
  );
};

export default CCModal;

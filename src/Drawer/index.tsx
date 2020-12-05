import React, { Fragment, ReactNode } from 'react';
import { Drawer, Button, Row } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { FormTitleInterface, FormItemsInterface, childrenTypeEnum } from '../interface'
import './index.less';
import CCForm from '../Form';
declare type getContainerFunc = () => HTMLElement;
declare const PlacementTypes: ["top", "right", "bottom", "left"];
declare type placementType = typeof PlacementTypes[number];
declare type EventType = React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement | HTMLButtonElement>;

export interface DrawerProps {
  closable?: boolean;
  destroyOnClose?: boolean;
  getContainer?: string | HTMLElement | getContainerFunc | false;
  maskClosable?: boolean;
  mask?: boolean;
  maskStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  /** wrapper dom node style of header and body */
  drawerStyle?: React.CSSProperties;
  headerStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  title?: React.ReactNode;
  visible?: boolean;
  width?: number | string;
  height?: number | string;
  wrapClassName?: string;
  zIndex?: number;
  prefixCls?: string;
  push?: boolean;
  placement?: placementType;
  onClose?: (e: EventType) => void;
  afterVisibleChange?: (visible: boolean) => void;
  className?: string;
  handler?: React.ReactNode;
  keyboard?: boolean;
}
interface CCDrawerProps {
  title?: string | FormTitleInterface | any
  visible?: boolean
  formitems?: Array<FormItemsInterface | null | undefined>
  width?: number
  onClose?: () => void
  onSubmit?: (values: any) => void
  record?: any
  maskClosable?: boolean
  form: FormComponentProps['form']
  disabled?: boolean
  footer?: ReactNode
  childrenType?: childrenTypeEnum
  formmode: 'view' | 'create' | 'update'
}

const CCDrawer: React.FC<CCDrawerProps> = props => {
  const {
    title = { formMode: 'view', label: '抽屉' },
    visible,
    formitems,
    width = 800,
    onClose = () => console.log('onCancle'),
    onSubmit = () => console.log('onSubmit'),
    children,
    record,
    maskClosable = true,
    form,
    disabled = false,
    footer = null,
    childrenType = 'before',
    formmode = 'view',
    ...ext
  } = props;

  const { validateFields } = form;

  const onOk = () => {
    // if (onSubmit) {
    //   onSubmit();
    //   return
    // }
    validateFields &&
      validateFields((err, values) => {
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
  };

  const btnWrapStyle = {
    'position': 'fixed',
    'right': 0,
    'bottom': 0,
    'zIndex': 100,
    'display': 'flex',
    'justifyContent': 'flex - end',
    'padding': '10px 14px 10px 0',
    'background': '#fff',
    'borderTop': '1px solid #e8e8e8',
    'boxShadow': '0 -1px 2px rgba(0, 0, 0, 0.03)'
  }

  return (
    <Drawer
      title={renderTitle()}
      width={width}
      visible={visible}
      destroyOnClose
      maskClosable={maskClosable}
      closable
      onClose={onClose}
      bodyStyle={{ paddingBottom: 53 }}
      {...ext}
    >
      {childrenType === 'before' && children}
      {formitems && (
        <CCForm formitems={formitems} disabled={disabled} record={record} form={form} />
      )}
      {childrenType === 'after' && children}
      <div style={{ width }} className='btnWrap'>
        {footer || (
          <Fragment>
            {formmode === 'view' ? <Button onClick={onClose}>关闭</Button>
              : <Row>
                <Button onClick={onClose}>取消</Button>
                <Button type="primary" className='margin' onClick={onOk}>
                  确定
                  </Button>
              </Row>
            }
          </Fragment>
        )}
      </div>
    </Drawer>
  );
};

export default CCDrawer;

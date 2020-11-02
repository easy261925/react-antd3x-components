import React, { ReactNode } from 'react';
import { Modal } from 'antd';

interface CustomModalProps {
  visible?: boolean;
  footer?: ReactNode;
  onCancel?: (e: React.MouseEvent<HTMLElement>) => void;
  title: string | ReactNode;
  onOk?: (...args: any[]) => any;
  width?: number;
  destroyOnClose?: boolean;
  maskClosable?: boolean;
  closable?: boolean;
  loading?: boolean | undefined;
}

const CustomModal: React.FC<CustomModalProps> = ({ children, ...props }) => {
  return (
    <Modal destroyOnClose closable {...props}>
      {children}
    </Modal>
  );
};

export default CustomModal;

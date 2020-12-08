import React from 'react';
import { Form, Col } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { FormItemsInterface, FormItemLayoutInterface, LayoutInterface } from '../interface'
import formStyles from '../index.less';
import moment from 'moment';
import get from 'lodash/get'
import '../index.less'

interface CommonFormProps {
  record?: any
  visible?: boolean
  disabled?: boolean
  form: FormComponentProps['form']
  colLayout?: LayoutInterface
  formItemLayout?: FormItemLayoutInterface
  formitems?: Array<FormItemsInterface | null | undefined>
}

const Index: React.FC<CommonFormProps> = props => {
  const {
    formitems,
    record,
    formItemLayout = {
      labelCol: {
        span: 24,
      },
      wrapperCol: {
        span: 24,
      },
    },
    colLayout = {
      span: 24,
    },
    form,
    disabled = false,
    visible = true,
  } = props;

  const { getFieldDecorator } = form;

  const getFields = () => {
    if (formitems && formitems.length) {
      const newFormItems = formitems
        .filter(i => i && !i.hideInForm)
        .map((item, i) => {
          console.log('item', item)
          const newFormItemLayout = {
            ...formItemLayout,
            ...item?.formItemLayout,
          };
          const newColLayout = {
            ...colLayout,
            ...item?.colLayout,
          };
          const newStyle = {
            marginBottom: 10,
            ...item?.style,
          };
          if (item?.valuePropName) {
            return (
              <Col key={i} {...newColLayout}>
                <Form.Item
                  label={item?.label}
                  {...newFormItemLayout}
                  className={formStyles.customzeFormItem}
                  style={newStyle}
                >
                  {getFieldDecorator(item.field, {
                    initialValue: record ? get(record, item.field) === 1 : item.initialValue === 1,
                    valuePropName: item.valuePropName,
                    rules: item.rules && item.rules.length ? item.rules : [],
                  })(
                    React.cloneElement(item.content, {
                      disabled,
                      ...item.props,
                      ...item.content.props,
                    }),
                  )}
                </Form.Item>
              </Col>
            );
          }
          if (item?.type === 'date') {
            let initialValue = null
            if (record && get(record, item.field)) {
              initialValue = moment(get(record, item.field))
            } else if (item.initialValue) {
              initialValue = moment(item.initialValue)
            }
            return (
              <Col key={i} {...newColLayout}>
                <Form.Item
                  label={item.label}
                  {...newFormItemLayout}
                  className={formStyles.customzeFormItem}
                  style={newStyle}
                >
                  {getFieldDecorator(item.field, {
                    initialValue,
                    rules: item.rules && item.rules.length ? item.rules : [],
                  })(
                    React.cloneElement(item.content, {
                      disabled,
                      ...item.props,
                      ...item.content.props,
                    }),
                  )}
                </Form.Item>
              </Col>
            )
          }

          return (
            <Col key={i} {...newColLayout}>
              <Form.Item
                label={item?.label}
                {...newFormItemLayout}
                className={formStyles.customzeFormItem}
                style={newStyle}
              >
                {item && getFieldDecorator(item.field, {
                  initialValue: record
                    ? get(record, item.field)
                      ? get(record, item.field)
                      : item.initialValue
                    : item.initialValue,
                  rules: item.rules && item.rules.length ? item.rules : [],
                })(
                  React.cloneElement(item.content, {
                    disabled,
                    ...item.props,
                    ...item.content.props,
                  }),
                )}
              </Form.Item>
            </Col>
          );
        });
      return newFormItems;
    }
    return null;
  };
  return (
    <div style={{ display: visible ? 'flex' : 'none' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>{getFields()}</div>
    </div>
  );
};

export default Index;

import React, { useState, Fragment, ReactNode } from 'react';
import { Row, Col, Button, Form, Icon } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import moment from 'moment'
import { FormItemsInterface, LayoutInterface } from '../interface'
import styles from './index.less';
import formStyles from '../index.less';

interface SearchBarProps {
  form: FormComponentProps['form']
  handleButtons?: ReactNode | null | undefined
  thread?: number
  colLayout?: LayoutInterface
  formItemLayout?: Object
  formitems?: Array<FormItemsInterface | null | undefined>
  onReset?: () => void
  onSearch?: (values: any) => void
  searchLayout?: number
  btnLayout?: number
  loading?: boolean
}

const SearchBar: React.FC<SearchBarProps> = props => {
  const [expand, setExpand] = useState(false);
  const {
    form: { getFieldDecorator, validateFields, resetFields },
    handleButtons = null,
    thread = 3,
    colLayout = {
      xs: 8,
      sm: 8,
      md: 8,
      lg: 8,
      xl: 8,
      xxl: 8,
    },
    formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 24 },
        xl: { span: 10 },
        xxl: { span: 10 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 24 },
        xl: { span: 14 },
        xxl: { span: 14 },
      },
    },
    loading
  } = props;

  const {
    formitems = [],
    onReset = () => {
      console.log('props onReset');
    },
    onSearch = (values: any) => {
      console.log('props onSearch', values);
    },
    searchLayout,
    btnLayout
  } = props;

  const toggle = () => {
    setExpand(!expand);
  };

  const handleSearch = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    validateFields((err, values) => {
      onSearch(values);
    });
  };

  const handleReset = () => {
    resetFields();
    onReset();
  };

  const getFields = () => {
    const showFormItems =
      (formitems && formitems.length) ? formitems.filter(i => i && !i.hideInSearch) : [];
    const count = expand ? showFormItems.length : thread;
    if (showFormItems && showFormItems.length) {
      const newFormItems = showFormItems.map((item, i) => {
        const newFormItemLayout = item?.formItemLayout || formItemLayout
        const newColLayout = item?.colLayout || colLayout
        if (item?.valuePropName) {
          return (
            <Col {...newColLayout} key={i} style={{ display: i < count ? 'block' : 'none' }}>
              <Form.Item
                label={item.label}
                {...newFormItemLayout}
                className={formStyles.customzeFormItem}
                style={item.style}
              >
                {getFieldDecorator(item.field, {
                  valuePropName: item.valuePropName
                })(
                  React.cloneElement(item.content, {
                    ...item.props,
                    ...item.content.props,
                  }),
                )}
              </Form.Item>
            </Col>
          )
        }
        return (
          <Col {...newColLayout} key={i} style={{ display: i < count ? 'block' : 'none' }}>
            <Form.Item
              label={item?.label}
              {...newFormItemLayout}
              className={formStyles.customzeFormItem}
              style={item?.style}
            >
              {item && getFieldDecorator(item.field)(
                React.cloneElement(item?.content, {
                  ...item?.props,
                  ...item?.content.props,
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
    <Row type="flex" align="middle" style={{ marginBottom: '10px' }} gutter={12}>
      <Row gutter={24} style={{ width: '100%' }}>
        <Col span={searchLayout || 16}>{getFields()}</Col>
        <Col span={btnLayout || 8}>
          <Row type="flex" justify="end" align="middle" style={{ width: '100%' }}>
            <Col>
              {formitems.length !== 0 && (
                <Fragment>
                  <Button type="primary" onClick={handleSearch} loading={loading}>
                    查询
              </Button>
                  <Button style={{ marginLeft: 10 }} onClick={handleReset}>
                    重置
              </Button>
                  {formitems.filter(i => i && !i.hideInSearch).length > thread && (
                    <a style={{ marginLeft: 8, fontSize: 12 }} onClick={toggle}>
                      展开 <Icon type={expand ? 'up' : 'down'} />
                    </a>
                  )}
                </Fragment>
              )}
            </Col>
            {handleButtons &&
              <Col style={{ marginLeft: 10 }}>
                {handleButtons}
              </Col>}
          </Row>
        </Col>
      </Row>
    </Row>
  );
};

const WrapperForm = Form.create<SearchBarProps>()(SearchBar);

export default WrapperForm;

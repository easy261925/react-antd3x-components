## CCSearchBar

CCSearchBar:

```tsx
import React, { useState } from 'react';
import { CCSearchBar } from 'react-antd3x-components';
import { Button, Input, Form, Switch, DatePicker, Select } from 'antd';

const Index = ({ form }: Props) => {
  const onSearch = (values: any) => {
    console.log('onSubmit', values);
  };

  const onReset = () => {
    console.log('onReset');
  };

  const onCreate = () => {
    console.log('onCreate');
  };

  const formitems = [
    {
      label: '用户名',
      field: 'username',
      content: <Input placeholder="请输入用户名" />,
    },
    {
      label: '年龄',
      field: 'age',
      content: <Input placeholder="请输入年龄" />,
      // formItemLayout: {
      //   labelCol: { span: 6 },
      //   wrapperCol: { span: 18 }
      // },
      // colLayout: { span: 12 },
    },
    {
      label: '角色',
      field: 'role',
      content: (
        <Select style={{ width: '100%' }} placeholder="选择角色">
          <Select.Option value={1} key={1}>
            角色1
          </Select.Option>
          <Select.Option value={2} key={2}>
            角色2
          </Select.Option>
        </Select>
      ),
    },
    {
      label: '切换',
      field: 'status',
      valuePropName: 'checked',
      content: <Switch />,
      initialValue: 1,
    },
    {
      label: '时间',
      field: 'date',
      content: <DatePicker placeholder="时间" style={{ width: '100%' }} />,
      type: 'date',
    },
  ];

  return (
    <CCSearchBar
      onSearch={onSearch}
      onReset={onReset}
      formitems={formitems}
      handleButtons={
        <Button type="primary" onClick={onCreate}>
          新建
        </Button>
      }
    />
  );
};

export default Form.create()(Index);
```

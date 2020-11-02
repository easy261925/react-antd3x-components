## CCDrawer

CCDrawer:

```tsx
import React, { useState } from 'react';
import { CCDrawer } from 'react-antd3x-components';
import { Button, Input, Form, Switch, DatePicker } from 'antd';

const Index = ({ form }: any) => {
  const [visible, setVisible] = useState(false);
  const onSubmit = (values: any) => {
    console.log('onSubmit', values);
    setVisible(false);
  };

  const data = { username: '123', status: 0, abc: { username: 'abc' } };

  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)}>
        新建
      </Button>
      <CCDrawer
        title={{ formMode: 'create', label: '123' }}
        visible={visible}
        form={form}
        onSubmit={onSubmit}
        formmode="create"
        formitems={[
          {
            label: '用户名',
            field: 'abc.username',
            content: <Input placeholder="请输入用户名" />,
            rules: [
              {
                required: true,
                message: '请输入用户名',
              },
            ],
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
            content: (
              <DatePicker placeholder="时间" style={{ width: '100%' }} />
            ),
            rules: [
              {
                required: true,
                message: '请输入时间',
              },
            ],
            type: 'date',
          },
          {
            label: '详情',
            field: 'detail',
            content: (
              <Input.TextArea
                autoSize={{ minRows: 4, maxRows: 10 }}
                placeholder="请输入详情"
              />
            ),
            rules: [
              {
                required: true,
                validator(rule: any, value: string, callback: Function) {
                  if (!value) {
                    callback('请输入详情');
                  }
                  if (value && value.length > 100) {
                    callback('内容长度不能超过100个字');
                  }
                  callback();
                },
              },
            ],
          },
        ]}
        onClose={() => setVisible(false)}
        record={data}
      />
    </div>
  );
};

export default Form.create()(Index);
```

## CCTable

CCTable:

```tsx
import React from 'react';
import { CCTable } from 'react-antd3x-components';

const Index = () => {
  const onChange = () => {
    console.log('onChange');
  };

  return (
    <CCTable
      rowKey="key"
      option={{
        filter: {
          cacheKey: 'abc',
        },
      }}
      onChange={onChange}
      dataSource={[
        {
          key: '1',
          name: '胡彦斌',
          age: 32,
          address: '西湖区湖底公园1号',
        },
        {
          key: '2',
          name: '胡彦祖',
          age: 42,
          address: '西湖区湖底公园1号',
        },
      ]}
      columns={[
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '年龄',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: '住址',
          dataIndex: 'address',
          key: 'address',
        },
      ]}
    />
  );
};

export default Index;
```
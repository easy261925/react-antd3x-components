import React, { Fragment, useState, useEffect } from 'react';
import { Table, Icon, Row, Popover, Checkbox, Button, Tooltip } from 'antd';
import { PageInterface, TableSize } from '../interface'
import "../index.less";
import { setItem, getItem } from '../utils/index'
interface TableOptions {
  filter?: {
    cacheKey: string
  }
}
interface Props {
  size?: TableSize
  dataSource?: Array<any>
  columns: Array<any>
  onChange: () => void
  rowKey?: any,
  columnsFilter?: boolean
  cacheKey?: string
  option?: TableOptions
}

const CustomTable: React.FC<Props> = React.forwardRef((props, ref: any) => {
  const {
    size = 'middle',
    dataSource = [],
    columns = [],
    onChange = () => console.log('Table onChange'),
    rowKey,
    option
  } = props;

  const [stateColumns, setStateColumns] = useState(columns)
  const [filterChecked, setFilterChecked] = useState<any[]>([])
  const [indeterminate, setIndeterminate] = useState(false)
  const [filterVisible, setFilterVisible] = useState(false)
  const [allChecked, setAllChecked] = useState(true)
  const CACAHE_KEY = (option && option.filter && option.filter.cacheKey) || 'defaultFilterCHeckedKeys'

  useEffect(() => {
    (option && option.filter && option.filter.cacheKey) && asyncStorage()
  }, []);

  const asyncStorage = () => {
    const defaultFilterCHeckedKeys = getItem(CACAHE_KEY)
    if (defaultFilterCHeckedKeys) {
      const newColumns = defaultFilterCHeckedKeys.split(',').map(i => stateColumns.find(col => col.title === i))
      setFilterChecked(defaultFilterCHeckedKeys.split(','))
      setStateColumns(newColumns)
    } else {
      setItem(CACAHE_KEY, stateColumns.map(item => item.title).join(','))
      setFilterChecked(stateColumns.map(item => item.title))
      setStateColumns(stateColumns)
    }
  }


  const checkBoxOnChange = (values: any[]) => {
    setItem(CACAHE_KEY, values.join(','))
    if (values.length === 0) {
      setAllChecked(false)
    } else if (values.length === columns.length) {
      setAllChecked(true)
    }
    setFilterChecked(values)
    setIndeterminate(!!values.length && values.length < columns.length)
  }

  const filterOnOk = () => {
    const newColumns = filterChecked.map(title => {
      return columns.find(col => col.title === title)
    })
    setStateColumns(newColumns)
    setFilterVisible(false)
  }

  const filterOnReset = () => {
    setStateColumns(columns)
    setFilterChecked(columns.map(item => item.title))
    setFilterVisible(false)
    setItem(CACAHE_KEY, columns.map(item => item.title).join(','))
    setAllChecked(true)
    setIndeterminate(false)
  }

  const filterContent = () => {
    return (
      <div>
        <div style={{ width: 100 }}>
          <Checkbox.Group
            options={columns.map(col => col.title)}
            value={filterChecked}
            onChange={checkBoxOnChange}
          />
        </div>
        <Row type='flex' justify='space-between' style={{ marginTop: 8 }}>
          <Button size='small' type='primary' onClick={filterOnOk}>确定</Button>
          <Button size='small' onClick={filterOnReset}>重置</Button>
        </Row>
      </div>
    )
  }

  const filterCheckedAll = (e: any) => {
    const { checked } = e.target
    setIndeterminate(false)
    setAllChecked(checked)
    if (checked) {
      setStateColumns(columns)
      setFilterChecked(columns.map(col => col.title))
      setItem(CACAHE_KEY, columns.map(col => col.title).join(','))
    } else {
      setStateColumns([])
      setFilterChecked([])
      setItem(CACAHE_KEY, '')
    }
  }

  return (
    <Fragment>
      {option &&
        <Row type='flex' justify='end' style={{ marginBottom: 10 }}>
          {
            (option.filter && option.filter.cacheKey) && <Fragment>
              <Popover
                content={filterContent()}
                title={<Checkbox
                  checked={allChecked}
                  onChange={filterCheckedAll}
                  indeterminate={indeterminate}
                >
                  全选
          </Checkbox>}
                visible={filterVisible}
                placement='left'
              >
                <Tooltip title='列筛选'>
                  <Icon type="filter" theme="twoTone" twoToneColor="#1A8DFB" style={{ fontSize: 20 }} onClick={() => setFilterVisible(!filterVisible)} />
                </Tooltip>
              </Popover>
            </Fragment>
          }
        </Row>
      }
      <Table
        {...props}
        ref={ref}
        columns={stateColumns}
        size={size}
        rowKey={rowKey || 'id_obj'}
        dataSource={dataSource}
        onChange={onChange}
      />
    </Fragment>
  );
});

export default CustomTable;

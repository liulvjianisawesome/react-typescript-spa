import * as React from 'react';
// import { Link } from 'react-router-dom';
import { Table } from 'antd';

function TableList() {
  // const { data, history, fetchData } = props;
  const dataSource = [
    { key: 1, id: 1, name: '小排骨', nationality: '中国', birthday: '2012-01-21'},
    { key: 2, id: 2, name: '大排骨', nationality: '好色之国', birthday: '2202-01-21'},
    { key: 3, id: 3, name: '毛哥', nationality: '蛮牛国', birthday: '1912-01-21'}
  ];

  return (
    <Table
      dataSource={dataSource}
      columns={[
        { title: 'id', dataIndex: 'id', key: 'id' },
        { title: '姓名', dataIndex: 'name', key: 'name' },
        { title: '国籍', dataIndex: 'nationality', key: 'nationality' },
        { title: '生日', dataIndex: 'birthday', key: 'birthday' },
      ]}
    />
  );
}

export default TableList;

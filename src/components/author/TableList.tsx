import * as React from 'react';
// import { Link } from 'react-router-dom';
import { Table } from 'antd';

interface DataType {
  key: number;
  id: number;
  name: string;
  nationality: string;
  birthday: string;
}

interface TableListProps {
  data: DataType[];
}

function TableList(props: TableListProps) {
  // const { data, history, fetchData } = props;
  const { data } = props;

  return (
    <Table
      dataSource={data}
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

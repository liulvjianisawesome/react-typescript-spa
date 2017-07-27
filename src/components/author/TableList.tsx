import * as React from 'react';
// import { Link } from 'react-router-dom';
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import DelButton from './DelButton';
import fetch from '../../hoc/fetch';

interface Author {
  id: number;
  name: string;
  nationality: string;
  birthday: string;
  key?: number;
}

interface TableListProps {
  data: {
    list: Author[];
  };
  fetchData: () => void;
}

function TableList(props: TableListProps) {
  const { data, fetchData } = props;

  data.list.forEach(author => author.key = author.id);

  return (
    <Table
      dataSource={data.list}
      columns={[
        { title: 'id', dataIndex: 'id', key: 'id' },
        { title: '姓名', dataIndex: 'name', key: 'name' },
        { title: '国籍', dataIndex: 'nationality', key: 'nationality' },
        { title: '生日', dataIndex: 'birthday', key: 'birthday' },
        {
          width: 120,
          render: (text) => (
            <span>
              <Link to={`/author/edit/${text.id}`}>编辑</Link>
              {' '}
              <DelButton data={text} onSuccess={fetchData} />
            </span>
          )
        }
      ]}
    />
  );
}

export default fetch(TableList);

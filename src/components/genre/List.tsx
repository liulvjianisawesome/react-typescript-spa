import * as React from 'react';
import { Link } from 'react-router-dom';
import { Card, Table, Button } from 'antd';
import { Genre } from '../../action/genre';
import * as H from 'history';

interface Props {
  history: H.History;
  data: Genre[];
}

function List(props: Props) {
  const { data, history } = props;
  data.forEach(genre => genre.key = genre.id);
  return (
    <Card title="类型列表">

      <div style={{ padding: 12 }}>
        <Button type="primary" onClick={() => history.push('/genre/new')}>
          添加类型
        </Button>
      </div>

      <Table
        dataSource={data}
        columns={[
          { title: 'id', dataIndex: 'id', key: 'id' },
          { title: '名称', dataIndex: 'name', key: 'name' },
          { title: '描述', dataIndex: 'desc', key: 'desc' },
          {
            width: 120,
            render: (text) => (
              <span>
                <Link to={`/author/edit/${text.id}`}>编辑</Link>
                {' '}
                <a>删除</a>
              </span>
            )
          }
        ]}
      />
    </Card>
  );
}

export default List;

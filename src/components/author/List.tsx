import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Card, Button } from 'antd';
import TableList from './TableList';

function List(props: RouteComponentProps<string>) {
  const { history } = props;

  return (
    <Card title="作者列表">
      <div style={{ padding: 12 }}>
        <Button type="primary" onClick={() => history.push('/author/new')}>
          添加作者
        </Button>
      </div>
      <TableList />
    </Card>
  );
}

export default List;
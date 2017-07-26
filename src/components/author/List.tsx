import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Card, Button } from 'antd';
import TableList from './TableList';

function List(props: RouteComponentProps<string>) {
  const { history } = props;
  const dataSource = [
    { key: 1, id: 1, name: '小排骨', nationality: '中国', birthday: '2012-01-21' },
    { key: 2, id: 2, name: '大排骨', nationality: '好色之国', birthday: '2202-01-21' },
    { key: 3, id: 3, name: '毛哥', nationality: '蛮牛国', birthday: '1912-01-21' }
  ];

  return (
    <Card title="作者列表">
      <div style={{ padding: 12 }}>
        <Button type="primary" onClick={() => history.push('/author/new')}>
          添加作者
        </Button>
      </div>
      <TableList data={dataSource} />
    </Card>
  );
}

export default List;
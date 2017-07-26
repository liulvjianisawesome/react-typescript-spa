import * as React from 'react';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import List from './List';
import Edit from './Edit';

function Author(props: RouteComponentProps<string>) {
  const { url } = props.match;
  const data = {
    name: '巴金',
    birthday: '2012-02-13',
    nationality: '中国'
  };
  return (
    <Switch>
      <Route path={`${url}/new`} component={Edit} />
      <Route
        path={`${url}/edit/:id`}
        render={
          () => <Edit {...props} data={data} />}
      />
      <Route path={`${url}`} component={List} />
    </Switch>
  );
}

export default Author;

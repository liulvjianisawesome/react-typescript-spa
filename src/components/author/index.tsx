import * as React from 'react';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import List from './List';
import Edit from './Edit';

function Author(props: RouteComponentProps<string>) {
  const { url } = props.match;
  return (
    <Switch>
      <Route path={`${url}/new`} component={Edit} />
      <Route
        path={`${url}/edit/:id`}
        render={
          ({ match }) => <Edit {...props} fetch={{ url: 'http://localhost:4000/api/author/' + match.params.id }} />}
      />
      <Route path={`${url}`} component={List} />
    </Switch>
  );
}

export default Author;

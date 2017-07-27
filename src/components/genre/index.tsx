import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { getGenreList } from '../../action/genre';
import { State } from '../../reducer/genre';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import List from './List';
import Edit from './Edit';

interface Props extends RouteComponentProps<string> {
  genre: State;
  dispatch: Redux.Dispatch<void>;
}

interface Params {
  id: number;
}

class Genre extends React.Component<Props, {}> {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderEdit = this.renderEdit.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(getGenreList());
  }

  renderEdit({ history, match }: RouteComponentProps<Params>) {
    const { genre } = this.props;

    // 这里没有从服务端获取，而是从list里面获取的单条数据
    const data = genre.data.find(d => d.id === match.params.id);
    return <Edit history={history} data={data} />;
  }

  render() {
    const { genre, history, match } = this.props;
    const { url } = match;

    if (genre.status === 0) {
      return <div>loaing...</div>;
    }

    if (genre.status === 2) {
      return <div>{genre.info}</div>;
    }

    return (
      <Switch>
        <Route path={`${url}/new`} component={Edit} />
        <Route path={`${url}/edit/:id`} render={this.renderEdit} />
        <Route
          path={url}
          render={() => <List history={history} data={genre.data} />}
        />
      </Switch>
    );
  }
}

const mapStateToProps = (state) => {
  const { genre } = state;
  return { genre };
};

export default connect(mapStateToProps)(Genre);

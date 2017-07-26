import * as React from 'react';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
import './App.css';
import Author from './components/author';
import Genre from './components/genre';
import Book from './components/book';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <Router>
          <div>
            <div className="header">
              <div className="logo">
                React Example
              </div>
            </div>

            <div className="menu">
              <NavLink to="/author">作者</NavLink>
              <NavLink to="/genre">分类</NavLink>
              <NavLink to="/book">书籍</NavLink>
            </div>

            <div className="main">
              <Route path="/author" component={Author} />
              <Route path="/genre" component={Genre} />
              <Route path="/book" component={Book} />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

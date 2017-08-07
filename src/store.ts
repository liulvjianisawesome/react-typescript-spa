import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
import reducer from './reducer';
import createSagaMiddleware from 'redux-saga';
import { getGenreList } from './sagas';

const sagaMiddleware = createSagaMiddleware();

const createStoreWithMiddleware = applyMiddleware(sagaMiddleware)(createStore);

const store = createStoreWithMiddleware(reducer);

sagaMiddleware.run(getGenreList);

export default store;
import { call, take, select, put } from 'redux-saga/effects';
import { handleList } from './action/genre';
import * as axios from 'axios';

export function* getGenreList() {
  yield take('getGenreList');

  const { data, status } = yield select(state => state.genre);

  if (!(status === 1 && data && data.length > 0)) {
    yield put(handleList(0));
    try {
      const res = yield call(axios.get, 'http://localhost:4000/api/genres');
      if (res.data.data) {
        yield put(handleList(1, res.data.data));
      } else {
        yield put(handleList(2, undefined, res.statusText));
      }
    } catch (err) {
      yield put(handleList(2, undefined, err.message));
    }
  }
}
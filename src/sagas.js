import { call, take, select, put, takeEvery } from 'redux-saga/effects';
import { handleList } from './action/genre';
import * as axios from 'axios';
import { message } from 'antd';

function* getGenreList() {
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

function* saveGenre() {
  const action = yield take('saveGenre');

  const { body, onSuccess } = action;

  try {
    const res = yield call(axios.post, 'http://localhost:4000/api/genre', body);
    if (res.data.data) {
      message.success('保存成功');
      yield put(handleList(1, res.data.data));
      onSuccess();
    } else {
      message.error(res.error);
    }
  } catch (err) {
    message.error(err.message);
  }

}

export default function* () {
  yield* getGenreList();
  while (true) {
    yield* saveGenre();
  }

}
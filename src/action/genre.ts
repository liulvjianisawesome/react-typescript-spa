import { message } from 'antd';
import * as refetch from 'refetch';

export const GENRE_LIST = 'GENRE_LIST';

export interface Genre {
  key?: number;
  id?: number;
  name: string;
  desc: string;
}

export interface Action {
  type: string;
  status: number;
  data?: Genre[];
  info?: string;
}

function handleList(status: number, data?: Genre[], info?: string): Action {
  return {
    type: GENRE_LIST,
    status,
    data,
    info,
  };
}

// 从服务器端获取数据
function fetchList() {
  return (dispatch) => {
    dispatch(handleList(0));
    refetch.get('http://localhost:4000/api/genres').then((res) => {
      if (res.data) {
        dispatch(handleList(1, res.data));
      } else {
        dispatch(handleList(2, undefined, res.error));
      }
    }).catch((err) => {
      dispatch(handleList(2, undefined, err.message));
    });
  };
}

// 获取列表的接口
export function getGenreList() {
  return (dispatch, getState) => {
    const { data, status } = getState().genre;

    // 如果数据存在于store中直接返回数据
    if (status === 1 && data && data.length > 0) {
      return Promise.resolve();
    }

    return dispatch(fetchList());
  };
}

// 保存数据接口
export function saveGenre(body: Genre, onSuccess: () => void) {
  return (dispatch) => {
    refetch.post('http://localhost:4000/api/genre', body).then((res) => {
      if (res.data) {
        onSuccess();

        dispatch(handleList(1, res.data));

        message.success('保存成功');
      } else {
        message.error(res.error);
      }
    }).catch((err) => {
      message.error(err.message);
    });
  };
}

// 删除数据接口
export function removeGenre(id: number) {
  return (dispatch, getState) => {
    refetch.delete('http://localhost:4000/api/genre', { id }).then((res) => {
      if (res.data === 1) {
        message.success('删除成功');

        const data = getState().genre.data.filter(d => d.id !== id);
        data.forEach((genre, index) => {
          genre.id = (index + 1);
        });

        dispatch(handleList(1, data));
      }
    }).catch((err) => {
      message.error(err.message);
    });
  };
}

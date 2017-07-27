import { GENRE_LIST, Genre, Action } from '../action/genre';

const defaultState = {
  status: 0,
  data: [],
};
export interface State {
  status: number;
  data: Genre[];
  info?: string;
}
export default function (state: State = defaultState, action: Action) {
  switch (action.type) {
    case GENRE_LIST:
      return Object.assign({}, state, {
        status: action.status,
        data: action.data,
        info: action.info
      });
    default:
      return state;
  }
}
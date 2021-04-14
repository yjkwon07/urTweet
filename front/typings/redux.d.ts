import 'redux';
import { Task } from 'redux-saga';

// Next Redux Toolkit Saga를 사용할때는
// confugureStore에서 강제로 sagaTask를 만들어주기 위함
declare module 'redux' {
  export interface Store {
    sagaTask?: Task;
  }
}

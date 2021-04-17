import 'redux';
import { Task } from 'redux-saga';
import { ThunkAction } from 'redux-thunk';

// Next Redux Toolkit Saga를 사용할때는
// confugureStore에서 강제로 sagaTask를 만들어주기 위함
declare module 'redux' {
  export interface Store {
    sagaTask?: Task;
  }
  export interface Dispatch<A extends Action = AnyAction> {
    <T extends ThunkAction<any, any, any, any>>(action: T): T extends ThunkAction<infer K, any, any, any> ? K : never;
  }
}

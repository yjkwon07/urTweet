import { ActionCreatorWithPreparedPayload } from '@reduxjs/toolkit';

import { FetchStatusActionPayload } from '@modules/fetchStatus/@types';

export interface RequestCommonMeta extends SubPartial<FetchStatusActionPayload['data'], 'actionList'> {
  keyName?: string;
  isLoadMore?: boolean;
}

export type ActionMetaPayload<P, M> = ActionCreatorWithPreparedPayload<[payload: P, meta?: M], P, string>;

export type PromiseAction<R, S, F, M> = {
  payload: R;
  meta?: M;
  resolve?: (value: S) => void;
  reject?: (value: CustomAxiosError<F>) => void;
};

export type FetchAction<R, S, F, M> = {
  TYPE: string;
  request: ActionMetaPayload<R, M>;
  success: ActionMetaPayload<S, M>;
  failure: ActionMetaPayload<F, M>;
};

import { ActionCreatorWithPreparedPayload } from '@reduxjs/toolkit';

import { IFetchStatusActionPayload } from '@modules/fetchStatus';

export interface RequestCommonMeta extends SubPartial<IFetchStatusActionPayload['data'], 'actionList'> {
  keyName?: string;
  isLoadMore?: boolean;
}

export type ActionMetaPayload<P, M> = ActionCreatorWithPreparedPayload<[payload: P, meta?: M], P, string>;

import { ActionCreatorWithPreparedPayload } from '@reduxjs/toolkit';

import { FetchStatusActionPayload } from '@modules/fetchStatus';

export interface RequestCommonMeta extends SubPartial<FetchStatusActionPayload['data'], 'actionList'> {
  keyName?: string;
  isLoadMore?: boolean;
}

export type ActionMetaPayload<P, M> = ActionCreatorWithPreparedPayload<[payload: P, meta?: M], P, string>;

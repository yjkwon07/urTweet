import { ActionCreatorWithPreparedPayload } from '@reduxjs/toolkit';

import { IFetchStatusActionPayload } from '@modules/fetchStatus';

export interface RequestCommonMeta extends Partial<IFetchStatusActionPayload['data'], 'actionList'> {
  [key: string]: any;
}

export type ActionMetaPayload<P, M> = ActionCreatorWithPreparedPayload<[payload: P, meta?: M], P, string>;

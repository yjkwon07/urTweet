import { ActionCreatorWithPreparedPayload } from '@reduxjs/toolkit';

import { ItypePayload } from '@modules/fetchStatus';

export type IMeta = Pick<ItypePayload['data'], 'actionList'>;

export type ActionMetaPayload<P, M> = ActionCreatorWithPreparedPayload<[payload: P, meta?: M], P, string, never, M>;

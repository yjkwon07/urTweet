import { ActionCreatorWithPreparedPayload } from '@reduxjs/toolkit';

import { typePayload } from '@modules/fetchStatus';

export type Meta = Pick<typePayload['data'], 'actionList'>;

export type ActionMetaPayload<P, M> = ActionCreatorWithPreparedPayload<[payload: P, meta?: M], P, string, never, M>;

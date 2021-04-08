import { ActionCreatorWithPreparedPayload } from '@reduxjs/toolkit';

export type ActionMetaPayload<P, M> = ActionCreatorWithPreparedPayload<[payload: P, meta?: M], P, string, never, M>;

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '@modules/store/configStore';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

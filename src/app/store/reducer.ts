import { createReducer } from '@ngrx/store';
import { initialRootState } from './state';

export const reducer = createReducer(initialRootState);

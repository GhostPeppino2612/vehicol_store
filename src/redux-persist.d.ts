declare module 'redux-persist/es/persistReducer' {
    import { Reducer } from 'redux';
    import { PersistConfig } from 'redux-persist';
    
    export function persistReducer<S>(config: PersistConfig, reducer: Reducer<S>): Reducer<S>;
  }
  
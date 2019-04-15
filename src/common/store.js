import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import storage from 'redux-persist/lib/storage';
import thunkMiddleware from 'redux-thunk';
import skills from '../ducks/skills';

const rootPersistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: hardSet
};

const loggerMiddleware = createLogger({
    predicate: (getState, action) => true
});

const rootReducer = combineReducers({
    skills
});

const store = createStore(
    persistReducer(rootPersistConfig, rootReducer),
    compose(applyMiddleware(loggerMiddleware, thunkMiddleware))
);
const persistor = persistStore(store);

export default { store, persistor };

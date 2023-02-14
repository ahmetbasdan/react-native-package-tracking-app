import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import reducers from './index'
import configurePersist from './configurePersist'

const pReducer = persistReducer(configurePersist, reducers)
const store = createStore(pReducer)
const persistor = persistStore(store)

export { store, persistor }
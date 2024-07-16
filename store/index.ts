import { configureStore } from '@reduxjs/toolkit'
import { accountReducer } from './slices/account/slice'
import { assetApysReducer } from './slices/assetApys'
import { assetApysApi } from './slices/assetApys/api'
import { balancesReducer } from './slices/balance'
import { bridgesReducer } from './slices/bridges'
import { chainReducer } from './slices/chain/slice'
import { currencyReducer } from './slices/currency/slice'
import { ionLensReducer } from './slices/ionLens'
import { ionPoolReducer } from './slices/ionPool'
import { netApyReducer } from './slices/netApy'
import { netApyApi } from './slices/netApy/api'
import { positionsReducer } from './slices/positions'
import { positionsApi } from './slices/positions/api'
import { priceReducer } from './slices/price'
import { routerReducer } from './slices/router/slice'
import { statusReducer } from './slices/status/slice'
import { UIReducer } from './slices/ui/slice'

export const store = configureStore({
  reducer: {
    account: accountReducer,
    assetApys: assetApysReducer,
    balances: balancesReducer,
    bridges: bridgesReducer,
    chain: chainReducer,
    currency: currencyReducer,
    ionLens: ionLensReducer,
    ionPool: ionPoolReducer,
    netApy: netApyReducer,
    positions: positionsReducer,
    price: priceReducer,
    router: routerReducer,
    status: statusReducer,
    ui: UIReducer,

    // API reducers
    [netApyApi.reducerPath]: netApyApi.reducer,
    [positionsApi.reducerPath]: positionsApi.reducer,
    [assetApysApi.reducerPath]: assetApysApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(netApyApi.middleware, positionsApi.middleware, assetApysApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

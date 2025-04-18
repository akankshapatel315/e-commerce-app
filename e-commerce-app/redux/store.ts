import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import cartReducer from './slices/cartSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    // [yourApi.reducerPath]: yourApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    // .concat(yourApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

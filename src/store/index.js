import { configureStore } from '@reduxjs/toolkit'

import articlesListSlice from './articlesListSlice'
import authenticationSlice from './authenticationSlice'

export default configureStore({
  reducer: {
    articlesListSlice,
    authenticationSlice,
  },
})

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { apiBase } from '../config/api'

export const getArticles = createAsyncThunk(
  'articles/getArticles',
  async function (offset = 0, { rejectWithValue }) {
    try {
      const res = await fetch(`${apiBase}articles?limit=5&offset=${offset}`)
      if (!res.ok) {
        throw new Error("Couldn't get articles from database")
      }
      return await res.json()
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const getArticle = createAsyncThunk(
  'articles/getArticle',
  async function (slug, { rejectWithValue }) {
    try {
      const res = await fetch(`${apiBase}articles/${slug}`)
      if (!res.ok) {
        throw new Error("Couldn't get articel from database")
      }
      return await res.json()
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

const articlesListSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    articlesCount: 0,
    offset: 0,
    status: '',
    error: '',
    currentArticle: {
      title: '',
      body: '',
      author: {
        username: '',
        image: '',
      },
      createdAt: '',
      favoritesCount: null,
      tagList: [],
    },
  },
  reducers: {
    changePage(state, action) {
      state.offset = action.payload * 5 - 5
    },
  },
  extraReducers: {
    [getArticles.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    },
    [getArticles.fulfilled]: (state, action) => {
      state.status = 'resolved'
      state.articles = [...action.payload.articles]
      state.articlesCount = action.payload.articlesCount
    },
    [getArticles.rejected]: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
    },
    [getArticle.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    },
    [getArticle.fulfilled]: (state, action) => {
      state.status = 'resolved'
      state.article = action.payload.article
    },
    [getArticle.rejected]: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
    },
  },
})

export const { changePage } = articlesListSlice.actions

export default articlesListSlice.reducer

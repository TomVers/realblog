import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

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

export const createArticle = createAsyncThunk(
  'articles/createArticle',
  async function (articleData) {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.post(`${apiBase}articles`, articleData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      return response.data.article
    } catch (error) {
      throw new Error('Create article error')
    }
  },
)

export const deleteArticle = createAsyncThunk(
  'articles/deleteArticle',
  async function (articleSlug) {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.delete(`${apiBase}articles/${articleSlug}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      return response.data
    } catch (error) {
      throw new Error('Delete article error')
    }
  },
)

export const editArticle = createAsyncThunk('articles/editArticle', async function (payload) {
  try {
    const { slug, articleData } = payload
    const token = localStorage.getItem('token')
    const response = await axios.put(`${apiBase}articles/${slug}`, articleData, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw new Error('Edit article error')
  }
})

const articlesListSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    articlesCount: 0,
    offset: 0,
    status: '',
    error: '',
    currentArticle: null,
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
      state.currentArticle = action.payload.article
    },
    [getArticle.rejected]: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
    },
    [createArticle.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    },
    [createArticle.fulfilled]: (state) => {
      state.status = 'resolved'
    },
    [createArticle.rejected]: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
    },
    [editArticle.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    },
    [editArticle.fulfilled]: (state) => {
      state.status = 'resolved'
    },
    [editArticle.rejected]: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
    },
  },
})

export const { changePage } = articlesListSlice.actions

export default articlesListSlice.reducer

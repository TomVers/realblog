import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { apiBase } from '../config/api'

export const getArticles = createAsyncThunk('articles/getArticles', async function (offset = 0) {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get(`${apiBase}articles?limit=5&offset=${offset}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw new Error("Couldn't get articles from database")
  }
})

export const getArticle = createAsyncThunk('articles/getArticle', async function (slug) {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get(`${apiBase}articles/${slug}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw new Error("Couldn't get article from database")
  }
})

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

export const likeArticle = createAsyncThunk('articles/likeArticle', async function (slug) {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.post(
      `${apiBase}articles/${slug}/favorite`,
      {},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    )
    return response.data.article
  } catch (error) {
    throw new Error('Like article error')
  }
})

export const unlikeArticle = createAsyncThunk('articles/unlikeArticle', async function (slug) {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.delete(`${apiBase}articles/${slug}/favorite`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    return response.data.article
  } catch (error) {
    throw new Error('Unlike article error')
  }
})

const articlesListSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    articlesCount: 0,
    page: 1,
    status: '',
    error: '',
    currentArticle: null,
  },
  reducers: {
    changePage(state, action) {
      state.page = action.payload
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
    [deleteArticle.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    },
    [deleteArticle.fulfilled]: (state) => {
      state.status = 'resolved'
    },
    [deleteArticle.rejected]: (state, action) => {
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
    [likeArticle.pending]: (state) => {
      state.error = null
    },
    [likeArticle.fulfilled]: (state) => {
      state.status = 'resolved'
    },
    [likeArticle.rejected]: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
    },
    [unlikeArticle.pending]: (state) => {
      state.error = null
    },
    [unlikeArticle.fulfilled]: (state) => {
      state.status = 'resolved'
    },
    [unlikeArticle.rejected]: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
    },
  },
})

export const { changePage } = articlesListSlice.actions

export default articlesListSlice.reducer

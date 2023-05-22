import { Routes, Route } from 'react-router-dom'

import { Header } from '../Header/Header'
import { ArticlesList } from '../ArticlesList/ArticlesList'
import { ArticleFull } from '../ArticleFull/ArticleFull'
import { SignUp } from '../../pages/SignUp'
import { SignIn } from '../../pages/SignIn'
import { EditProfile } from '../../pages/EditProfile'
import { CreateArticle } from '../../pages/CreateArticle'
import { EditArticle } from '../../pages/EditArticle'

// eslint-disable-next-line no-unused-vars
import style from './App.module.scss'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<ArticlesList />} />
        <Route path='/articles' element={<ArticlesList />} />
        <Route path='/articles/:slug' element={<ArticleFull />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/profile' element={<EditProfile />} />
        <Route path='/new-article' element={<CreateArticle />} />
        <Route path='/articles/:slug/edit' element={<EditArticle />} />
      </Routes>
    </>
  )
}

export default App

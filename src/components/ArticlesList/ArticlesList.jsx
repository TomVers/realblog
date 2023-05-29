import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { nanoid } from 'nanoid'
import { Pagination, Spin } from 'antd'

import { getArticles, changePage } from '../../store/articlesListSlice'
import { Article } from '../Article/Article'

import styles from './ArticlesList.module.scss'

export function ArticlesList() {
  const arrayArticles = useSelector((state) => state.articlesListSlice.articles)
  const pageArticles = useSelector((state) => state.articlesListSlice.page)
  const dispatch = useDispatch()
  const { status, articlesCount } = useSelector((state) => state.articlesListSlice)

  const offset = (pageArticles - 1) * 5

  useEffect(() => {
    dispatch(getArticles(offset))
  }, [dispatch, offset])

  if (status === 'loading') {
    return (
      <Spin className={styles.spin} tip='Loading' size='large'>
        <></>
      </Spin>
    )
  }
  return (
    <div className={styles.content}>
      <div className={styles.articles}>
        {arrayArticles?.map((el) => (
          <Article
            key={nanoid()}
            slug={el?.slug}
            title={el?.title}
            favoritesCount={el?.favoritesCount}
            description={el?.description}
            body={el?.body}
            tagList={el?.tagList}
            date={el?.updatedAt}
            authorName={el?.author?.username}
            authorPhoto={el?.author?.image}
            favorited={el?.favorited}
          />
        ))}
      </div>
      <Pagination
        pageSize={5}
        current={pageArticles}
        showQuickJumper
        showSizeChanger={false}
        total={articlesCount}
        onChange={(page) => dispatch(changePage(page))}
        className={styles.pagination}
      />
    </div>
  )
}

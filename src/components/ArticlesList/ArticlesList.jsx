import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { nanoid } from 'nanoid'
import { Pagination, Spin } from 'antd'

import { getArticles, changePage } from '../../store/articlesListSlice'
import { Article } from '../Article/Article'

import styles from './ArticlesList.module.scss'

export function ArticlesList() {
  const arrayArticles = useSelector((state) => state.articlesListSlice.articles)
  const dispatch = useDispatch()
  const { status, offset, articlesCount } = useSelector((state) => state.articlesListSlice)

  useEffect(() => {
    dispatch(getArticles())
  }, [])

  const handlePageChange = (e) => {
    dispatch(changePage(e))
    dispatch(getArticles(e * 5 - 5))
  }

  if (status === 'loading') {
    return (
      <Spin className={styles.spin} tip='Loading' size='large'>
        <></>
      </Spin>
    )
  } else {
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
          defaultCurrent={1}
          defaultPageSize={5}
          current={(offset + 5) / 5}
          showSizeChanger={false}
          total={articlesCount}
          onChange={handlePageChange}
          className={styles.pagination}
        />
      </div>
    )
  }
}

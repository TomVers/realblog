import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from 'nanoid'
import format from 'date-fns/format'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

import { getArticle } from '../../store/articlesListSlice'

import styles from './ArticleFull.module.scss'

export const ArticleFull = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { article } = useSelector((state) => state.articlesListSlice)
  useEffect(() => {
    dispatch(getArticle(id))
  }, [])

  return (
    <>
      {article && (
        <div className={styles.article}>
          <div className={styles.article__info}>
            <div className={styles.article__info_block}>
              <div className={styles.article__info_content}>
                <div className={styles.article__info_title}>{article.title}</div>
                <span className={styles}>&#9825; {article.favoritesCount}</span>
              </div>

              {article.tagList.map((el) => {
                if (article.tagList.length > 0) {
                  return (
                    <span key={nanoid()} className={styles.article__info_tags}>
                      {el}
                    </span>
                  )
                }
              })}
            </div>
            <div className={styles.article__info_user}>
              <div>
                <div className={styles.article__info_author}>{article.author.username}</div>
                <div className={styles.article__info_date}>
                  {format(new Date(article.updatedAt), 'MMM dd, yyyy')}
                </div>
              </div>
              <img className={styles.article__info_photo} src={article.author.image} />
            </div>
          </div>
          <div className={styles.article__body}>
            {<ReactMarkdown>{article.body}</ReactMarkdown>}
          </div>
        </div>
      )}
    </>
  )
}

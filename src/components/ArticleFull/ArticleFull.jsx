import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from 'nanoid'
import format from 'date-fns/format'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { Button, message, Popconfirm } from 'antd'

import { getArticle, deleteArticle } from '../../store/articlesListSlice'

import styles from './ArticleFull.module.scss'

export const ArticleFull = () => {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { currentArticle } = useSelector((state) => state.articlesListSlice)

  useEffect(() => {
    dispatch(getArticle(slug))
  }, [])

  const data = JSON.parse(localStorage.getItem('data'))

  const isAuthor = () => {
    const authorName = data?.user?.username
    return authorName === currentArticle.author.username
  }

  const confirm = () => {
    dispatch(deleteArticle(currentArticle.slug)).then(() => {
      navigate('/articles')
    })
  }

  const cancel = () => {
    message.error("The article hasn't been removed")
  }

  useEffect(() => {
    localStorage.setItem('slug', slug)
  }, [slug])

  return (
    <>
      {currentArticle && (
        <div className={styles.article}>
          <div className={styles.article__info}>
            <div className={styles.article__info_block}>
              <div className={styles.article__info_content}>
                <div className={styles.article__info_title}>{currentArticle.title}</div>
                <span className={styles}>&#9825; {currentArticle.favoritesCount}</span>
              </div>
              {currentArticle.tagList.map((el) => {
                if (currentArticle.tagList.length > 0) {
                  return (
                    <span key={nanoid()} className={styles.article__info_tags}>
                      {el}
                    </span>
                  )
                }
              })}
              <div className={styles.article__description}>{currentArticle.description}</div>
            </div>
            <div className={styles.article__infocontent}>
              <div className={styles.article__info_user}>
                <div>
                  <div className={styles.article__info_author}>
                    {currentArticle.author.username}
                  </div>
                  <div className={styles.article__info_date}>
                    {format(new Date(currentArticle.updatedAt), 'MMM dd, yyyy')}
                  </div>
                </div>
                <img className={styles.article__info_photo} src={currentArticle.author.image} />
              </div>
              {isAuthor() ? (
                <>
                  <Popconfirm
                    title='Are you sure to delete this article?'
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText='Yes'
                    cancelText='No'
                    placement='right'
                  >
                    <Button type='link' className={styles.article__delbtn}>
                      Delete
                    </Button>
                  </Popconfirm>
                  <Link
                    to={`/articles/${currentArticle.slug}/edit`}
                    className={styles.article__editbtn}
                  >
                    Edit
                  </Link>
                </>
              ) : null}
            </div>
          </div>

          <div className={styles.article__body}>
            {<ReactMarkdown>{currentArticle.body}</ReactMarkdown>}
          </div>
        </div>
      )}
    </>
  )
}

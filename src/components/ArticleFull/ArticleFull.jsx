import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from 'nanoid'
import format from 'date-fns/format'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { Button, message, Popconfirm, Spin } from 'antd'

import {
  getArticle,
  deleteArticle,
  likeArticle,
  unlikeArticle,
} from '../../store/articlesListSlice'

import styles from './ArticleFull.module.scss'

export const ArticleFull = () => {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { currentArticle, status } = useSelector((state) => state.articlesListSlice)
  const isAuth = useSelector((state) => state.authenticationSlice.data)

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

  const [likesCount, setLikesCount] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    if (currentArticle) {
      setLikesCount(currentArticle.favoritesCount)
      setIsLiked(currentArticle.favorited)
    }
  }, [currentArticle])

  const onLikeClick = () => {
    if (isLiked) {
      setLikesCount(likesCount - 1)
      dispatch(unlikeArticle(slug))
    } else {
      setLikesCount(likesCount + 1)
      dispatch(likeArticle(slug))
    }
    setIsLiked(!isLiked)
  }

  if (status === 'loading') {
    return (
      <Spin className={styles.spin} tip='Loading' size='large'>
        <></>
      </Spin>
    )
  } else {
    return (
      <>
        {currentArticle && (
          <div className={styles.article}>
            <div className={styles.article__info}>
              <div className={styles.article__info_block}>
                <div className={styles.article__info_content}>
                  <div className={styles.article__info_title}>{currentArticle.title}</div>
                  {isAuth ? (
                    <button onClick={onLikeClick} className={styles.article__info_likes}>
                      <span>{isLiked ? '❤️' : '🤍'}</span>
                      <span>{likesCount}</span>
                    </button>
                  ) : (
                    <div className={styles.article__info_noaccess}>
                      <span>{isLiked ? '❤️' : '🤍'}</span>
                      <span>{likesCount}</span>
                    </div>
                  )}
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
}

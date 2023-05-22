import { Link } from 'react-router-dom'
import { useState } from 'react'
import format from 'date-fns/format'
import { nanoid } from 'nanoid'
import { useDispatch, useSelector } from 'react-redux'

import { likeArticle, unlikeArticle } from '../../store/articlesListSlice'

import styles from './Article.module.scss'

export function Article(props) {
  const {
    slug,
    title,
    favoritesCount,
    favorited,
    description,
    tagList,
    date,
    authorName,
    authorPhoto,
  } = props

  const isAuth = useSelector((state) => state.authenticationSlice.data)

  const dispatch = useDispatch()

  const [likesCount, setLikesCount] = useState(favoritesCount)
  const [isLiked, setIsLiked] = useState(favorited)

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

  return (
    <div className={styles.article}>
      <div className={styles.article__info}>
        <div className={styles.article__info_block}>
          <Link
            state={{ favoritesCount: likesCount, favorited: isLiked }}
            to={`/articles/${slug}`}
            className={styles.article__info_title}
          >
            {title}
          </Link>
          {isAuth ? (
            <button onClick={onLikeClick} className={styles.article__info_likes}>
              {isLiked ? '❤️' : '🤍'} {likesCount}
            </button>
          ) : (
            <button className={styles.article__info_noaccess}>
              {'🤍'} {likesCount}
            </button>
          )}
        </div>
        {tagList?.map((el) => {
          if (tagList.length > 0) {
            return (
              <span key={nanoid()} className={styles.article__info_tags}>
                {el}
              </span>
            )
          }
        })}
        <p className={styles.article__info_body}>{description}</p>
      </div>
      <div className={styles.article__user}>
        <div>
          <div className={styles.article__user_author}>{authorName}</div>
          <div className={styles.article__user_date}>
            {date ? format(new Date(date), 'MMM dd, yyyy') : null}
          </div>
        </div>
        <img className={styles.article__user_photo} src={authorPhoto} />
      </div>
    </div>
  )
}

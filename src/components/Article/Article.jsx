import { Link } from 'react-router-dom'
import format from 'date-fns/format'
import { nanoid } from 'nanoid'

import styles from './Article.module.scss'

export function Article(props) {
  const { slug, title, countHeart, body, tagList, date, authorName, authorPhoto } = props
  return (
    <div className={styles.article}>
      <div className={styles.article__info}>
        <div className={styles.article__info_block}>
          <Link to={`/articles/${slug}`} className={styles.article__info_title}>
            {title}
          </Link>
          <span className={styles}>&#9825; {countHeart}</span>
        </div>
        {tagList.map((el) => {
          if (tagList.length > 0) {
            return (
              <span key={nanoid()} className={styles.article__info_tags}>
                {el}
              </span>
            )
          }
        })}
        <p className={styles.article__info_body}>{body}</p>
      </div>
      <div className={styles.article__user}>
        <div>
          <div className={styles.article__user_author}>{authorName}</div>
          <div className={styles.article__user_date}>{format(new Date(date), 'MMM dd, yyyy')}</div>
        </div>
        <img className={styles.article__user_photo} src={authorPhoto} />
      </div>
    </div>
  )
}

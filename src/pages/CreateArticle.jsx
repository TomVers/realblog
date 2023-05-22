import { useForm, useFieldArray } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { createArticle } from '../store/articlesListSlice'

import styles from './Pages.module.scss'

export const CreateArticle = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  })

  const onSubmit = (formData) => {
    const articleData = {
      article: {
        title: formData.title,
        description: formData.description,
        body: formData.text,
        tagList: formData.tags.map((tag) => tag.name),
      },
    }
    dispatch(createArticle(articleData)).then((res) => {
      localStorage.setItem('slug', res.payload.slug)
      navigate(`/articles/${res.payload.slug}`)
      localStorage.removeItem('slug')
    })
  }

  return (
    <div className={styles.createcontent}>
      <h3 className={styles.createcontent__title}>Create new article</h3>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.labelcontain__label}>
            <label htmlFor='title'>
              Title
              <input
                name='title'
                type='text'
                placeholder='Title'
                className={`${styles.labelcontain__input} ${styles.createcontent__input}`}
                {...register('title', {
                  required: 'Required field',
                  minLength: 1,
                })}
              />
              {errors.title && <p className={styles.labelcontain__error}>{errors.title.message}</p>}
            </label>
          </div>
          <div className={styles.labelcontain__label}>
            <label htmlFor='description'>
              Short description
              <input
                name='description'
                type='text'
                placeholder='Short description'
                className={`${styles.labelcontain__input} ${styles.createcontent__input}`}
                {...register('description', {
                  required: 'Required field',
                  minLength: 1,
                })}
              />
              {errors.description && (
                <p className={styles.labelcontain__error}>{errors.description.message}</p>
              )}
            </label>
          </div>
          <div className={styles.labelcontain__label}>
            <label htmlFor='text'>
              Text
              <textarea
                name='text'
                type='text'
                placeholder='Text'
                className={`${styles.labelcontain__input} ${styles.createcontent__input} ${styles.createcontent__input_text}`}
                {...register('text', {
                  required: 'Required field',
                  minLength: 1,
                  maxLength: 5000,
                })}
              />
              {errors.text && <p className={styles.labelcontain__error}>{errors.text.message}</p>}
            </label>
          </div>
          <p className={styles.createcontent__info}>Tags</p>
          <div className={styles.createcontent__tags}>
            {fields.map((tag, index) => (
              <div key={tag.id} className={styles.createcontent__tags_field}>
                <input
                  className={`${styles.labelcontain__input} ${styles.createcontent__input_tags}`}
                  {...register(`tags.${index}.name`, { required: 'Required field' })}
                  defaultValue={tag.name}
                />
                {errors.tags && errors.tags[index] && (
                  <p className={styles.labelcontain__error}>{`Tag ${index + 1} is required`}</p>
                )}
                <button
                  type='button'
                  onClick={() => remove(index)}
                  className={styles.createcontent__deltag}
                >
                  Delete
                </button>
              </div>
            ))}
            <button
              type='button'
              onClick={() => append({ name: '' })}
              className={styles.createcontent__addtag}
            >
              Add tag
            </button>
          </div>

          <input type='submit' value='Send' className={styles.labelcontain__submitbtn} />
        </form>
      </div>
    </div>
  )
}

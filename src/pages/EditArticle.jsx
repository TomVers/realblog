import { useForm, useFieldArray } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { getArticle, editArticle } from '../store/articlesListSlice'

import styles from './Pages.module.scss'

export const EditArticle = () => {
  // eslint-disable-next-line no-unused-vars
  const [title, setTitle] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [description, setDescription] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [body, setBody] = useState('')
  // eslint-disable-next-line no-unused-vars
  // const [tags, setTags] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      text: '',
    },
  })

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'tags',
  })

  useEffect(() => {
    dispatch(getArticle(localStorage.getItem('slug'))).then((response) => {
      const data = response.payload
      reset({
        title: data?.article?.title,
        description: data?.article?.description,
        text: data?.article?.body,
        tags: data?.article?.tagList || [],
      })

      // Установка начальных значений полей тегов
      data?.article?.tagList?.forEach((tag, index) => {
        update(index, { name: tag })
      })
    })
  }, [])

  const onSubmit = (formData) => {
    const slug = localStorage.getItem('slug')
    const newTags = formData.newTags ? [formData.newTags] : []
    const tagList = [...formData.tags.map((tag) => tag.name), ...newTags]

    const payload = {
      slug,
      articleData: {
        article: {
          title: formData.title,
          description: formData.description,
          body: formData.text,
          tagList,
        },
      },
    }

    dispatch(editArticle(payload)).then(() => {
      navigate('/articles')
    })
  }

  return (
    <div className={styles.createcontent}>
      <h3 className={styles.createcontent__title}>Edit article</h3>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.labelcontain__label}>
            <label htmlFor='title'>
              Title
              <input
                name='title'
                defaultValue={register('title').defaultValue}
                type='text'
                placeholder='Title'
                onChange={(e) => {
                  setTitle(e.target.value)
                }}
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
                defaultValue={register('description').defaultValue}
                type='text'
                placeholder='Short description'
                onChange={(e) => {
                  setDescription(e.target.value)
                }}
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
                defaultValue={register('text').defaultValue}
                type='text'
                placeholder='Text'
                onChange={(e) => {
                  setBody(e.target.value)
                }}
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
            {fields.length > 0 ? (
              fields.map((tag, index) => (
                <div key={tag.id} className={styles.createcontent__tags_field}>
                  <label htmlFor={`tags.${index}.name`}>
                    <input
                      name={`tags.${index}.name`}
                      type='text'
                      className={`${styles.labelcontain__input} ${styles.createcontent__input_tags}`}
                      {...register(`tags.${index}.name`, { required: 'Required field' })}
                      defaultValue={tag.name}
                    />
                  </label>
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
                  <button
                    type='button'
                    onClick={() => append({ name: '' })}
                    className={styles.createcontent__addtag}
                  >
                    Add tag
                  </button>
                </div>
              ))
            ) : (
              <button
                type='button'
                onClick={() => append({ name: '' })}
                className={styles.createcontent__addtag}
              >
                Add tag
              </button>
            )}
          </div>
          <input type='submit' value='Send' className={styles.labelcontain__submitbtn} />
        </form>
      </div>
    </div>
  )
}

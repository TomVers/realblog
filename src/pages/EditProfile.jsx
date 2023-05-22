import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { updateUser } from '../store/authenticationSlice'

import styles from './Pages.module.scss'

export const EditProfile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAuth = useSelector((state) => state.authenticationSlice.data)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (formData) => {
    const userData = {
      user: {
        email: formData.email,
        password: formData.password,
        username: formData.username,
        image: formData.avatar,
      },
    }
    dispatch(updateUser(userData))
    navigate('/articles')
  }

  return (
    <>
      {isAuth ? (
        <div className={styles.content}>
          <h3 className={styles.content__title}>Edit Profile</h3>
          <div className={styles.labelcontain}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.labelcontain__label}>
                <label htmlFor='username'>
                  Username
                  <input
                    name='username'
                    type='text'
                    placeholder='Username'
                    className={styles.labelcontain__input}
                    {...register('username', {
                      required: 'Required field',
                      minLength: {
                        value: 3,
                        message: 'Name is too short: min 3 symbols',
                      },
                      maxLength: {
                        value: 20,
                        message: 'Name is too long: max 20 symbols',
                      },
                    })}
                  />
                  {errors.username && (
                    <p className={styles.labelcontain__error}>{errors.username.message}</p>
                  )}
                </label>
              </div>
              <div className={styles.labelcontain__label}>
                <label htmlFor='email' className={styles.labelcontain__label}>
                  Email address
                  <input
                    name='email'
                    type='text'
                    placeholder='Email address'
                    className={styles.labelcontain__input}
                    {...register('email', {
                      required: 'Required field',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                  />
                  {errors.email && (
                    <p className={styles.labelcontain__error}>{errors.email.message}</p>
                  )}
                </label>
              </div>
              <div className={styles.labelcontain__label}>
                <label htmlFor='password' className={styles.labelcontain__label}>
                  New Password
                  <input
                    name='password'
                    type='password'
                    placeholder='New Password'
                    min='6'
                    max='40'
                    className={styles.labelcontain__input}
                    {...register('password', {
                      required: 'Required field',
                      minLength: {
                        value: 6,
                        message: 'Password is too short: min 6 symbols',
                      },
                      maxLength: {
                        value: 40,
                        message: 'Password is too long: max 40 symbols',
                      },
                    })}
                  />
                  {errors.password && (
                    <p className={styles.labelcontain__error}>{errors.password.message}</p>
                  )}
                </label>
              </div>
              <div className={styles.labelcontain__label}>
                <label htmlFor='avatar' className={styles.labelcontain__label}>
                  Avatar image (url)
                  <input
                    name='avatar'
                    type='text'
                    placeholder='Avatar image'
                    className={styles.labelcontain__input}
                    {...register('avatar', {
                      required: true,
                      pattern: {
                        value: /^(ftp|http|https):\/\/[^ "]+$/,
                        message: 'Invalid url',
                      },
                    })}
                  />
                  {errors.avatar && (
                    <p className={styles.labelcontain__error}>{errors.avatar.message}</p>
                  )}
                </label>
              </div>
              <input type='submit' value='Save' className={styles.labelcontain__submitbtn} />
            </form>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

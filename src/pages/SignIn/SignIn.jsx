import { Link, Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { loginUser } from '../../store/authenticationSlice'
import styles from '../SignUp/SignUp.module.scss'

export function SignIn() {
  const dispatch = useDispatch()

  const rejectedPassword = useSelector((state) => state.authenticationSlice.status)

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm()

  const onSubmit = (formData) => {
    const userData = {
      user: {
        email: formData.email,
        password: formData.password,
      },
    }
    dispatch(loginUser(userData))
  }

  const isAuth = useSelector((state) => state.authenticationSlice.data)
  if (isAuth) {
    return <Navigate replace to='/' />
  }

  return (
    <div className={styles.content}>
      <h3 className={styles.content__title}>Sign In</h3>
      <div className={styles.labelcontain}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.labelcontain__label}>
            <label htmlFor='email'>
              Email address
              <input
                name='email'
                type='email'
                placeholder='Email address'
                className={styles.labelcontain__input}
                {...register('email', {
                  required: 'Required field',
                  minLength: 1,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
              />
              {errors.email && <p className={styles.labelcontain__error}>{errors.email.message}</p>}
            </label>
          </div>
          <div className={styles.labelcontain__label}>
            <label htmlFor='password'>
              Password
              <input
                name='password'
                type='password'
                placeholder='Password'
                className={styles.labelcontain__input}
                {...register('password', {
                  required: true,
                })}
              />
              {errors.password && (
                <p className={styles.labelcontain__error}>{errors.password.message}</p>
              )}
              {rejectedPassword && <p className={styles.labelcontain__error}>Wrong password</p>}
            </label>
          </div>
          <input
            type='submit'
            value='Login'
            disabled={!isValid}
            className={styles.labelcontain__submitbtn}
          />
        </form>
        <p className={styles.content__footer}>
          Don’t have an account?
          <Link to={'/sign-up'} className={styles.content__link}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

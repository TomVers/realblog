import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'

import { registerUser } from '../../store/authenticationSlice'

import styles from './SignUp.module.scss'

export function SignUp() {
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (formData) => {
    const userData = {
      user: {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      },
    }
    dispatch(registerUser(userData))
  }

  const isAuth = useSelector((state) => state.authenticationSlice.data)
  if (isAuth) {
    return <Navigate replace to='/' />
  }

  const [matchPassword, setMatchPassword] = useState('')
  const password = watch('password')
  const reppassword = watch('reppassword')
  useEffect(() => {
    if (password !== reppassword && reppassword.length !== 0) {
      setMatchPassword('Passwords do not match')
    } else {
      setMatchPassword('')
    }
  }, [password, reppassword])

  return (
    <div className={styles.content}>
      <h3 className={styles.content__title}>Create new account</h3>
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
              {errors.email && <p className={styles.labelcontain__error}>{errors.email.message}</p>}
            </label>
          </div>
          <div className={styles.labelcontain__label}>
            <label htmlFor='password' className={styles.labelcontain__label}>
              Password
              <input
                name='password'
                type='password'
                placeholder='Password'
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
            <label htmlFor='reppassword' className={styles.labelcontain__label}>
              Repeat Password
              <input
                name='reppassword'
                type='password'
                placeholder='Repeat Password'
                className={styles.labelcontain__input}
                {...register('reppassword', {
                  required: true,
                })}
              />
              {matchPassword && <p className={styles.labelcontain__error}>{matchPassword}</p>}
            </label>
          </div>
          <div className={styles.labelcontain__label}>
            <label htmlFor='checkbox' className={styles.labelcontain__label}>
              <input
                name='checkbox'
                type='checkbox'
                className={styles.labelcontain__check}
                {...register('checkbox', {
                  required: 'You must agree to the terms',
                })}
              />
              <span className={styles.labelcontain__info}>
                I agree to the processing of my personal information
              </span>
              {errors.checkbox && (
                <p className={styles.labelcontain__error}>{errors.checkbox.message}</p>
              )}
            </label>
          </div>
          <input type='submit' value='Create' className={styles.labelcontain__submitbtn} />
        </form>
        <p className={styles.content__footer}>
          Already have an account?
          <Link to={'/sign-in'} className={styles.content__link}>
            Sign In &#128272;
          </Link>
        </p>
      </div>
    </div>
  )
}

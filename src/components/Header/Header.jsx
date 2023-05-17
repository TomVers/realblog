import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { logout } from '../../store/authenticationSlice'

import styles from './Header.module.scss'

export const Header = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector((state) => state.authenticationSlice.data)
  const myName = JSON.parse(localStorage.getItem('data'))
  const imageUrl = JSON.parse(localStorage.getItem('profileImage'))
  const exit = useNavigate()

  const handleLogOut = () => {
    if (window.confirm('Do you want to log out of your profile?')) {
      dispatch(logout())
      localStorage.clear()
      exit('/')
    }
  }
  return (
    <header className={styles.header}>
      <Link to={'/articles'} className={styles.name}>
        Realworld Blog
      </Link>
      {isAuth ? (
        <>
          <div className={`${styles.header__btn} ${styles.createbtn}`}>Create article</div>
          <Link to={'/profile'} className={styles.header__author}>
            <div>{myName.user.username}</div>
            <img
              className={styles.header__author_image}
              src={
                imageUrl
                  ? myName.user.image
                  : 'https://static.productionready.io/images/smiley-cyrus.jpg'
              }
            />
          </Link>
          <button className={`${styles.header__btn} ${styles.logoutbtn}`} onClick={handleLogOut}>
            Log Out
          </button>
        </>
      ) : (
        <>
          <Link to={'/sign-in'} className={`${styles.header__btn} ${styles.signinbtn}`}>
            Sign In
          </Link>
          <Link to={'/sign-up'} className={`${styles.header__btn} ${styles.signupbtn}`}>
            Sign Up
          </Link>
        </>
      )}
    </header>
  )
}

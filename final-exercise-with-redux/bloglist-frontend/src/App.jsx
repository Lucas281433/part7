import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Link, useMatch } from 'react-router-dom'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'

import blogService from './services/blogs'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser, loginUser } from './reducers/userReducer'
import {
  Button,
  Col,
  Container,
  Nav,
  Navbar,
  Row,
  Stack,
} from 'react-bootstrap'
import loginImg from './assets/login.png'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)
  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find((b) => b.id === match.params.id) : null

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()

    dispatch(loginUser(username, password))
    setUsername('')
    setPassword('')
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogListAppUser')
    dispatch(setUser(null))
  }

  if (user === null) {
    return (
      <Stack gap={2} className="col-md-3 mx-auto">
        <img style={{ width:'70%', height: '70%' }} src={loginImg} alt="" />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
      </Stack>
    )
  }

  const noneStyle = {
    textDecoration: 'none',
  }

  return (
    <div>
      <Navbar
        expand="sm"
        data-bs-theme="light"
        style={{ backgroundColor: '#8ac926' }}
      >
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" as={'span'}>
                <Link style={noneStyle} to={'/'}>
                  Blogs
                </Link>
              </Nav.Link>
              <Nav.Link href="#" as={'span'}>
                <Link style={noneStyle} to={'/users'}>
                  Users
                </Link>
              </Nav.Link>
              <Nav.Link href="#" as={'span'}>
                {user.name} Logged In{' '}
                <Button variant="outline-dark" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <h2 className='h1'>Blog App</h2>
        <Notification />

        <Routes>
          <Route path="/users/:id" element={<User />} />
          <Route path="/users" element={<Users />} />
          <Route path="/blogs/:id" element={<Blog blog={blog} />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Container>
    </div>
  )
}

export default App

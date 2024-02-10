import { useState, useEffect, useRef } from 'react'
import { useNotificationDispatch } from './NotificationContext'
import { useUserValue, useUserDispatch } from './UserContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const user = useUserValue()
  const dispatchUser = useUserDispatch()
  const dispatchNotification = useNotificationDispatch()
  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatchUser({ type: 'SET_USER', payload: user })
      blogService.setToken(user.token)
    }
  }, [dispatchUser])

  const queryClient = useQueryClient()

  const addBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      const blogWithUser = {
        ...newBlog,
        user: {
          username: user.username,
          name: user.name,
          id: user.id,
        },
      }
      queryClient.setQueryData(['blogs'], blogs.concat(blogWithUser))
    },
  })

  const addLikeMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (blog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      const updatedBlog = blogs.map((b) =>
        b.id === blog.id ? { ...b, likes: b.likes + 1 } : b,
      )
      queryClient.setQueryData(['blogs'], updatedBlog)
    },
  })

  const removeBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onMutate: async (id) => {
      const blogs = queryClient.getQueryData(['blogs'])
      const updatedBlogs = blogs.filter((b) => b.id !== id)
      queryClient.setQueryData(['blogs'], updatedBlogs)
      return blogs
    },
    onSuccess: (id) => {
      const blogs = queryClient.getQueryData(['blogs'])
      const updatedBlogs = blogs.filter((b) => b.id !== id)
      queryClient.setQueryData(['blogs'], updatedBlogs)
    },
    onError: () => {
      queryClient.setQueryData(['blogs'], blogs)
    },
  })

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
  })

  if (result.isLoading) {
    return <div>Loading Data...</div>
  }

  const blogs = result.data

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogListAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatchUser({ type: 'SET_USER', payload: user })
      setUsername('')
      setPassword('')
    } catch (error) {
      dispatchNotification({
        type: 'SHOW_NOTIFICATION',
        payload: 'Wrong Username or Password',
      })
      setTimeout(() => {
        dispatchNotification({ type: 'HIDE_NOTIFICATION' })
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogListAppUser')
    dispatchUser({ type: 'SET_USER', payload: null })
  }

  const addBlog = async (newBlog) => {
    try {
      addBlogMutation.mutate(newBlog)
      blogFormRef.current.toggleVisibility()

      dispatchNotification({
        type: 'SHOW_NOTIFICATION',
        payload: `A new blog ${newBlog.title} By ${newBlog.author}`,
      })
      setTimeout(() => {
        dispatchNotification({ type: 'HIDE_NOTIFICATION' })
      }, 5000)
    } catch (error) {
      dispatchNotification({
        type: 'SHOW_NOTIFICATION',
        payload: 'Error could not create blog',
      })
      setTimeout(() => {
        dispatchNotification({ type: 'HIDE_NOTIFICATION' })
      }, 5000)
    }
  }

  const addLike = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    addLikeMutation.mutate(updatedBlog)
  }

  const removeBlog = async (id) => {
    const blogToDelete = blogs.find((blog) => blog.id === id)
    if (
      window.confirm(
        `Remove Blog ${blogToDelete.title} By ${blogToDelete.author}`,
      )
    ) {
      removeBlogMutation.mutate(id)
    }
  }

  const blogsSorted = [...blogs].sort((a, b) => b.likes - a.likes)

  if (user === null) {
    return (
      <LoginForm
        handleLogin={handleLogin}
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
      />
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <p>
        {user.name} Logged In <button onClick={handleLogout}>Logout</button>
      </p>
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm newBlog={addBlog} />
      </Togglable>
      {blogsSorted.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          addLike={addLike}
          removeBlog={removeBlog}
        />
      ))}
    </div>
  )
}

export default App

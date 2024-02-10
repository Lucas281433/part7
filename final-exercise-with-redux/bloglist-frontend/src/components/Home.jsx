import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { Badge, ListGroup } from 'react-bootstrap'
import blogImg from '../assets/blog-writing.png'

const Home = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const blogFormRef = useRef()

  const addBlog = async (newBlog) => {
    try {
      dispatch(createBlog(newBlog))
      blogFormRef.current.toggleVisibility()

      dispatch(
        setNotification(`A new blog ${newBlog.title} By ${newBlog.author}`, 5),
      )
    } catch (error) {
      dispatch(setNotification('Error could not create blog', 5))
    }
  }

  const blogsSorted = [...blogs].sort((a, b) => b.likes - a.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div>
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <img style={{ width: '70%', height: '70%' }} src={blogImg} alt="" />
        <BlogForm newBlog={addBlog} />
      </Togglable>
      <ListGroup as="ol" numbered style={{ border: '3px solid #8ac926' }}>
        {blogsSorted.map((blog) => (
          <ListGroup.Item
            key={blog.id}
            as="li"
            className="d-flex justify-content-between align-items-start"
            style={{ border: '3px solid #8ac926' }}
          >
            <div className="ms-2 me-auto">
              <Link to={`/blogs/${blog.id}`}>
                <div className="fw-bold">{blog.title}</div>
              </Link>
              {blog.author}
            </div>
            <Badge bg="primary" pill>
              {blog.likes}
            </Badge>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default Home

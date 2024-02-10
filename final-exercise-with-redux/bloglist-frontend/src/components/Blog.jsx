import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addComment, giveLike, removeBlog } from '../reducers/blogReducer'
import { Button, Form, ListGroup } from 'react-bootstrap'
import blogImg from '../assets/blog-writing.png'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)
  const [comment, setComment] = useState('')
  const navigate = useNavigate()

  if (!blog) {
    return null
  }

  const handleaddLike = async (blog) => {
    dispatch(giveLike(blog))
  }

  const handleRemoveBlog = async (id) => {
    const blogToDelete = blogs.find((blog) => blog.id === id)
    if (
      window.confirm(
        `Remove Blog ${blogToDelete.title} By ${blogToDelete.author}`,
      )
    ) {
      dispatch(removeBlog(id))
      navigate('/')
    }
  }

  const handleAddComment = (event) => {
    event.preventDefault()
    setComment(event.target.value)
    dispatch(addComment(blog, { comment: comment }))
    setComment('')
  }

  return (
    <div className="blog">
      <h2 className="h2">
        {blog.title} {blog.author}
      </h2>
      <p>
        <a /*href={`${blog.url}`} target="_blank"*/>{blog.url}</a>
      </p>
      <p>
        {blog.likes} Likes{' '}
        <Button
          style={{ backgroundColor: '#8ac926', color: '#011638' }}
          onClick={() => handleaddLike(blog)}
          className="likeButton"
        >
          Like
        </Button>
      </p>
      <p>Added by {blog.user ? blog.user.name : null}</p>
      {blog.user && blog.user.name === user.name ? (
        <Button
          style={{ backgroundColor: '#8ac926', color: '#011638' }}
          onClick={() => handleRemoveBlog(blog.id)}
        >
          Remove
        </Button>
      ) : null}
      <h3 className="h3">Comments</h3>
      <Form onSubmit={handleAddComment}>
        <input
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />{' '}
        <Button
          style={{ backgroundColor: '#8ac926', color: '#011638' }}
          type="submit"
        >
          Add Comment
        </Button>
      </Form>
      <img style={{ width: '75%', height: '75%' }} src={blogImg} alt="" />
      <ListGroup style={{ border: '3px solid #8ac926' }}>
        {blog.comments.map((comment, index) => (
          <ListGroup.Item style={{ border: '3px solid #8ac926' }} key={index}>
            {comment}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default Blog

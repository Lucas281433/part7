import { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'

const BlogForm = ({ newBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    newBlog({
      title,
      author,
      url,
    })
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
  }

  return (
    <div>
      <Form onSubmit={addBlog}>
        <h2>Create a new Blog </h2>
        <Form.Group>
          <Form.Control
            type="text"
            name="title"
            onChange={({ target }) => setTitle(target.value)}
            id='title'
            placeholder='Title:'
            size='sm'
            style={{
              maxWidth: '300px',
              border: '1px solid #333',
              borderRadius: '5px',
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
            id='author'
            placeholder='Author:'
            size='sm'
            style={{
              maxWidth: '300px',
              border: '1px solid #333',
              borderRadius: '5px',
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            name="url"
            onChange={({ target }) => setUrl(target.value)}
            id='url'
            placeholder='Url:'
            size='sm'style={{
              maxWidth: '300px',
              border: '1px solid #333',
              borderRadius: '5px',
            }}
          />
        </Form.Group>
        <Button style={{ backgroundColor: '#8ac926', color: '#011638' }} type="submit" className='createButton'>Create</Button>
      </Form>
    </div>
  )
}

export default BlogForm

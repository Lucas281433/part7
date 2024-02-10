import { Container, ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import userImg from '../assets/user.png'

const User = () => {
  const users = useSelector((state) => state.users)
  const id = useParams().id
  const user = users.find((user) => user.id === id)

  if (!user) {
    return null
  }

  return (
    <Container>
      <h2 className='h2'>{user.name}</h2>
      <img style={{ width:'70%', height: '70%' }} src={userImg} alt="" />
      <h3 className='h3'>Added Blogs</h3>
      <ListGroup style={{ border: '3px solid #8ac926' }}>
        {user.blogs.map((blog) => (
          <ListGroup.Item style={{
            border: '3px solid #8ac926',
          }} key={blog.id}>{blog.title}</ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  )
}

export default User

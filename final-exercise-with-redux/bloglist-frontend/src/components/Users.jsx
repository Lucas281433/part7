import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initialzeUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'
import { Container, Table } from 'react-bootstrap'
import usersImg from '../assets/users.png'

const Users = () => {
  const users = useSelector((state) => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialzeUsers())
  })

  return (
    <Container>
      <img style={{ width: '70%', height: '70%' }} src={usersImg} alt="" />
      <h2 className='h2'>Users</h2>
      <Table style={{ border: '3px solid #8ac926' }}>
        <thead>
          <tr>
            <th style={{ border: '3px solid #8ac926' }}></th>
            <th style={{ border: '3px solid #8ac926' }}>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td style={{ border: '3px solid #8ac926' }}><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td style={{ border: '3px solid #8ac926' }}>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default Users

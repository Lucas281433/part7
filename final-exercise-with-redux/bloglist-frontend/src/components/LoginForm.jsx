import { Button, Container, Form } from 'react-bootstrap'
import Notification from './Notification'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
}) => {
  return (
    <Container>
      <h2>Log in to Application</h2>
      <Notification />
      <Form onSubmit={handleLogin}>
        <Form.Group>
          Username:
          <Form.Control
            type="text"
            name="username"
            onChange={handleUsernameChange}
            id='username'
            size='sm'
            style={{
              maxWidth: '300px',
              border: '1px solid #333',
              borderRadius: '5px',
            }}
          />
        </Form.Group>
        <Form.Group>
          Password:
          <Form.Control
            type="password"
            name="password"
            onChange={handlePasswordChange}
            id='password'
            size='sm'
            style={{
              maxWidth: '300px',
              border: '1px solid #333',
              borderRadius: '5px',
            }}
          />
        </Form.Group>
        <Button style={{ backgroundColor: '#8ac926', color: '#011638' }} type="submit">Login</Button>
      </Form>
    </Container>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired
}

export default LoginForm

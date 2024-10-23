import "./Login.css";
import Form from "react-bootstrap/Form";
import { useRef } from "react";
import { verifyUser } from '../../data/users';

function Login( { setToken,setRole }) {
  const usernameRef = useRef();
  const passwordRef = useRef();

  return (
    <div className="Login-container">
      <Form.Label htmlFor="username">Username</Form.Label>
      <Form.Control
        type="text"
        id="username"
        aria-describedby="usernameHelpBlock"
        placeholder="User"
        style={{ textAlign: "center" }}
        ref={usernameRef}  // Link the username input to the ref
      />
      <Form.Label htmlFor="password">Password</Form.Label>
      <Form.Control
        type="password"
        id="password"
        aria-describedby="passwordHelpBlock"
        placeholder="password"
        style={{ textAlign: "center" }}
        ref={passwordRef}  // Link the password input to the ref
      />
      <button 
        className="btn btn-success mt-3" 
        onClick={() => {
          const username = usernameRef.current.value.trim(); // Get the value from the ref
          const password = passwordRef.current.value.trim(); // Get the value from the ref
          const userInfo = verifyUser(username, password)
          usernameRef.current.value = ''
          passwordRef.current.value = ''
          if (userInfo === null){
            alert('Wrong username or password')
            usernameRef.current.focus()
            passwordRef.current.focus()
          } else {
            setToken(userInfo.token)
            setRole(userInfo.role)
          }
          
          verifyUser(username, password)  // Call the function correctly
            .then(token => {
              setToken(token);  // Assuming setToken stores the token
            })
            .catch(err => {
              console.error('Failed to verify user:', err);
            });
        }}
      >
        Login
      </button>
    </div>
  );
}

export default Login;

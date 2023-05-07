import './login.css';

function Login({ users }) {
  const handleLogin = (event) => {
    event.preventDefault();
    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
      alert("logged in succesfully!")
    } else {
      alert("Wrong username or password")
    }
  };

  return (
    <>
      <img id="logo" src="logo.png" alt="logo"></img>
      <form onSubmit={handleLogin}>
        <div className="card text-center border-dark" id="login">
          <div className="card-header">
            <h5>Login</h5>
          </div>
          <div className="card-body">
            <div>
              <h5 className="card-title">Username: <input type="text" name="username" /></h5>
            </div>
            <h5 className="card-text">Password: <input type="password" name="password" /></h5>
            <button type="submit" className="btn custom-btn">Log-in</button>
          </div>
          <div className="card-footer text-body-secondary">
            <span>
              Not registered?
              <a href="./register"> Click here </a>
              to register
            </span>
          </div>
        </div>
      </form>
    </>
  );
}

export default Login;
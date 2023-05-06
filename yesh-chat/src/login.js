import './login.css';

function Login() {
  return (
    <>
      <img id="logo" src="logo.png" alt="logo"></img>
      <form action="a.php" method="get">
        <div className="card text-center border-dark" id="login">
          <div className="card-header">
            <h5>Login</h5>
          </div>
          <div className="card-body">
            <div>
              <h5 className="card-title">Username: <input></input></h5>
            </div>
            <h5 className="card-text">Password: <input></input></h5>
            <a href="#" id="foo" className="btn custom-btn">Log-in</a>
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
import './login.css';

function Reg() {
    return (
        <>
            <img id="logo" src="logo.png" alt="logo"></img>
            <form action="./" method="get">
                <div class="card border-dark" id="login">
                    <div class="card-header text-center">
                        <h5>register</h5>
                    </div>
                    <div class="card-body" id="reg-card-body">
                        <div id="content">
                            <h5 class="card-title">Username: <input type="text" name="username" required></input></h5>
                            <h5 class="card-text">Password: <input type="password" name="password" required></input></h5>
                            <h5 class="card-text">Confirm password: <input type="password" name="confirmPassword" required></input></h5>
                            <h5 class="card-text">Display name: <input type="text" name="displayName" required></input></h5>
                            <h5 class="card-text">Picture: <input type="file" name="picture" id="upload_imj" required></input></h5>
                            <button type="submit" id="register" class="btn custom-btn">Register</button>
                        </div>
                        <div class="card-footer text-center text-body-secondary">
                            <span>
                                Already registered?
                                <a href="./"> Click here </a>
                                to login
                            </span>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}

export default Reg;

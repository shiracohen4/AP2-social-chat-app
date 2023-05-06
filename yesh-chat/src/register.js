import './login.css';

function Reg() {
    return (
        <>
            <img id="logo" src="logo.png" alt="logo"></img>
            <form action="a.php" method="get">
                <div class="card border-dark" id="login">
                    <div class="card-header text-center">
                        <h5>register</h5>
                    </div>
                    <div class="card-body" id="reg-card-body">
                        <div id="content">
                            <h5 class="card-title">Username: <input></input></h5>
                            <h5 class="card-text">Password: <input></input></h5>
                            <h5 class="card-text">Confirm password: <input></input></h5>
                            <h5 class="card-text">Display name: <input></input></h5>
                            <h5 class="card-text">Picture: <input type="file" id="upload_imj"></input></h5>
                            <a href="./" id="register" class="btn custom-btn">Register</a>
                        </div>
                        <div class="card-footer text-center text-body-secondary">
                            <span>
                                Already registered?
                                <a href="./">Click here</a>
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

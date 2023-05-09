import './login.css';
import React, {useState} from 'react';

function Reg({ handleReg }) {

    const [formData, setFormData] = useState({ username: '', password: '' });

    const validateForm = event => {
        event.preventDefault()
        var pswd = document.getElementById("password").value
        var confirmPassword = document.getElementById("confirmPassword").value
        if (pswd !== confirmPassword) {
            var spanError = document.getElementById("span-error")
            if (spanError) {
                spanError.remove()
            }
            var valPassword1 = document.getElementById("valPassword")
            var valPassword2 = document.createElement('div')
            valPassword2.innerHTML = '<h5 className="card-text topmargin" id="valPassword">Confirm password: <input type="password" id="confirmPassword" name="confirmPassword" pattern="[a-zA-Z0-9]{5,}" title="Please enter at least 5 alphanumeric characters." required></input></h5> <span id="span-error"><h6 className="input-error">Passwords do not match!</h6></span>'
            valPassword1.replaceWith(valPassword2)
            var passwordInput = document.getElementById("password")
            passwordInput.value = ""
        }
        else {
            handleReg(formData);
            console.log(formData);
            setFormData({ username: '', password: '' });
            var valpswd = document.getElementById('confirmPassword');
            valpswd.value = "";
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePictureInput = e => {
        const img = e.target.files[0];
        // setPicture(img);
        // console.log(picture);
        const reader = new FileReader();
        reader.onload = () => {
            const preview = document.getElementById('preview');
            preview.src = reader.result;
            preview.style.display = "block"
        };
        reader.readAsDataURL(img);
    };

    return (
        <>
            <img id="logo" src="logo.png" alt="logo"></img>
            <form action="./" method="get" onSubmit={validateForm}>
                {/* will be changed to post later on */}
                <div className="card border-dark" id="login">
                    <div className="card-header text-center">
                        <h5>register</h5>
                    </div>
                    <div className="card-body" id="reg-card-body">
                        <div id="content">
                            <h5 className="card-text topmargin">Username: <input type="text" name="username" pattern="[a-zA-Z0-9_]{3,}" required value={formData.username} onChange={handleChange}></input></h5>
                            <span className="input-description">Please enter at least 3 (a-z/A-Z/0-9/_) characters</span>
                            <h5 className="card-text topmargin">Password: <input type="password" id="password" name="password" pattern="[a-zA-Z0-9]{5,}" required value={formData.password} onChange={handleChange}></input></h5>
                            <span className="input-description">Please enter at least 5 (a-z/A-Z/0-9) characters</span>
                            <h5 className="card-text topmargin" id="valPassword">Confirm password: <input type="password" id="confirmPassword" name="confirmPassword" pattern="[a-zA-Z0-9]{5,}" title="Please enter at least 5 alphanumeric characters." required></input></h5>
                            <h5 className="card-text topmargin">Display name: <input type="text" name="displayName" required></input></h5> {/*onChange={handleDisplayNameInput} value={displayName}*/}
                            <h5 className="card-text topmargin">Picture: <input type="file" accept="image/*" name="picture" id="upload_imj" onChange={handlePictureInput} required></input></h5> {/*value={picture}*/}
                            <img id="preview" src="#" alt="preview"></img>
                            <button type="submit" id="register" className="btn custom-btn topmargin">Register</button>
                        </div>
                        <div className="card-footer text-center text-body-secondary">
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

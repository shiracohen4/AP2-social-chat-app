import '../styles/chats.css';
import CardHeader from './CardHeader';
import CardBody from './CardBody';

export const Chats = ({ user }) => {
    return (
        <>
            <img id="logo" src="logo.png" alt="logo"></img>
            <button type="button" className="btn btn-danger" id="logout">Logout</button>
            <div className="card text-center border-dark" id="chatlistCard">
                <CardHeader user={user} />
                <CardBody />
            </div>
            <div className="card text-center border-dark" id="chatcontent">
                <div className="card-header">
                    <img className="contact" src="chica.jpg" alt="chica"></img>
                    <h5 className="contactnameh">Chica</h5>
                </div>
                <div className="card-body">
                    <div className="chat">
                        <div className="mine messages">
                            <div className="message last">
                                Dude whatssssssssup
                                <div className="msgTime mine">15:24</div>
                            </div>
                        </div>
                        <div className="yours messages">
                            <div className="message">
                                Hey!
                            </div>
                            <div className="message">
                                You there?
                            </div>
                            <div className="message last">
                                Hello, how's it going?
                                <div className="msgTime yours">15:27</div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="card-footer text-body-secondary">
                    <input className="form-control" placeholder="New message here..." id="message"></input>
                    <button type="button" className="btn btn-secondary" id="sendbutton">Send</button>
                </div>
            </div>
            <br />
            <br />
        </>
    );
}

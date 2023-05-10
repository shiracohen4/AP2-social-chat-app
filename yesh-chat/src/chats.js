import './chats.css';

function Chats() {
    return (
        <>
            <img id="logo" src="YESH-CHATcropped.png" alt="logo"></img>
            <button type="button" className="btn btn-danger" id="logout">Logout</button>
            <div className="card text-center border-dark" id="chatlistCard">
                <div className="card-header" id="contactheader">
                    <img className="contact" src="bella.jpg" alt="bella"></img>
                    <h5 className="contactnameh">Bella</h5>
                    <button id="addcontact" className="btn custom-btn" data-bs-toggle="modal" data-bs-target="#newContactModal"
                        z-index="1">
                        <i className="bi bi-person-plus"></i>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                            className="bi bi-person-plus" viewBox="0 0 16 16">
                            <path
                                d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                            <path fill-rule="evenodd"
                                d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                        </svg>
                    </button>
                </div>
                <div className="card-body">
                    <ul id="chatList">
                        <li className="contactList">
                            <img className="contact" src="chica.jpg" alt ="chica"></img>
                            <h5 className="contactnameb">Chica</h5>
                            <div className="lastMsg">woof-woof</div>
                            <h10 className="date">3/31/2023, 15:24</h10>
                        </li>
                        <li className="contactList">
                            <img className="contact" src="lichy.jpg" alt="lichy"></img>
                            <h5 className="contactnameb">Lichy</h5>
                            <div className="lastMsg">waf-waf</div>
                            <h10 className="date">3/31/2023, 15:21</h10>
                        </li>
                    </ul>
                </div>
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
            <div className="modal fade" id="newContactModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add new contact</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">

                                    <input type="text" className="form-control" id="recipient-name"
                                        placeholder="Contact's identifier"></input>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary">Add</button>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <br />
        </>
    );
}

export default Chats;

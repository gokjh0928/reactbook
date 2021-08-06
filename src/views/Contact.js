import React from 'react'
import emailjs from 'emailjs-com';

export const Contact = () => {
    //const [status, setStatus] = useState("Submit")
    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE_ID, e.target, process.env.REACT_APP_EMAILJS_USER_ID)
            .then((result) => {
                alert('Sent successfully');
            }, (error) => {
                alert('Error in sending message!');
            });
    }
    return (
        <React.Fragment>
            <h3>
                Contact Me!
            </h3>
            <hr />
            <div className="row">
                <div className="col-md-6">
                    <form className="contact-form" onSubmit={(e) => sendEmail(e)}>
                        <div className="form-group">
                            <label for="name">Name</label>
                            <input type="text" name='name' className="form-control" placeholder="Your Name" />
                        </div>
                        <div className="form-group">
                            <label for="exampleFormControlInput1">Email address</label>
                            <input type="email" name='email' className="form-control" placeholder="name@example.com" />
                        </div>
                        <div className="form-group">
                            <label for="message">Message Me!</label>
                            <textarea className="form-control" name='message' rows="5"></textarea>
                        </div>
                        <input type="submit" className="btn btn-info btn-block" value="Submit" />
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}


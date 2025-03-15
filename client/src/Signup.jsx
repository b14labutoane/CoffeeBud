import {useState} from "react";

function Signup(){
    
    return (
        <div className = "d-flex justify-conent-center align-items-center bg-secondary vh-100">
            <div className = "bg-white p-3 rounded w-25">
                <h2>Register</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Name</strong></label>
                        <input type="text" placeholder="Enter Name" autoComplete="off" name="email" className="form-control rounded-0"></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Enter Email</strong></label>
                        <input type="text" placeholder="Enter Name" autoComplete="off" name="email" className="form-control rounded-0"></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Password</strong></label>
                        <input type="password" placeholder="Enter Password" autoComplete="off" name="password" className="form-control rounded-0"></input>
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">Register</button>
                    </form>
                    <p>Already Have an Account</p>
                    <Link className="btn btn-default border w-100 bg-light rounded-0">
                        Login
                    </Link>
            </div>
        </div>
    );
}

export default Signup;
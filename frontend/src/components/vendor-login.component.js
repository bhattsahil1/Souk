import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import './global';

export default class VendorLogin extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    
    onChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }


    async retrievePassword() {

        const response = await axios.get('http://localhost:4000/vpwdcheck/'+this.state.username);
        console.log(response.data);
        if(Object.keys(response.data).length === 0)
        {
            window.alert("Vendor not found");
        }
        else if(this.state.password == response.data[0].password)
        {
                console.log(global.user);
                global.user = this.state.username;
                console.log(global.user);
                localStorage.setItem("vname", global.user );
                window.open('http://localhost:3000/listproduct',"_self");
        }
        else
        {
            window.alert("You've entered the wrong password or username");
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const newVendor = {
            username: this.state.username,
            password: this.state.password
        }

        this.retrievePassword();
        
    }

    render() {
        return (
            
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.username}
                               onChange={this.onChangeUsername}
                               />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password" 
                               className="form-control" 
                               value={this.state.password}
                               onChange={this.onChangePassword}
                               />  
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary"/>
                    </div>
                    <div className="form-group">
                        <Link to="/createvendor" className="nav-link">Don't have an account ? Register</Link>
                    </div>
                </form>
            </div>
        )
    }
}
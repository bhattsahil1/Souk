import React, {Component} from 'react';
import axios from 'axios';
import { Table, Button, Alert } from 'react-bootstrap';
import './global';

export default class ListeditemList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            reviews: [],
            tempvar:localStorage.getItem("vname")
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/getproducts/'+this.state.tempvar)
             .then(response => {
                 this.setState({products: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
        // global.user = Request.QueryString["myvar"];
        console.log(global.user);
        // this.setState({tempvar:global.user});
        axios.get('http://localhost:4000/getreviews/'+localStorage.getItem("vname"))
        .then(response => {
            this.setState({reviews: response.data});
            console.log(this.state.reviews);
        })
        .catch(function(error) {
            console.log(error);
        })
    }

    getBack()
    {
        localStorage.setItem("vname", "Not Logged In");
        window.alert("You've been logged out");
        window.open("http://localhost:3000/","_self");
    }


  cancelProduct(productname) {

    const CancelPkg = 
    {
        sellername : this.state.tempvar,
        productname : productname
    }
    axios.post('http://localhost:4000/cancelproduct',CancelPkg)
             .then(res => console.log(res.data));

    axios.get('http://localhost:4000/getproducts/'+this.state.tempvar)
    .then(response => {
        this.setState({products: response.data});
    })
    .catch(function(error) {
        console.log(error);
    })
  }

    render() {
        return (
            <div>
                <p>Logged In as: {this.state.tempvar}</p>
                &nbsp;<Button variant="danger" onClick={() => this.getBack()}>Logout</Button>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Product</th>
                            <th>Minimum Quantity</th>
                            <th>Price</th>
                            <th>Dispatch status</th>
                            <th>Quantity ordered so far</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.products.map((response, i) => {
                            return (
                                <tr>
                                    <td><img src={require(`${response.pimage}`)} width="100" height="70"></img></td>
                                    <td>{response.productname}</td>
                                    <td>{response.minimum_quantity}</td>
                                    <td>{response.price}</td>
                                    <td>{response.dispatch_status}</td>
                                    <td>{response.ordered_so_far}</td>
                                    <td>
                                    <Button variant="danger" onClick={() => this.cancelProduct(response.productname)}>Cancel</Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>
                <Button variant="warning" onClick={() => window.open("http://localhost:3000/listme","_self")}>List a new item </Button>
                &nbsp;<Button variant="danger" onClick={() => window.open("http://localhost:3000/ready","_self")}>View Ready to Dispatch items</Button>
                <Button variant="success" onClick={() => window.open("http://localhost:3000/dispatchrender","_self")}>View Dispatched Items</Button>
                <br></br>
                <br></br>
                <p>Vendor Reviews</p>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Buyer</th>
                            <th>Review</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.reviews.map((response, i) => {
                            return (
                                <tr>
                                    <td>{response.buyername}</td>
                                    <td>{response.review}</td>
                                    <td>{response.rating}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>
            </div>
        )
    }
}
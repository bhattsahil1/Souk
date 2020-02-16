import React, {Component} from 'react';
import axios from 'axios';
import { Table, Button, Alert } from 'react-bootstrap';
import './global';

export default class ListeditemList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            tempvar:sessionStorage.getItem("uname")
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/getproducts')
             .then(response => {
                 this.setState({products: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
        // global.user = Request.QueryString["myvar"];
        console.log(global.user);
        // this.setState({tempvar:global.user});
    }


  cancelProduct(productname) {

    axios.post('http://localhost:4000/cancelproduct/'+productname)
             .then(res => console.log(res.data));

    axios.get('http://localhost:4000/getproducts')
    .then(response => {
        this.setState({products: response.data});
    })
    .catch(function(error) {
        console.log(error);
    })
  }

  dispatchProduct(productname) {

    axios.post('http://localhost:4000/dispatchproduct/'+productname)
             .then(res => console.log(res.data));

    axios.get('http://localhost:4000/getproducts')
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
                {/* <p value={this.state.something}
                 onChange={event => {this.setState({'something': event.target.value})}}/> */}
                {/* <table className="table table-striped "> */}
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Minimum Quantity</th>
                            <th>Price</th>
                            <th>Dispatch status</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.products.map((response, i) => {
                            return (
                                <tr>
                                    <td>{response.productname}</td>
                                    <td>{response.minimum_quantity}</td>
                                    <td>{response.price}</td>
                                    <td>{response.dispatch_status}</td>
                                    <td>
                                    <Button variant="success" onClick={() => this.dispatchProduct(response.productname)}>Dispatch</Button>
                                    &nbsp;<Button variant="danger" onClick={() => this.cancelProduct(response.productname)}>Cancel</Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                {/* </table> */}
                </Table>
            </div>
            
        )
    }
}
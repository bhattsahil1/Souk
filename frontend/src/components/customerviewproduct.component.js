import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import './global';
import { ListGroup, ListGroupItem, Card, Table, Button ,Dropdown} from 'react-bootstrap';
// import React, { Component } from 'react';
export default class ViewItem extends React.Component {
    state = {
      query: "",
      data: [],
      filteredData: []
    };
  
    handleInputChange = event => {
      const query = event.target.value;
  
      this.setState(prevState => {
        const filteredData = prevState.data.filter(element => {
          return element.productname.toLowerCase().includes(query.toLowerCase());
        });
  
        return {
          query,
          filteredData
        };
      });
    };

    getBack()
    {
        localStorage.setItem("cname", "Not Logged In");
        window.alert("You've been logged out");
        window.open("http://localhost:3000/","_self");
    }

    viewProduct(productname,sellername)
    {
      window.location.href = "http://localhost:3000/custchooseproduct?pro="+productname+"&sell="+sellername;
    }
  
    getData = () => {
      axios.get(`http://localhost:4000/getproductlist`)
        .then(response => response.data)
        .then(data => {
          const { query } = this.state;
          const filteredData = data.filter(element => {
            return element.productname.toLowerCase().includes(query.toLowerCase());
          });
  
          this.setState({
            data,
            filteredData
          });
        });
    };

    comparePrice(a, b) {
      const priceA = parseInt(a.price);
      const priceB = parseInt(b.price);
    
      let comparison = 0;
      if (priceA > priceB) {
        comparison = 1;
      } else if (priceA < priceB) {
        comparison = -1;
      }
      return comparison;
    }

    sortPrice(){
      var ok = this.state.filteredData.sort(this.comparePrice);
      this.setState({filteredData : ok});
    }


    compareQty(a, b) {
      const priceA = parseInt(a.minimum_quantity - a.ordered_so_far);
      const priceB = parseInt(b.minimum_quantity - b.ordered_so_far);
    
      let comparison = 0;
      if (priceA > priceB) {
        comparison = 1;
      } else if (priceA < priceB) {
        comparison = -1;
      }
      return comparison;
    }

    sortQty(){
      var ok = this.state.filteredData.sort(this.compareQty);
      this.setState({filteredData : ok});
    }


    componentWillMount() {
      this.getData();
    }
  
    render() {
      return (
        <div className="searchForm">
            <p>Logged In as: {localStorage.getItem("cname")}</p>
            <Button variant="danger" onClick={() => this.getBack()}>Logout</Button>
            <br></br>
            <br></br>
          <form>
            <input
              placeholder="Search for..."
              value={this.state.query}
              onChange={this.handleInputChange}
            />
          </form>
            <br></br>
            <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Sort Results by
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => this.sortPrice()}>Price</Dropdown.Item>
              <Dropdown.Item onClick={() => this.sortQty()}>Quantity left</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <br></br>
          <div>
          <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Seller</th>
                            <th>Price</th>
                            <th>Sum of Ratings</th>
                            <th>Number of Buyers</th>
                            <th>Quantity Left</th>                       
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.filteredData.map((response, i) => {
                            return (
                                <tr>
                                    <td>{response.productname}</td>
                                    <td>{response.sellername}</td>
                                    <td>{response.price}</td>
                                    <td>{response.sum_of_ratings}</td>
                                    <td>{response.number_of_buyers}</td>
                                    <td>{response.minimum_quantity - response.ordered_so_far}</td>
                                    <Button variant="success" onClick={() => this.viewProduct(response.productname,response.sellername)}>See Product</Button>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>
                <Button variant="primary" onClick={() => window.open("http://localhost:3000/displaycart","_self")}>View Cart</Button>
        </div>
        </div>
      );
    }
}

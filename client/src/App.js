import React from 'react';
import {Route} from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom'
import './App.css';

class HomePage extends React.Component {
	
	constructor(props) {
        super(props);
        
        this.state = {
                referrer: null,
                componentToRender: null,
                listOfProducts: [],
                product_id: null
            };
    }
	
	 deleteProduct(id) {
		 fetch('/api/shopping-cart/delete-product-by-id/' + id, {
		      method: 'DELETE'
		    }).then(
		    		() => this.setState({listOfProducts: this.state.listOfProducts.filter((product) => product._id !== id)})
				    ,(error) => console.log(error));
	  }
	
	 componentDidMount() {
		 fetch('/api/shopping-cart/fetch-all-products/', {
		      method: 'GET'
		    }).then(response => response.json()).then(
		    		(jsonData) => this.setState({listOfProducts: jsonData})
                    ,(error) => console.log(error));
	  }
	 
	 handleAddProduct = (productName, productPrice, productQuantity) => {
		 var total = Number(productPrice)*Number(productQuantity);
		 fetch('/api/shopping-cart/save-product/', {
		      method: 'POST',
		      headers: {
			        'Content-Type': 'application/json',
			      },
		      body: JSON.stringify({ productName: productName, productPrice: productPrice, productQuantity: productQuantity, total: total})
		    }).then(response => response.json()).then((jsonData) =>  {
		    	if(!jsonData.updated)this.setState({listOfProducts: this.state.listOfProducts.concat([{ _id: jsonData._id, productName: jsonData.productName, productPrice: jsonData.productPrice, productQuantity: jsonData.productQuantity, total: jsonData.total }])})  
		    	
		    	else{
		    		var listOfProducts = this.state.listOfProducts.map((product, i) => {
	    				if(product.productName===productName){
	    					product.productQuantity = jsonData.productQuantity;
	    					product.productPrice = jsonData.productPrice;
	    					product.total = jsonData.total;
	    				}
	    				return product;
	    			})
	    			this.setState({listOfProducts: listOfProducts})
	    			
		    	}
		    } ,(error) => console.log(error));
	 }
	
	render(){
        
        var content;
        if(this.state.listOfProducts){
        	content = this.state.listOfProducts.map((product, i) => 
        	       (
        	    		  <tr key={product._id.toString()}>
        	    		   <td>{product.productName}</td>
        	    		   <td>{product.productPrice}</td>
        	    		   <td>{product.productQuantity}</td>
        	    		   <td>{product.total}</td>
        	    		   <td><button type="button" className="small" onClick={() => this.deleteProduct(product._id)}>&times;</button></td>
        	    		</tr>
        	      )
        	    );
        }
	  return (
	      <div className="container">
            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead className="thead-light">
                        <tr>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        { content }
                    </tbody>
                </table>
            <br/>
            </div>
            
            <BrowserRouter>
            <div>
             <Link to='/add-product/'>Add Product</Link>
  	        <Route exact path="/add-product/" render={(props) => <ProductForm {...props} handleAddProduct={this.handleAddProduct} />} />
  	        </div>
  	        </BrowserRouter>
            
	      </div>
	  );
	}
}

class ProductForm extends React.Component { 
	
	constructor() {
	    super();
	    this.state = {
	      productName: '',
	      price: 0,
	      quantity: 0,
	      readOnly: ''
	    };
	  }
	
	handleChange = evt => {
		this.setState({[evt.target.name]: evt.target.value});
		  
		  }
	
	checkIfProductExists = evt => {
		fetch('/api/shopping-cart/fetch-product-by-name/' + evt.target.value, {
		      method: 'GET'
		    }).then(response => response.json()).then(
		    		(jsonData) => {if(jsonData!=null) this.setState({price: jsonData.productPrice, readOnly: 'readOnly'})
		    		else {this.setState({readOnly: ''})}}
                  ,(error) => console.log(error));  
		  }
	
	 onKeyDown = (e) => {
	    const decimal_index = e.target.value.indexOf('.');
	    if(decimal_index > -1){
	        var decimals = e.target.value.substring(decimal_index, e.target.value.length+1);
	        if(decimals.length > 2 && (e.keyCode !== 8 && e.keyCode !== 9)){
	           e.preventDefault();
	        }
	        //this.props.onChange();
	    }}
	
	render() {
	const {productName, price, quantity} = this.state;
		return (
		
		<div className = "container">
        <div className="form-group">
        <label>Product Name:</label>
        <input type="text" className="form-control" onChange={this.handleChange} onBlur={this.checkIfProductExists} name = "productName"/>
      </div>
      
      <div className="form-group">
        <label>Price:</label>
        <input type="number" className="form-control" onChange={this.handleChange} name = "price" readOnly={this.state.readOnly} value={price} onKeyDown={this.onKeyDown}/>
      </div>
      
      <div className="form-group">
        <label>Quantity:</label>
        <input type="number" className="form-control" onChange={this.handleChange} name = "quantity" onKeyDown={this.onKeyDown}/>
      </div>
      
        <button type="submit" className="btn btn-primary" onClick={() => this.props.handleAddProduct(productName, price, quantity)}>Save Product</button>
      </div>

	)
	}
}
	
export default HomePage;

import React from "react";
import { Fragment } from "react/cjs/react.production.min";

import "./App.css";

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.seachInProducts = this.seachInProducts.bind(this);
    this.toggleInStock = this.toggleInStock.bind(this);
    this.filterProducts = this.filterProducts.bind(this);
    this.state = { inStocked: true, seachString: "" };
  }

  seachInProducts(e) {
    this.setState({ seachString: e.target.value });
  }

  toggleInStock() {
    this.setState({ inStocked: !this.state.inStocked });
  }

  filterProducts(products) {
    let filteredProducts=[]
    console.log(products)
    if (this.state.seachString === "") {
      [...filteredProducts] = products;
    } else {
      products.forEach((product) => {
        if (product.name.indexOf(this.state.seachString) > -1) {
          filteredProducts.push(product);
        }
      });
    }
    console.log(filteredProducts)
    return filteredProducts;
  }

  render() {
    const products = [
      {
        category: "Sporting Goods",
        price: "$49.99",
        stocked: true,
        name: "Football",
      },
      {
        category: "Sporting Goods",
        price: "$9.99",
        stocked: true,
        name: "Baseball",
      },
      {
        category: "Sporting Goods",
        price: "$29.99",
        stocked: false,
        name: "Basketball",
      },
      {
        category: "Electronics",
        price: "$99.99",
        stocked: true,
        name: "iPod Touch",
      },
      {
        category: "Electronics",
        price: "$399.99",
        stocked: false,
        name: "iPhone 5",
      },
      {
        category: "Electronics",
        price: "$199.99",
        stocked: true,
        name: "Nexus 7",
      },
    ];

    const set = new Set();
    products.forEach((item) => set.add(item.category));

    const category = Array.from(set);

    return (
      <div className="filterableProductTable">
        <SeachBar
          isChecked={this.toggleInStock}
          onSeach={this.seachInProducts}
        />
        <ProductTable
          category={category}
          products={this.filterProducts(products)}
          inStocked={this.state.inStocked}
        />
      </div>
    );
  }
}

class SeachBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }
  handleChange(e) {
    this.props.onSeach(e);
  }

  handleCheck() {
    this.props.isChecked();
  }

  render() {
    return (
      <div className="seachBar">
        <form className="seachBar-form">
          <div className="seachBar-input">
            <input
              type="text"
              placeholder="Seach..."
              onChange={this.handleChange}
            />
          </div>
          <div className="seachBar-input">
            <label>
              <input type="checkbox" onClick={this.handleCheck} />
              Only show products in stock
            </label>
          </div>
        </form>
      </div>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    return (
      <div className="productTable">
        <div className="productTable-header">
          <div className="productTable-header-cell">Name</div>
          <div className="productTable-header-cell">Price</div>
        </div>
        <ProductCategoryRow
          category={this.props.category}
          products={this.props.products}
          inStocked={this.props.inStocked}
        />
      </div>
    );
  }
}

class ProductCategoryRow extends React.Component {
  render() {
    const categoryRow = this.props.category.map((item, index) => {
      return (
        <Fragment key={index}>
          <div className="productCategoryRow-row">{item}</div>
          <ProductRow
            category={item}
            products={this.props.products}
            inStocked={this.props.inStocked}
          />
        </Fragment>
      );
    });
    return <div className="productCategoryRow">{categoryRow}</div>;
  }
}

class ProductRow extends React.Component {
  render() {
    let isStocked = "";
    let inStocked = "";
    const prodactRow = this.props.products.map((item, index) => {
      if (this.props.category === item.category) {
        if (item.stocked) {
          isStocked = "";
          inStocked = "";
        } else {
          isStocked = " noStocked";
          inStocked = this.props.inStocked ? "" : " inStocked";
        }
        return (
          <div className={`productRow${isStocked}${inStocked}`} key={index}>
            <div className={"productRow-cell"}>{item.name}</div>
            <div className={"productRow-cell"}>{item.price}</div>
          </div>
        );
      }
      return null;
    });
    return <Fragment>{prodactRow}</Fragment>;
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <FilterableProductTable />
      </div>
    );
  }
}

export default App;

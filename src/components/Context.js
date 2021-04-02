import React, { Component } from "react";

export const DataContext = React.createContext();

export class DataProvider extends Component {
  state = {
    products: [
      {
        _id: "1",
        title: "Nike Shoes 01",
        src:
          "https://i.pinimg.com/originals/cf/fd/ca/cffdca2aaa6df09655e9b3a81f9d08a2.png",
        description: "UI/UX designing, html css tutorials",
        content:
          "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
        price: 23,
        colors: ["red", "black", "crimson", "teal"],
        count: 1,
        alt: "ana de armas",
      },
      {
        _id: "2",
        title: "Nike Shoes 02",
        src: "https://www.refinery29.com/images/9868914.jpg",
        description: "UI/UX designing, html css tutorials",
        content:
          "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
        price: 19,
        colors: ["red", "crimson", "teal"],
        count: 1,
        alt: "Salma Hayek",
      },
      {
        _id: "3",
        title: "Nike Shoes 03",
        src:
          "https://i.pinimg.com/originals/86/b8/9d/86b89d286053e0ba29fb128725f9fbb2.jpg",
        description: "UI/UX designing, html css tutorials",
        content:
          "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
        price: 50,
        colors: ["lightblue", "white", "crimson", "teal"],
        count: 1,
        alt: "hanna",
      },
      {
        _id: "4",
        title: "Nike Shoes 04",
        src:
          "https://dtasdvdhudnn5.cloudfront.net/wp-content/uploads/2020/12/06131843/Hayden-Panettiere.jpg",
        description: "UI/UX designing, html css tutorials",
        content:
          "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
        price: 15,
        colors: ["orange", "black", "crimson", "teal"],
        count: 1,
        alt: "blonde",
      },
      {
        _id: "5",
        title: "Nike Shoes 05",
        src:
          "https://assets.teenvogue.com/photos/5bf2f5a15b4f80279855cbc5/master/pass/GettyImages-1028061498.jpg",
        description: "UI/UX designing, html css tutorials",
        content:
          "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
        price: 10,
        colors: ["orange", "black", "crimson", "teal"],
        count: 1,
        alt: "gigi",
      },
      {
        _id: "6",
        title: "Nike Shoes 06",
        src:
          "https://hips.hearstapps.com/esquireuk.cdnds.net/15/37/2048x2730/2048x2730-cameron-diaz-the-mask-red-dress-43-jpg-349d543d.jpg?resize=480:*",
        description: "UI/UX designing, html css tutorials",
        content:
          "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
        price: 17,
        colors: ["orange", "black", "crimson", "teal"],
        count: 1,
        alt: "alan partridge",
      },
    ],

    cart: [],
    total: 0,
  };

  addCart = (id) => {
    const { products, cart } = this.state;
    const check = cart.every((item) => {
      return item._id !== id;
    });
    console.log(check);
    if (check) {
      const data = products.filter((product) => {
        return product._id === id;
      });
      this.setState({ cart: [...cart, ...data] });
    } else {
      alert("The product has alerady been added to cart.");
    }
  };

  reduction = (id) => {
    const { cart } = this.state;
    cart.forEach(item => {
      if (item._id === id) {
        item.count === 1 ? (item.count = 1) : (item.count -= 1);
      }
    });
    this.setState({cart: cart});
    this.getTotal();
  };

  increase = (id) => {
    const { cart } = this.state;
    cart.forEach(item => {
      if (item._id === id) {
        item.count += 1;
      }
    });
      this.setState({cart: cart});
      this.getTotal();
  };

  removeProduct = id => {

    if (window.confirm ("Do you want to remove this item?"))
    {
     const {cart} = this.state;

  cart.forEach ((item, index) => {
   if (item._id === id) 
    {
      cart.splice(index,1)
    }
    })
    this.setState({cart: cart}) ;
      this.getTotal();
    }
 
  };

  getTotal = () => {
    const{cart} = this.state;
    const res = cart.reduce((prev, item) => {
        return prev + (item.price * item.count);
    },0)
    this.setState({total: res})
  };

  componentDidUpdate() {
    localStorage.setItem('dataCart', JSON.stringify(this.state.cart))
    localStorage.setItem('dataTotal', JSON.stringify(this.state.total))
  };

  componentDidMount(){
    const dataCart = JSON.parse(localStorage.getItem('dataCart'));
    if (dataCart !== null){
      this.setState({cart: dataCart});
    }
    const dataTotal = JSON.parse(localStorage.getItem('dataTotal'));
    if (dataTotal !== null){
      this.setState({total: dataTotal});
    }

  }

  render() {
    const { products, cart, total } = this.state;
    const { addCart, reduction, increase, removeProduct, getTotal } = this;

    return (
      <DataContext.Provider
        value={{ products, addCart, cart, reduction, increase, removeProduct, total, getTotal }}
      >
        {this.props.children}
      </DataContext.Provider>
    );
  }
}

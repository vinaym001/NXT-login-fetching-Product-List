import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import ProductCard from '../ProductCard'
import './index.css'

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getUpdatedData()
  }

  getUpdatedData = async () => {
    const apiUrl = 'https://apis.ccbp.in/products'
    const accessToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        brand: product.brand,
        title: product.title,
        imageUrl: product.image_url,
        price: product.price,
        rating: product.rating,
        id: product.id,
      }))
      this.setState({productsList: updatedData, isLoading: false})
    }
  }

  renderProductsList = () => {
    const {productsList, isLoading} = this.state
    return (
      <div>
        <h1 className="products-list-heading">All Products</h1>
        <ul className="products-list">
          {isLoading ? (
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          ) : (
            productsList.map(product => (
              <ProductCard productData={product} key={product.id} />
            ))
          )}
        </ul>
      </div>
    )
  }

  render() {
    return <>{this.renderProductsList()}</>
  }
}

export default AllProductsSection

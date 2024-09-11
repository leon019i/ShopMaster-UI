import React, { useEffect, useState } from 'react';
import apiInstance from '../../utils/axios';
import { Link } from 'react-router-dom';
import GetCurrentAddress from '../plugin/UserCountry';
import UserData from '../plugin/UserData';
import CardID from '../plugin/CardID';

function Products() {
  const [products, setProducts] = useState([]);
  const [categorys, setCategorys] = useState([]);

  // Handlers for size, color, and quantity
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedColors, setSelectedColors] = useState({});
  const [qtyValue, setQtyValue] = useState({});

  useEffect(() => {
    apiInstance.get('products/').then((response) => {
      setProducts(response.data);
    });
  }, []);

  useEffect(() => {
    apiInstance.get('category/').then((res) => {
      setCategorys(res.data);
    });
  }, []);

  const currentAddress = GetCurrentAddress();
  const userData = UserData();
  const cart_id = CardID();

  // Handler for selecting a size
  const handleSizeSelect = (event, product_id, size) => {
    setSelectedSizes((prevSelectedSizes) => ({
      ...prevSelectedSizes,
      [product_id]: size,
    }));
  };

  // Handler for selecting a color
  const handleColorSelect = (event, product_id, color) => {
    setSelectedColors((prevSelectedColors) => ({
      ...prevSelectedColors,
      [product_id]: color,
    }));
  };

  // Handler for changing the quantity
  const handleQtyChange = (event, product_id) => {
    const value = event.target.value;
    setQtyValue((prevQty) => ({
      ...prevQty,
      [product_id]: value,
    }));
  };

  const handleAddToCart = async (product_id, price, shipping_amount) => {
    const formData = new FormData();

    // Get specific values for this product
    const qty = qtyValue[product_id] || 1; // Default to 1 if not set
    const size = selectedSizes[product_id] || 'No Size Selected';
    const color = selectedColors[product_id] || 'No Color Selected';

    if (!qty || isNaN(qty)) {
      alert('Invalid quantity');
      return;
    }

    // Append the correct values to the form
    formData.append('product_id', product_id);
    formData.append('user_id', userData?.user_id);
    formData.append('qty', qty);
    formData.append('price', price);
    formData.append('shipping_amount', shipping_amount);
    formData.append('country', currentAddress.country);
    formData.append('size', size);
    formData.append('color', color);
    formData.append('cart_id', cart_id);

    try {
      const response = await apiInstance.post('cart-view/', formData);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <>
      <main className="mt-5">
        <div className="container">
          <section className="text-center">
            <div className="row">
              {products?.map((product, index) => (
                <div className="col-lg-4 col-md-12 mb-4" key={index}>
                  <div className="card">
                    <div className="bg-image hover-zoom ripple" data-mdb-ripple-color="light">
                      <Link to={`/detail/${product.slug}/`}>
                        <img
                          src={product.image}
                          className="w-100"
                          alt={product.title}
                          style={{ width: '100%', height: '250px', objectFit: 'contain' }}
                        />
                      </Link>
                      <a href={`/detail/${product.slug}`}>
                        <div className="mask">
                          <div className="d-flex justify-content-start align-items-end h-100">
                            {product.featured && (
                              <h5>
                                <span className="badge badge-primary ms-2">Featured</span>
                              </h5>
                            )}
                          </div>
                        </div>
                        <div className="hover-overlay">
                          <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }} />
                        </div>
                      </a>
                    </div>
                    <div className="card-body">
                      {/* Product Title */}
                      <a href={`/detail/${product.slug}`} className="text-reset">
                        <h5 className="card-title mb-3">{product.title}</h5>
                      </a>

                      {/* Product Category */}
                      <p className="text-reset">{product.category?.title || 'Uncategorized'}</p>

                      {/* Product Price */}
                      <h6 className="mb-3">
                        ${product.price}{' '}
                        {product.old_price > 0 && (
                          <small className="text-muted">
                            <s>${product.old_price}</s>
                          </small>
                        )}
                      </h6>

                      {/* Stock Status */}
                      <p className="text-muted">{product.in_stock ? 'In Stock' : 'Out of Stock'}</p>

                      {/* Rating and Views */}
                      <p className="text-muted">
                        Rating: {product.rating || 'No rating'} | Views: {product.views}
                      </p>

                      {/* Add to Cart and Wishlist Buttons */}
                      <div className="btn-group">
                        <div className="btn-group">
                          <button
                            className="btn btn-primary dropdown-toggle"
                            type="button"
                            id="dropdownMenuClickable"
                            data-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Variation
                          </button>
                          <ul className="dropdown-menu" aria-labelledby="dropdownMenuClickable">
                            {/* Size Variations */}
                            <div className="d-flex flex-column">
                              <li className="p-1">
                                <b>Quantity</b>
                              </li>
                              <div className="p-1 mt-0 pt-0 d-flex flex-wrap">
                                <li>
                                  <input
                                    className='form-control'
                                    value={qtyValue[product.id] || 1}
                                    onChange={(e) => handleQtyChange(e, product.id)}
                                    type="number"
                                  />
                                </li>
                              </div>
                            </div>
                            {product.size?.length > 0 && (
                              <div className="d-flex flex-column">
                                <li className="p-1">
                                  <b>Size</b>:
                                  <span className="ml-2">
                                    {selectedSizes[product.id] || 'No Size Selected'}
                                  </span>
                                </li>
                                <div className="p-1 pt-0 d-flex flex-wrap">
                                  {product.size?.map((s, index) => (
                                    <li key={index}>
                                      <button
                                        className={`btn btn-secondary btn-sm m-1 mb-1 ${selectedSizes[product.id] === s.name ? 'active' : ''
                                          }`}
                                        onClick={(e) => { handleSizeSelect(e, product.id, s.name); }}
                                      >
                                        {s.name}
                                      </button>
                                    </li>
                                  ))}
                                </div>
                              </div>
                            )}
                            {/* Color Variations */}
                            {product.color?.length > 0 && (
                              <div className="d-flex flex-column">
                                <li className="p-1">
                                  <b>Color</b>:
                                  <span className="ml-2">
                                    {selectedColors[product.id] || 'No Color Selected'}
                                  </span>
                                </li>
                                <div className="p-1 mt-0 pt-0 d-flex flex-wrap">
                                  {product.color?.map((color, index) => (
                                    <li key={index}>
                                      <button
                                        className={`btn btn-sm m-1 p-3 ${selectedColors[product.id] === color.name ? 'active' : ''
                                          }`}
                                        style={{ backgroundColor: color.name }}
                                        onClick={(e) => { handleColorSelect(e, product.id, color.name); }}
                                      />
                                    </li>
                                  ))}
                                </div>
                              </div>
                            )}
                            <div className="d-flex mt-1 p-1">
                              <button
                                type="button"
                                className="btn btn-primary mr-1 mb-1"
                                onClick={() => handleAddToCart(product.id, product.price, product.shipping_amount)}
                              >
                                <i className="fas fa-shopping-cart" />
                              </button>
                              <button type="button" className="btn btn-danger px-3 mr-1 mb-1 ms-2">
                                <i className="fas fa-heart" />
                              </button>
                            </div>
                          </ul>
                          <button type="button" className="btn btn-danger px-3 mr-1 ms-2">
                            <i className="fas fa-heart" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Category Section */}
            <div className="row">
              {categorys?.map((category, index) => (
                <div className="col-lg-2" key={index}>
                  <img
                    src={category.image}
                    style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
                    alt={category.title}
                  />
                  <h6>{category.title}</h6>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default Products;

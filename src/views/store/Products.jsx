import React, { useEffect, useState } from 'react';
import apiInstance from '../../utils/axios';
import { Link } from 'react-router-dom';


function Products() {
  const [products, setProducts] = useState([]);
  const [categorys, setCategorys] = useState([]);

  useEffect(() => {
    apiInstance.get('products/').then((response) => {
      setProducts(response.data);
    });


  }, []);

  useEffect(() => {
    apiInstance.get('category/').then((res) => {
      // console.log(response.data)
      setCategorys(res.data);
    });

  }, []);

  return (
    <>
      <main className="mt-5">
        <div className="container">
          <section className="text-center">
            <div className="row">
              {products?.map((product, index) => (
                <div className="col-lg-4 col-md-12 mb-4" key={index}>
                  <div className="card">
                    <div
                      className="bg-image hover-zoom ripple"
                      data-mdb-ripple-color="light"
                    >
                      {/* Display product image with fixed size and no cropping */}
                      <Link to={`/detail/${product.slug}/`}>
                        <img
                          src={product.image}
                          className="w-100"
                          alt={product.title}
                          style={{ width: "100%", height: '250px', objectFit: 'contain' }} // No cropping, maintain aspect ratio
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
                          <div
                            className="mask"
                            style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}
                          />
                        </div>
                      </a>
                    </div>
                    <div className="card-body">
                      {/* Product Title */}
                      <a href={`/detail/${product.slug}`} className="text-reset">
                        <h5 className="card-title mb-3">{product.title}</h5>
                      </a>

                      {/* Product Category */}
                      <p className="text-reset">{product.category?.title || "Uncategorized"}</p>

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
                      <p className="text-muted">{product.in_stock ? "In Stock" : "Out of Stock"}</p>

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
                            data-bs-toggle="dropdown"
                            data-bs-auto-close="false"
                            aria-expanded="false"
                          >
                            Variation
                          </button>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuClickable"
                          >
                            <div className="d-flex flex-column">
                              <li className="p-1">
                                <b>Size</b>: XL
                              </li>
                              <div className="p-1 mt-0 pt-0 d-flex flex-wrap">
                                {product.size.map((s, index) => {
                                  <li>
                                    <button className="btn btn-secondary btn-sm me-2 mb-1">
                                      XXL
                                    </button>
                                  </li>

                                })}
                              </div>
                            </div>
                            <div className="d-flex flex-column mt-3">
                              <li className="p-1">
                                <b>COlor</b>: Red
                              </li>
                              <div className="p-1 mt-0 pt-0 d-flex flex-wrap">
                                <li>
                                  <button
                                    className="btn btn-sm me-2 mb-1 p-3"
                                    style={{ backgroundColor: "red" }}
                                  />
                                </li>
                                <li>
                                  <button
                                    className="btn btn-sm me-2 mb-1 p-3"
                                    style={{ backgroundColor: "green" }}
                                  />
                                </li>
                                <li>
                                  <button
                                    className="btn btn-sm me-2 mb-1 p-3"
                                    style={{ backgroundColor: "yellow" }}
                                  />
                                </li>
                              </div>
                            </div>
                            <div className="d-flex mt-3 p-1">
                              <button
                                type="button"
                                className="btn btn-primary me-1 mb-1"
                              >
                                <i className="fas fa-shopping-cart" />
                              </button>
                              <button
                                type="button"
                                className="btn btn-danger px-3 me-1 mb-1 ms-2"
                              >
                                <i className="fas fa-heart" />
                              </button>
                            </div>
                          </ul>
                          <button
                            type="button"
                            className="btn btn-danger px-3 me-1 ms-2"
                          >
                            <i className="fas fa-heart" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
            <div className='row'>
              {categorys?.map((category, index) => (
                <div className="col-lg-2" key={index}>
                  <img src={category.image} style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover" }} alt="" />
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

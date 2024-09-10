import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiInstance from '../../utils/axios';
import GetCurrentAddress from '../plugin/UserCountry';
import UserData from '../plugin/UserData';
import CardID from '../plugin/CardID';


function ProductDetail() {
  const [product, setProduct] = useState({});
  const [specifications, setSpecifications] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);

  const [colorValue, setColorValue] = useState('No Color')
  const [sizeValue, setSizeValue] = useState('No Size')
  const [qtyValue, setQtyValue] = useState(1)


  const param = useParams();
  const currentAddress = GetCurrentAddress()
  const userData = UserData()
  const cart_id = CardID()

  console.log(userData);
  console.log(cart_id);




  useEffect(() => {
    apiInstance.get(`products/${param.slug}/`).then((res) => {
      const data = res.data;
      setProduct(data);
      setSpecifications(data.specification || []);
      setGallery(data.gallery || []);
      setColors(data.color || []);
      setSizes(data.size || []);
    });
  }, [param.slug]);

  // console.log(sizes);
  // console.log(colors);
  const handleColorButtonClick = (colorName) => {
    // const colorNameInput = event.target.closest('.color_button').parentNode.querySelector(".color_name")
    // console.log(colorNameInput);
    setColorValue(colorName)


  }
  const handleSizeButtonClick = (sizeName) => {
    // const colorNameInput = event.target.closest('.color_button').parentNode.querySelector(".color_name")
    // console.log(colorNameInput);
    setSizeValue(sizeName)


  }

  const handleQuantityChange = (event) => {
    setQtyValue(event.target.value)
  }

  const handleAddToCart = async () => {
    // console.log("User id:", userData.user_id);
    // console.log("Product ID:", product.id);
    // console.log("Price:", product.price);
    // console.log("Shipping Amount:", product.shipping_amount);
    // console.log("Qty:", qtyValue);
    // console.log("Color:", colorValue);
    // console.log("Size:", sizeValue);
    // console.log("Country:", currentAddress.country);
    // console.log("Cart ID:", cart_id);

    const formData = new FormData();



    formData.append("product_id", product.id);
    formData.append("user_id", userData.user_id); // Assuming you get user_id from UserData
    formData.append("qty", qtyValue);
    formData.append("price", product.price);
    formData.append("shipping_amount", product.shipping_amount);
    formData.append("country", currentAddress.country);
    formData.append("size", sizeValue);
    formData.append("color", colorValue);
    formData.append("cart_id", cart_id);

    // const addToCart = async () => {
    try {
      const response = await apiInstance.post('cart-view/', formData);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }

  // };


  // console.log(qtyValue);

  return (
    <main className="mb-4 mt-4">
      <div className="container">
        <section className="mb-9">
          <div className="row gx-lg-5">
            <div className="col-md-6 mb-4 mb-md-0">
              {/* Main product image */}
              <div className="lightbox">
                <img
                  src={product.image}
                  style={{
                    width: "100%",
                    height: 500,
                    objectFit: "cover",
                    borderRadius: 10
                  }}
                  alt={product.title}
                  className="ecommerce-gallery-main-img active w-100 rounded-4"
                />
              </div>
              {/* Gallery */}
              <div className="mt-3 d-flex">
                {gallery.map((g, index) => (
                  <div className="p-3" key={index}>
                    <img
                      src={g.image}
                      style={{
                        width: 100,
                        height: 100,
                        objectFit: "cover",
                        borderRadius: 10
                      }}
                      alt={`Gallery image ${index + 1}`}
                      className="ecommerce-gallery-main-img active w-100 rounded-4"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="col-md-6 mb-4 mb-md-0">
              {/* Product details */}
              <div>
                <h1 className="fw-bold mb-3">{product.title}</h1>
                <div className="d-flex text-primary align-items-center">
                  <ul className="mb-3 d-flex p-0" style={{ listStyle: "none" }}>
                    {Array.from({ length: product.rating }, (_, i) => (
                      <li key={i}>
                        <i className="fas fa-star fa-sm text-warning ps-0" title="Rating" />
                      </li>
                    ))}
                    <li style={{ marginLeft: 10, fontSize: 13 }}>
                      <a href="#" className="text-decoration-none">
                        <strong className="me-2">{product.product_rating}/5</strong>({product.rating_count} reviews)
                      </a>
                    </li>
                  </ul>
                </div>
                <h5 className="mb-3">
                  <s className="text-muted me-2 small align-middle">${product.old_price}</s>
                  <span className="align-middle">${product.price}</span>
                </h5>
                <p className="text-muted">{product.description}</p>

                {/* Specifications */}
                {specifications.length > 0 &&
                  <>
                    <div className="table-responsive">
                      <table className="table table-sm table-borderless mb-0">
                        <tbody>
                          <tr>
                            <th className="ps-0 w-25" scope="row">
                              <strong>Category</strong>
                            </th>
                            <td>{product.category?.title}</td>
                          </tr>
                          {specifications.map((s, index) => (
                            <tr key={index}>
                              <th className="ps-0 w-25" scope="row">
                                <strong>{s.title}</strong>
                              </th>
                              <td>{s.content}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>}
                <hr className="my-5" />

                <form>
                  <div className="row flex-column">
                    {/* Quantity */}
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="typeNumber">
                          <b>Quantity</b>
                        </label>
                        <input type="number" id="typeNumber" className="form-control quantity" min={1} value={qtyValue}
                          onChange={handleQuantityChange} />
                      </div>
                    </div>

                    {/* Size */}

                    {sizes.length > 0 && <>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label"><b>Size: </b> {sizeValue}</label>
                        </div>
                        <div className="d-flex">
                          {sizes.map((size, index) => (
                            <div key={index} className="mr-1">
                              <input type="hidden" className='size_name' name='' value={size.name} />
                              <button className="btn btn-secondary size_button" onClick={() => handleSizeButtonClick(size.name)} type='button'>
                                {size.name}
                              </button>
                            </div>
                          ))}
                          {/* <select className="form-select">
                          {sizes.map((size, index) => (
                            <option key={index} value={size.name}>
                              {size.name}
                            </option>
                          ))}
                        </select> */}
                        </div>
                      </div>
                    </>
                    }
                    {/* Colors */}
                    {colors.length > 0 && <>
                      <div className="col-md-6 mb-4">

                        <h6 className="form-label"><b>Color: </b> <span>{colorValue}</span></h6>

                        <div className="d-flex">
                          {colors.map((color, index) => (
                            <div key={index} className="mr-2 mb-2">
                              <button
                                className="btn p-3 mr-2  color_button"
                                type='button'
                                onClick={() => handleColorButtonClick(color.name)} // Pass the color name directly
                                style={{ backgroundColor: color.color_code }}
                              ></button>
                            </div>
                          ))}
                        </div>
                        <hr />
                      </div>
                    </>}
                  </div>
                  <button type="button" className="btn btn-primary btn-rounded me-2" onClick={handleAddToCart}>
                    <i className="fas fa-cart-plus me-2" /> Add to cart
                  </button>
                  <button href="#!" type="button" className="btn btn-danger btn-floating" data-mdb-toggle="tooltip" title="Add to wishlist">
                    <i className="fas fa-heart" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <hr />

        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">
              Specifications
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">
              Vendor
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false" >
              Review
            </button>
          </li>
        </ul>

        {/* Specifications tab content */}
        <div className="tab-content" id="pills-tabContent">
          <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
            <div className="table-responsive">
              <table className="table table-sm table-borderless mb-0">
                <tbody>
                  <tr>
                    <th className="ps-0 w-25" scope="row">
                      <strong>Category</strong>
                    </th>
                    <td>{product.category?.title}</td>
                  </tr>
                  {specifications.map((s, index) => (
                    <tr key={index}>
                      <th className="ps-0 w-25" scope="row">
                        <strong>{s.title}</strong>
                      </th>
                      <td>{s.content}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Vendor tab content */}
          <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
            <div className="card mb-3" style={{ maxWidth: 400 }}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={product.vendor?.image}
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover"
                    }}
                    alt="Vendor Image"
                    className="img-fluid"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{product.vendor?.name}</h5>
                    <p className="card-text">{product.vendor?.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews tab content */}
          <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
            {/* Add reviews or review form here */}
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetail;

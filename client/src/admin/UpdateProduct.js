import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import {
  getCategories,
  getProduct,
  updateProduct,
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const UpdateProduct = ({ match }) => {
  const { user, token } = isAuthenticated();

  const [values, setvalues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    success: false,
    updatedProduct: "",
    getRedicrect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    category,
    loading,
    error,
    success,
    updatedProduct,
    getRedirect,
    formData,
  } = values;

  const preloadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setvalues({ ...values, error: data.error });
      } else {
        setvalues({ categories: data, formData: new FormData() });
      }
    });
  };

  const preload = (productId) => {
    getProduct(productId).then((data) => {
      // console.log(productId);
      // console.log(data);
      if (data.error) {
        setvalues({ ...values, error: data.error });
      } else {
        preloadCategories();
        setvalues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category,
          stock: data.stock,
          formData: new FormData(),
        });
      }
      preloadCategories();
    });
  };

  useEffect(() => {
    preload(match.params.productId);
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setvalues({ ...values, [name]: value });
  };

  //FIXME: UPDATED PRODUCT NAME IS NOT SHOWING UP
  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: success ? "" : "none" }}
    >
      {/*<h4>{updatedProduct} is updated Successfully.</h4>*/}
      <h4>Product updation succuessful</h4>
    </div>
  );

  const errorMessage = () => (
    <div
      className="alert alert-danger mt-3"
      style={{ display: error ? "" : "none" }}
    >
      <h4>{error}</h4>
    </div>
  );

  const redirect = () => {
    if (getRedirect) {
      setTimeout(function () {
        window.location.href = "/admin/dashboard";
      }, 2000);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setvalues({ ...values, error: "", loading: true });
    updateProduct(match.params.productId, user._id, token, formData).then(
      (data) => {
        if (data.error) {
          setvalues({ ...values, error: data.error });
        } else {
          setvalues({
            ...values,
            name: "",
            description: "",
            price: "",
            stock: "",
            category: "",
            loading: false,
            error: "",
            success: true,
            updatedProduct: data.name,
            getRedirect: true,
          });
        }
      }
    );
  };

  const updateProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select Category</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-2"
      >
        Update Product
      </button>
    </form>
  );

  return (
    <Base
      title="Update Product here!"
      description="Welcome to product updation section"
    >
      <div className="container bg-info p-4">
        <div className="bg-dark text-white rounded">
          <div className="col-md-8 offset-md-2">
            {successMessage()}
            {redirect()}
            {errorMessage()}
            {updateProductForm()}
          </div>
        </div>
      </div>
    </Base>
  );
};

export default UpdateProduct;

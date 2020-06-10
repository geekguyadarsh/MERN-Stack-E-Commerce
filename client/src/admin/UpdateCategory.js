import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { getCategory, updateCategory } from "./helper/adminapicall";

const UpdateCategory = ({ match }) => {
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
        Admin Home
      </Link>
    </div>
  );

  const preload = (categoryId) => {
    getCategory(categoryId).then((data) => {
      console.log(data);
      if (data.error) {
        setError(data.error);
      } else {
        setCategory(data.name);
      }
    });
  };

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  const handleChange = (event) => {
    setError("");
    setCategory(event.target.value);
  };

  const onsubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    //FIXME: CORS ERROR
    //backend request
    updateCategory(match.params.categoryId, user._id, token, category).then(
      (data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setError("");
          setSuccess(true);
          setCategory("");
        }
      }
    );
  };

  const successMessage = () => {
    if (success) {
      return (
        <h4 className="text-success">Category has been updated successfully</h4>
      );
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-danger">{error}</h4>;
    }
  };

  const myCategoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <p className="lead">Enter the category</p>
          <input
            type="text"
            className="form-control my-3"
            onChange={handleChange}
            value={category}
            autoFocus
            required
            placeholder="Ex. Summer"
          />
          <button onClick={onsubmit} className="btn btn-outline-info ">
            Update Category
          </button>
        </div>
      </form>
    );
  };

  return (
    <Base
      title="Create a Category here"
      description="Add a new categroy for your product"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2 bg-white">
          {warningMessage()}
          {successMessage()}
          {myCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;

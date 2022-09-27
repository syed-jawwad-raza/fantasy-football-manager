import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";

const Register = () => {
  // Create state for formdata and set its initial value
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  // Destructuring formData
  const { name, email, password, password2 } = formData;
 // Describing what happens whenever something is typed in a field
  const onChange = (e) => {
    setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
    }))
  };
  const onSubmit = (e) => {
    e.preventDefault()
  };

  return (
    <div>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className="form">
      <form onSubmit={onSubmit}>
      <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={onChange}
            />
      </div>
      <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
      
      </div>
      <div className="form-group">
       
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
            />
        
      </div>
      <div className="form-group">
            <input
              type="password"
              id="password2"
              name="password2"
              value={password2}
              placeholder="Confirm password"
              onChange={onChange}
            />
        </div>
            <div className="form-group">
          <button type="submit" className="btn btn-block">
            Register
          </button>
      </div>
      </form>
            </section>
      </div>
  );
};

export default Register;

// useEffect is a React Hook that lets you synchronize a component with an external system.
import { useState, useEffect } from "react";
// Use selector is used to select something from the store's state
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// Toast gives us pretty notifications
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { register, reset } from "../features/auth/authSlice";
import Spinner from '../components/Spinner'; 

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

  const navigate = useNavigate();
  const dispatch = useDispatch()

  // Getting auth 'slice' of state and destructuring to get values
  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

  // This effect will run whenever the current component is added/mounted to the page and whenever dependencies change
  useEffect(() => { // First parameter is the setup function
    if (isError) {
      toast.error(message)
    }
    // Navigate to dashboard if registered successfully
    if (isSuccess || user) {
      navigate('/')
    }
    
    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch]) // Effect will fire off if anything from this dependency array changes)

  // Describing what happens whenever something is typed in a field
  const onChange = (e) => {
    // This is how useState hook works, it just gets previous state automatically and updates
    setFormData((prevState) => ({
      ...prevState, // To get the current value of all fields
      [e.target.name]: e.target.value, // To get the name of the field currently being typed into and set it to the value being typed in
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name,
        email,
        password
      } 
      
      dispatch(register(userData))
    }
  };

  if (isLoading) {
    return <Spinner />
  }
  
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
              placeholder="Enter your team's name"
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
import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
// Use selector is used to select something from the store's state
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// Toast gives us pretty notifications
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from '../components/Spinner'; 

const Login = () => {
  // Create state for formdata and set its initial value
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // Destructuring formData
  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch()

  // Getting state and destructuring to get values
  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    // Navigate to dashboard if registered successfully
    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch]) // Effect will fire off if anything from this array changes)

  // Describing what happens whenever something is typed in a field
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState, // To get the current value of all fields
      [e.target.name]: e.target.value, // To get the name of the field currently being typed into and set it to the value being typed in
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  };

  if (isLoading) {
    return <Spinner/>
  }

  return (
    <div>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please enter your credentials</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
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
            <button type="submit" className="btn btn-block">
              Login
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;

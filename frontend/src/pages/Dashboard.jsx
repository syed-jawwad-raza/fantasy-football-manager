import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GoalForm from "../components/GoalForm";
import GoalItem from "../components/GoalItem";
import Spinner from "../components/Spinner";
import { getGoals, reset } from "../features/goals/goalSlice";

const Dashboard = () => {
  const navigate = useNavigate(); // Returns an imperative method for changing the location
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  // Getting goal 'slice' of state and destructuring to get values
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );

  // This effect will run whenever the current component is added/mounted to the page or whenever dependencies change
  useEffect(() => {
    if (isError) {
       console.log(message); // Could use toastify to display errors to the user in an elegant way
     }
    // Redirects user to login page if they aren't logged in
    if (!user) {
      navigate("/login");
    }
    // Now the actual function call (dispatch) that will call the getGoals function
    // Doesn't need any arguments as it only needs a token wich it will get from state
     dispatch(getGoals());
    // Clear goals when leaving the dashboard/ reset the state on unmount
     return () => {
       dispatch(reset());
     };
  }, [user, navigate]);

  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>

      <GoalForm />

      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (<h3>You have not set any goals yet</h3>)}
      </section>
    </>
  );
};

export default Dashboard;

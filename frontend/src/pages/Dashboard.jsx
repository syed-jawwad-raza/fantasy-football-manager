import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PlayerForm from "../components/PlayerForm";
import PlayerItem from "../components/PlayerItem";
import Spinner from "../components/Spinner";
import { getplayers, reset } from "../features/players/playerSlice";

const Dashboard = () => {
  const navigate = useNavigate(); // Returns an imperative method for changing the location
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  // Getting player 'slice' of state and destructuring to get values
  const { players, isLoading, isError, message } = useSelector(
    (state) => state.players
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
    // Now the actual function call (dispatch) that will call the getPlayers function
    // Doesn't need any arguments as it only needs a token wich it will get from state
    dispatch(getplayers());
    // Clear players when leaving the dashboard/ reset the state on unmount
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="heading">
        <h1>{user && user.name}'s Squad</h1>
        <p>Player Dashboard</p>
      </section>

      <PlayerForm />

      <section className="content">
        {players.length > 0 ? (
          <div className="players">
            {players.map((player) => (
              <PlayerItem key={player._id} player={player} />
            ))}
          </div>
        ) : (
          <h3>You have not added any players yet</h3>
        )}
      </section>
    </>
  );
};

export default Dashboard;

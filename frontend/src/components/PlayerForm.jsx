import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPlayer } from "../features/players/playerSlice";

function PlayerForm() {
  const [formData, setFormData] = useState({
    name: "",
    position: ""
  })

  const { name, position } = formData

  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const playerData = {
      name,
      position
    }
    console.log(playerData.position);
    dispatch(addPlayer(playerData));
    setFormData({
      name: "",
    position: ""
    });
  };
  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          {/* <label htmlFor="text">Player</label> */}
          <input
            type="name"
            name="name"
            id="name"
            value={name}
            placeholder="Enter player name"
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <select id="position" name="position" required onChange={onChange}>
            <option value="">--Select player position--</option>
            <option value="Forward"> Forward </option>
            <option value="Midfielder"> Midfielder</option>
            <option value="Defender"> Defender</option>
            <option value="Goalkeeper"> Goalkeeper</option>
          </select>
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add Player
          </button>
        </div>
      </form>
    </section>
  );
}

export default PlayerForm;

import { useDispatch } from 'react-redux'
import { deletePlayer } from '../features/players/playerSlice'


function PlayerItem({player}) {

    const dispatch = useDispatch()
  return (
    <div className="player">
        <div>
            Joined: {new Date(player.createdAt).toLocaleString('en-US').split(",")[0]} {/*To display only date*/}
        </div>
        <div>
          {player.position}
        </div>
        <h2>{player.name}</h2>
        <button onClick={() => dispatch(deletePlayer(player._id))} className="close">X</button>
    </div>
  )
}

export default PlayerItem
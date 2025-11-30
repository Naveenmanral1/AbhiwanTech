import { Tournament } from "../models/tournament";

const createTournament = async(req,res) => {
    try {
         const { tournament_name, creator_name } = req.body;
         const tourData = await Tournament.create({
            tournament_name,
            creator_name
         });
         res.json(tourData);
    } catch (error) {
         res.status(500).json({ error: err.message });
    }
}


const createRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const { room_id } = req.body;

    const updated = await Tournament.findByIdAndUpdate(
      id,
      { $push: { rooms: { room_id, players: [] } } },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const joinRoom = async (req, res) => {
  try {
    const { tid, rid } = req.params;
    const { player_name } = req.body;

    const updated = await Tournament.findOneAndUpdate(
      { _id: tid, "rooms.room_id": rid },
      { $push: { "rooms.$.players": { player_name, score: 0 } } },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const saveScore = async (req, res) => {
  try {
    const { tid, rid, pname } = req.params;
    const { score } = req.body;

    const updated = await Tournament.findOneAndUpdate(
      {
        _id: tid,
        "rooms.room_id": rid,
        "rooms.players.player_name": pname
      },
      {
        $set: {
          "rooms.$.players.$[p].score": score
        }
      },
      {
        new: true,
        arrayFilters: [{ "p.player_name": pname }]
      }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const calculateWinner = async (req, res) => {
  try {
    const { tid } = req.params;

    const t = await Tournament.findById(tid);

    let highest = null;
    let maxScore = -1;

    t.rooms.forEach(room => {
      room.players.forEach(p => {
        if (p.score > maxScore) {
          maxScore = p.score;
          highest = p.player_name;
        }
      });
    });

    t.winner_name = highest;
    await t.save();

    res.json({ winner: highest });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export {
    createTournament,
    createRoom,
    joinRoom,
    saveScore,
    calculateWinner 
}
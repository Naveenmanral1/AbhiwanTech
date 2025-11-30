import {Router} from "express";
import { 
    createTournament,
    createRoom,
    joinRoom,
    saveScore,
    calculateWinner
 } from "../controllers/tournamentController";


const router = Router();

router.route('/tournament').post(createTournament);
router.route('/tournament/:tid/room').post(createRoom);
router.route('/tournament/:tid/room/:rid/join',).post(joinRoom);
router.route('/tournament/:tid/room/:rid/player/:pname').patch(saveScore);
router.get('/tournament/:tid/winner').get(calculateWinner);

module.exports = router;
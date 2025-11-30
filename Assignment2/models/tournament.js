import mongoose , {Schema} from "mongoose";


const tournamentSchema = new Schema({
   tournament_name:{
      type:String
   },
   creator_name:{
      type:String
   },
   winner_name:{
      type:String
   },
   rooms:[
      {
         room_id:{
            type:String
         },
         players:[
            {
               player_name:{
                  type:String
               },
               score:{
                  type:Number
               }
            }
         ]
      }
   ]
},
{
   timestamps:true
});

export const Tournament = mongoose.model("Tournament",tournamentSchema)
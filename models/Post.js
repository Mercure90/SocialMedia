const mongoose = require('mongoose')


const PostSchema = new mongoose.Schema({
  userBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user'],
  },
  desc:{
    type:String,
    max: 500
  },
  img:{
    type:String
  },
  likes:{
    type:Array,
    default:[]
  },
  
},
{timestamps:true}
);

module.exports = mongoose.model('Post', PostSchema)

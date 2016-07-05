mongoose = require 'mongoose'
moment = require 'moment'

Event = new mongoose.Schema(
  name: { type: String, trim: true }
  location: String
  date: Date 
  from: String
  to: String
  category: { type: Array }
  amount: { type: Number, min: 0 }
  teaser: String
  long: String
  created_at: { type: Date, default: Date.now }
)

mongoose.model "Event", Event
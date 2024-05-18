import mongoose, { Schema, SchemaTypes } from "mongoose";
import {loadType} from 'mongoose-currency'
loadType(mongoose)

const Currency = mongoose.Types.Currency

const IncomeSchema = new Schema({
  name: {
    type: String,
    trim: true,
    minLength: 2,
    maxLength: 128,
    default: "Mysterious Income"
  },
  amount: {
    type: Currency,
    set: (v) => (Math.round(v * 100) / 100),
    get: (v) => v.toFixed(2),
    default: 0.00,
    required: true
  },
  paymentFrequency: {
    startDate: Date,
    interval: {
      type: String,
      trim: true,
      lowercase: true,
      enum: {
        values: [
          "weekly",
          "fortnightly",
          "fourweekly",
          "monthly",
          "annually",
        ],
        message:
          "Please choose a valid interval, `{VALUE}` is not a valid entry for `{PATH}`",
      }
    },
  },
  type: { type: String },
  user: { type: SchemaTypes.ObjectId, ref: "user", index: true },
}, {
  timestamps: true,
  query:{
    byUserId({_id}){
      return this.where('user').equals(_id).lean().exec()
    },
  }, 
});

const Income =
  mongoose.models?.Income || mongoose.model("income", IncomeSchema, "incomes");

export default Income;

import mongoose, { Schema, SchemaTypes } from "mongoose";

const IncomeSchema = new Schema({
  name: {
    type: String,
    trim: true,
    minLength: 2,
    maxLength: 128,
    default: "Mysterious Income"
  },
  amount: {
    type: Number,
    set: (v) => Math.round(Number.parseFloat(v).toFixed(2) * 100),
    default: 0.00,
    required: true
  },
  paymentFrequency: {
    startDate: {
      type: Date,
      default: new Date()
    },
    interval: {
      type: String,
      trim: true,
      lowercase: true,
      default: "monthly",
      enum: {
        values: [
          "weekly",
          "fortnightly",
          "fourweekly",
          "monthly",
          "quarterly",
          "annually",
        ],
        message:
          "Please choose a valid interval, `{VALUE}` is not a valid entry for `{PATH}`",
      }
    },
  },
  type: { type: [String], default: [] },
  user: { type: SchemaTypes.ObjectId, ref: "user", index: true },
}, {
  timestamps: true
});

const Income =
  mongoose.models?.Income ?? mongoose.model("income", IncomeSchema, "incomes");

export default Income;

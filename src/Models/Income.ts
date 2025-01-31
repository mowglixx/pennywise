import mongoose, { Schema } from "mongoose";
import ModelFragments from "./Fragments";

const IncomeSchema = new Schema({
  name: {...ModelFragments.name, default: "Untitled Income"},
  amount: ModelFragments.amount,
  frequency: ModelFragments.frequency,
  tags: ModelFragments.tags,
  notes: String,
  owner: ModelFragments.references.User,
  company: ModelFragments.company,
}, {
  timestamps: true
});

const Income =
  mongoose.models?.Income ?? mongoose.model("Income", IncomeSchema, "Incomes");

export default Income;
import mongoose, { Schema, SchemaTypes } from "mongoose";
import ModelFragments from "./Fragments";

const IncomeSchema = new Schema({
  name: {...ModelFragments.name, default: "Untitled Income"},
  amount: ModelFragments.amount,
  frequency: ModelFragments.frequency,
  tags: ModelFragments.tags,
  notes: String,
  owner: ModelFragments.references.user,
  company: ModelFragments.company,
}, {
  timestamps: true
});

const Income =
  mongoose.models?.Income ?? mongoose.model("income", IncomeSchema, "incomes");

export default Income;
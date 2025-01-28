import mongoose, { Schema, SchemaTypes } from "mongoose";
import ModelFragments from "./Fragments";

const ExpenseSchema = new Schema({
  name: {...ModelFragments.name, default: "Untitled Expense"},
  amount: ModelFragments.amount,
  frequency: ModelFragments.frequency,
  tags: ModelFragments.tags,
  notes: String,
  owner: ModelFragments.references.user,
  company: ModelFragments.company,
}, {
  timestamps: true
});

const Expense =
  mongoose.models?.Expense ?? mongoose.model("Expense", ExpenseSchema, "Expenses");

export default Expense;
import mongoose, { Schema } from "mongoose";

const BalancedAccountSchema = new Schema({
    name: {
        type: String,
        trim: true,
        minLength: 2,
        maxLength: 128
    },
    balance: {
        type: Number,
        set: (v) => Math.round(v * 100) / 100,
        get: (v) => Math.round(v * 100) / 100,
        default: 0
      },
    user: { type: SchemaTypes.ObjectId, ref: "user", index: true },
}, {
    timestamps: true,
    query:{
      byUserId({_id}){
        return this.where('user').equals(_id).lean().exec()
      },
    }, 
  });

const BalancedAccount = mongoose.models?.BalancedAccount || mongoose.model('balancedAccount', BalancedAccountSchema, 'balancedAccounts')

export default BalancedAccount
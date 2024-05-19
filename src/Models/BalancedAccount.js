import mongoose, { Schema } from "mongoose";
import {loadType} from 'mongoose-currency'
loadType(mongoose)

const Currency = mongoose.Types.Currency

const BalancedAccountSchema = new Schema({
    name: {
        type: String,
        trim: true,
        minLength: 2,
        maxLength: 128
    },
    balance: Currency,
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
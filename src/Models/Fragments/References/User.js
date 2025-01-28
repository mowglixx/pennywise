import { SchemaTypes } from 'mongoose'

export const User = { 
    type: SchemaTypes.ObjectId, 
    ref: "User", 
    index: true, 
    required: true 
}

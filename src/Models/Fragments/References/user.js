import { SchemaTypes } from 'mongoose'

export const user = { 
    type: SchemaTypes.ObjectId, 
    ref: "user", 
    index: true, 
    required: true 
}

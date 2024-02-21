import { model } from 'mongoose'
import { User, UserSchema } from './user.schema'

export const UserModel = model<User>('User', UserSchema)

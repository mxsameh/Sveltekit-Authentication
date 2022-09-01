import bcrypt from 'bcrypt'
import { SALT, PEPER } from "$env/static/private"


const salt = parseInt(SALT as string)
const peper = PEPER as string

const hashPassword = (password : string) : string =>
{
  // ADDING PEPER FOR EXTRA SECURITY
  const safePassword = password + peper

  // HASHING PASSWORD
  const hashedPassword =  bcrypt.hashSync(safePassword, salt)
  return hashedPassword
}

const comparePassword = (password : string, hashedPassword : string) : Boolean => 
{
  const safePassword = password + peper
  const isMatched = bcrypt.compareSync(safePassword, hashedPassword)
  return isMatched
}

export {hashPassword, comparePassword}
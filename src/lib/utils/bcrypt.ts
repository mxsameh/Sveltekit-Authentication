/**
 * BCRYPT FOR HASHING PASSWORD FOR MORE SECURITY
 */
import bcrypt from 'bcrypt'
import { SALT, PEPER } from "$env/static/private"

const salt = parseInt(SALT as string)
const peper = PEPER as string

/**
 * 
 * HASH PASSWORD FUNCTION
 * INPUTS:
 * PASSWORD : USER PASSWORD IN PLAIN TEXT
 * OUTPUTS: 
 * HASHED PASSWORD : USER PASSWORD HASHED
 * 
 */
const hashPassword = (password : string) : string =>
{
  // ADDING PEPER FOR EXTRA SECURITY
  const safePassword = password + peper

  // HASHING PASSWORD
  const hashedPassword =  bcrypt.hashSync(safePassword, salt)

  return hashedPassword
}



/**
 * 
 * COMPARE PASSWORD FUNCTION
 * INPUTS:
 * PASSWORD : USER PASSWORD IN PLAIN TEXT
 * HASHED PASSWORD : USER PASSWORD HASHED
 * OUTPUTS: 
 * IS MATCHED :IF PASSWORD AND HASHED PASSWORD ARE THE SAME
 * 
 */
const comparePassword = (password : string, hashedPassword : string) : Boolean => 
{
  // ADDING PEPER TO PASSWORD
  const safePassword = password + peper

  // CHECKING IF PASSWORD IS CORRECT
  const isMatched = bcrypt.compareSync(safePassword, hashedPassword)

  return isMatched
}

export {hashPassword, comparePassword}
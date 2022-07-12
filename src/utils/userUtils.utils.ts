import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const hashPassword = async (password: string, length = 15): Promise<string> => {
  const hash = await bcrypt.hash(password, length)
  return hash
}

const decryptPassword = (
  password1: string,
  password2: string
): Promise<boolean> => {
  const decrypt = bcrypt.compare(password1, password2)
  return decrypt
}

const generateUserAccessToken = (payload: any): string => {
  return jwt.sign(payload, '')
}

const verifyUserAccessToken = (token: string) => {
  return jwt.verify(token, '', (err, data) => {
    if (err) return false
    else return data
  })
}

export {
  hashPassword,
  decryptPassword,
  verifyUserAccessToken,
  generateUserAccessToken,
}

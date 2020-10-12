const bcrypt = require('bcrypt')

const encrypt = async (plainText) => {
  return await bcrypt.hash(plainText, 10)
}

const checkPassword = async (pw, hash) => await bcrypt.compare(pw, hash)

module.exports = {
  encrypt,
  checkPassword
}
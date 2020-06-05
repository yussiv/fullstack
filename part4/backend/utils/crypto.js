const bcrypt = require('bcrypt')

const encrypt = async (plainText) => {
  return await bcrypt.hash(plainText, 10)
}

module.exports = {
  encrypt
}
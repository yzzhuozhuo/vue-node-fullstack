const mongoose = require('mongoose')

const schema = mongoose.Schema({
  username: { type: String },
  password: {
    type: String,
    select: false,
    set(val) {
      return require('bcryptjs').hashSync(val, 10) // 对密码进行散列
    }
  }
})

module.exports = mongoose.model('AdminUser', schema)
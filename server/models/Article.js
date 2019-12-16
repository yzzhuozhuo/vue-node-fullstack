const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: { type: String },
   // 一个文章可以关联多个类型 比如新闻和公告中都有一篇相同的文章
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }], 
  body: {type: String }
})

module.exports = mongoose.model('Article', schema)
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: { type: String },
   // 一个文章可以关联多个类型 比如新闻和公告中都有一篇相同的文章
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }], 
  body: {type: String }
}, {
  timestamps: true //自己带有创建时间和更新时间，录入时会自己带上
})

module.exports = mongoose.model('Article', schema)
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String},
  // ref 关联的意思，比如说在当前Category数据库中，找当前ObjectId等于这个parent，
  // 就能把当前分类的父级parent找到
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category'} 
})

schema.virtual('children', {
  localField: '_id',
  foreignField: 'parent',
  justOne: false,
  ref: 'Category'
})

schema.virtual('newsList', {
  localField: '_id',
  foreignField: 'categories',
  justOne: false,
  ref: 'Article'
})

module.exports = mongoose.model('Category', schema)
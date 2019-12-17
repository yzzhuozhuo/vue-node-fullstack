module.exports = options => {
  return async (req, res, next) => {
    // loadsh的一个库，可以将字符类话，也就是 categories -> Category
    const modelName = require('inflection').classify(req.params.resource)
    // 表示给req对手上挂载一个Model
    req.Model = require(`../models/${modelName}`)
    next()
  }
}
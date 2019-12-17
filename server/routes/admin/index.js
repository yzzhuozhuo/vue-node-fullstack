module.exports = app => {
  const express = require('express')
  const AdminUser = require('../../models/AdminUser')
  const assert = require('http-assert')
  const jwt = require('jsonwebtoken')
  const router = express.Router({
    mergeParams: true // 把父级的参数，合并到router里面，让router能访问到
  })

  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })

  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })

  // 资源列表
  router.get('/', async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    // 取出关联查询后的所有值
    const items = await req.Model.find().setOptions(queryOptions).limit(10)
    res.send(items)
  })
  // 资源详情
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  
  // 登陆校验中间件 
  const authMiddleware = require('../../middleware/auth')
  //  获取模型中间件
  const resourceMiddleware = require('../../middleware/resource')

  app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)

  // multer 是一个node.js 上传文件中间件
  const multer = require('multer')
  // dest 目标地址，就是传到哪里去
  const upload = multer({ dest: __dirname + '/../../uploads' })
  app.post('/admin/api/upload',authMiddleware(), upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    // 1.根据用户名找用户
    //  取出数据库中加密的用户密码
    const user = await AdminUser.findOne({ username }).select('+password')
    assert(user, 422, '用户不存在')
    // if (!user) {
    //   return res.status(422).send({
    //     message: '用户不存在'
    //   })
    // }
    // 2.校验密码,用于提交的密码，和user.password进行比较
    const isValid = require('bcryptjs').compareSync(password, user.password)
    assert(isValid, 422, '密码错误')

    // 3.返回token
    // sign()方法，生成一个token,第一个参数表示你要加密的数据，放在token里的一个数据
    // 第二个参数表示生成一个token的时候给一个密钥,服务端可以验证客户端是否篡改密钥
    // 可以用jwt.sign()对应的方法jwt.verify()去进行验证
    // app.get('secret')只有一个参数表示获取一个值
    const token = jwt.sign({id: user._id}, app.get('secret')) 
    res.send({token})
  })

  // 错误处理函数
  app.use(async (err, req, res, next) => {
    console.log(err)
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}


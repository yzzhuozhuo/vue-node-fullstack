const express = require('express')

const app = express()

// express实例上设置一个变量
app.set('secret', 'gas7aghak2fasf')

app.use(require('cors')())
app.use(express.json())
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./plugins/db')(app)
require('./routes/admin')(app)
require('./routes/web')(app)

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
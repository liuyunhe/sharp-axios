import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'




const app = express()

// 使用cors中间件，允许所有来源的跨域请求
app.use(cors());

// app.use(express.static(__dirname))


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})

const router = express.Router()

registerSimpleRouter()

registerBaseRouter()

registerErrorRouter()

registerExtendRouter()


function registerSimpleRouter() {
  router.get('/simple/get',function(req,res) {
    res.json({
      msg:'hello world'
    })
  })
}

function registerBaseRouter() {
  router.get('/base/get', function(req, res) {
    res.json(req.query)
  })

  router.post('/base/post', function (req, res) {
    res.json(req.body)
  })

  router.post('/base/buffer', function(req, res) {
    let msg = []
    req.on('data', (chunk) => {
      if (chunk) {
        msg.push(chunk)
      }
    })
    req.on('end', () => {
      let buf = Buffer.concat(msg)
      res.json(buf.toJSON())
    })
  })
}

function registerErrorRouter() {
  router.get('/error/get', function(req, res) {
    if (Math.random() > 0.5) {
      res.json({
        msg: `hello world`
      })
    } else {
      res.status(500)
      res.end()
    }
  })

  router.get('/error/timeout', function(req, res) {
    setTimeout(() => {
      res.json({
        msg: `hello world`
      })
    }, 3000)
  })
}

function registerExtendRouter() {
  router.get('/extend/get', function(req,res) {
    res.json(req.body)
  })
  router.post('/extend/post', function(req,res) {
    res.json(req.body)
  })
  router.options('/extend/options', function(req,res) {
    res.json(req.body)
  })
  router.delete('/extend/delete', function(req,res) {
    res.json(req.body)
  })
  router.head('/extend/head', function(req,res) {
    res.json(req.body)
  })
  router.put('/extend/put', function(req,res) {
    res.json(req.body)
  })
  router.patch('/extend/patch', function(req,res) {
    res.json(req.body)
  })
  router.get('/extend/user', function(req,res) {
    res.json({
      code:0,
      message:'ok',
      result:{
        name:"jack",
        age:18
      }
    })
  })
}


app.use(router)


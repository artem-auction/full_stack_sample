var express = require('express')
var http = require('http')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')

mongoose.connect(process.env.MONGODB)
mongoose.connection.on('error', (err) => {
  console.error(err)
  setTimeout(() => mongoose.connect(process.env.MONGODB), 5000)
})

var Properties = mongoose.model('properties', mongoose.Schema({
}))

var app = express()

app.use('/public', express.static(process.cwd() + '/src/public'))
app.use(bodyParser.json())

app.get('/api/properties/:id', function (req, res) {
  Properties.findOne({ _id: req.params.id }, function (err, property) {
    // return res.json({ test: true })
    if (err) return res.status(500).json(err)
    if (property) return res.json(property.toObject())
    return res.status(404).json({ status: 'NOT_FOUND' })
  })
})

app.get('/api/properties/', function (req, res) {
  Properties.find({ }, function (err, property) {
    // return res.json({ test: true })
    if (err) return res.status(500).json(err)
    if (property) return res.json(property)
    return res.status(404).json({ status: 'NOT_FOUND' })
  })
})

app.get('/', function (req, res) {
  res.send(`
    <html>
      <head>
        <link href="/public/styles.css" rel="stylesheet"/>
        <script src="/public/app.js"></script>
      </head>
      <body>
        <div>Hello World!</div>
        <a href="/public/page2.html">One more page</a>
        <h1>Java API Call</h1>
        <pre class="box" id="java_data"></pre>
        <h1>NodeJS API Call</h1>
        <pre class="box" id="node_data"></pre>
      </body>
    </html>
  `)
})

http.createServer(app).listen(3000)

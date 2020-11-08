add = require('./add.js')
sub = require('./sub.js')
mul = require('./mul.js')
div = require('./div.js')
var express = require('express')
const fs = require('fs');
var html = ""
var result = "Result will appear here"
var a = 0
var b = 0
fs.readFile('./index.html', (err, data) => {
 if (err) {
 console.log("Error: Could not read file.")
 throw err
 }
 html = data.toString()
})
const server = express()
server.use(express.urlencoded({
 extended: true
}))
function template(html, result, a, b) {
 return html.replace('{{RESULT}}', result)
 .replace('{{VALUE1}}', a)
 .replace('{{VALUE2}}', b)
}
function operate(oper, a, b) {
 switch (oper) {
 case '+':
 return add(a, b)
 case '-':
 return sub(a, b)
 case '*':
 return mul(a, b)
 case '/':
 return div(a, b)
 }
}
server.get('/', (req, res) => {
 res.writeHeader(200, {"Content-Type": "text/html"})
 res.write(template(html, result, a, b))
})
server.post('/', (req, res) => {
 res.writeHeader(200, {"Content-Type": "text/html"})
 res.write(template(html,
 req.body.a + " " + req.body.oper + " " + req.body.b + " = " +
 operate(req.body.oper, parseFloat(req.body.a),
parseFloat(req.body.b)),
 req.body.a, req.body.b))
})
server.listen(3005)
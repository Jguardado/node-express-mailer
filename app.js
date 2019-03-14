var express = require('express');
var path = require('path')
var bodyParser = require('body-parser')
var nodemailer = require('nodemailer');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// NOTE: Setting letting Jade know where our views will be stored
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade')

app.get('/', function(req, res) {
  res.render('index', {title: "Welcome Folks!"})
})

app.get('/about', function(req, res) {
  res.render('about')
})

app.get('/contact', function(req, res) {
  res.render('contact')
})

app.post('/contact/send', function(req, res) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'juanstest0922@gmail.com',
      // NOTE: Removing passowrd for obvious reasons
      pass: ''
    }
  })

  var mailOptions = {
    from: 'Juan Guardado <juanstest0922@gmail.com>',
    to: 'jguardado85@gmail.com',
    subject: "Website submission",
    text: 'You have a submission with teh following details... name:' + req.body.name + ' Email: ' + req.body.email + ' message: ' + req.body.message,
    html: '<p>You have a submission with teh following details...</p><ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li></ul>'
  }

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
      console.error("Error: ", err)
      res.redirect('/')
    } else {
      console.log('message Sent: ', info.response)
      res.redirect('/')
    }
  })
});

app.listen(3000)
console.log("listening on port: 3000")

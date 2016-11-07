const http = require('http'),
fs = require('fs'),
Twig = require("twig"),
express = require('express'),
compression = require('compression'),
minifyHTML = require('express-minify-html'),
app = express();

if(process.env.NODE_ENV == 'production') {
  /*app.use(minifyHTML({
    override: true,
    htmlMinifier: {
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: false,
      removeEmptyAttributes: true,
      minifyJS: true
    }
  }));*/

  app.use(compression({ level: 9, threshold: 0 }));
}

app.get('/', function(req, res) {
  res.render('index.twig', {
    production: process.env.NODE_ENV == 'production'
  });
});

app.use(express.static(__dirname));

app.listen(process.env.PORT || 1190);

console.log("server listening on " + (process.env.PORT || 1190));
console.log("Visit http://localhost:" + (process.env.PORT || 1190) + " in your browser");

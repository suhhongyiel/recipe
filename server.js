var path = require('path');
var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var $ = require('jQuery');
var app = express();
var port = process.env.PORT || 3000;

var itemData = require('./itemData');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.status(200).render('itemPage', {
    itemDatas: itemData
  });
});
//setting site-title
app.get('/', function (req, res) {

  var goBack_Home = req.params.itemPage;
  // fixing index.js
  res.status(200).render('itemPage', {
    // connecting index.js function
    // go back to Homepages

  });
});
// Setting...




app.get('/:recipePage', function (req, res) {
  var recipePage = req.params.recipePage;
  var index = itemData.findIndex(obj => obj.CAPTION === recipePage);

  res.status(200).render('recipePage', itemData[index]);
});

app.post('/addItem', function (req, res) {
  if (req.body && req.body.CATEGORIES && req.body.IMG_URL
    && req.body.CAPTION) {
    console.log("== Client added the following item:");
    console.log("  - bookmark:", req.body.BOOKMARK);
    console.log("  - categories:", req.body.CATEGORIES);
    console.log("  - ingredients:", req.body.INGREDIENTS);
    console.log("  - img_url:", req.body.IMG_URL);
    console.log("  - caption:", req.body.CAPTION);

    itemData.push({
      BOOKMARK: req.body.BOOKMARK,
      CATEGORIES: req.body.CATEGORIES,
      INGREDIENTS: req.body.INGREDIENTS,
      IMG_URL: req.body.IMG_URL,
      CAPTION: req.body.CAPTION,
      DIRECTIONS: req.body.DIRECTIONS
    });

    fs.writeFile(
      __dirname + '/itemData.json',
      JSON.stringify(itemData, 2, null),
      function (err) {
        if (!err) {
          res.status(200).send();
        } else {
          res.status(500).send("Failed to write data on server side");
        }
      }
    );

  } else {
    res.status(400).send("Requests needs more info");
  }
});

app.post('/deleteItem', function (req, res) {
  if (req.body && req.body.CAPTION) {
    console.log("== Client deleted the following item:");
    console.log("  - caption:", req.body.CAPTION);

    var index = -1;
    for (var i = 0; i < itemData.length; i++) {
      if (itemData[i].CAPTION === req.body.CAPTION) {
        index = i;
      }
    }
    if (index != -1) {
      itemData.splice(index, 1);

      fs.writeFile(
        __dirname + '/itemData.json',
        JSON.stringify(itemData, 2, null),
        function (err) {
          if (!err) {
            res.status(200).send();
          } else {
            res.status(500).send("Failed to write data on server side");
          }
        }
      );
    } else {
      res.status(400).send("Requests needs more info");
    }
  }
});

app.post('/addBookmark', function (req, res) {
  if (req.body && req.body.CAPTION) {
    console.log("== Client added bookmark on the following item:");
    console.log("  - caption:", req.body.CAPTION);

    var index = -1;
    for (var i = 0; i < itemData.length; i++) {
      if (itemData[i].CAPTION === req.body.CAPTION) {
        index = i;
      }
    }
    if (index != -1) {
      itemData[index].BOOKMARK = true;

      fs.writeFile(
        __dirname + '/itemData.json',
        JSON.stringify(itemData, 2, null),
        function (err) {
          if (!err) {
            res.status(200).send();
          } else {
            res.status(500).send("Failed to write data on server side");
          }
        }
      );
    } else {
      res.status(400).send("Requests needs more info");
    }
  }
});

app.post('/deleteBookmark', function (req, res) {
  if (req.body && req.body.CAPTION) {
    console.log("== Client deleted bookmark on the following item:");
    console.log("  - caption:", req.body.CAPTION);

    var index = -1;
    for (var i = 0; i < itemData.length; i++) {
      if (itemData[i].CAPTION === req.body.CAPTION) {
        index = i;
      }
    }
    if (index != -1) {
      itemData[index].BOOKMARK = false;

      fs.writeFile(
        __dirname + '/itemData.json',
        JSON.stringify(itemData, 2, null),
        function (err) {
          if (!err) {
            res.status(200).send();
          } else {
            res.status(500).send("Failed to write data on server side");
          }
        }
      );
    } else {
      res.status(400).send("Requests needs more info");
    }
  }
});

app.post('/updateIng', function (req, res) {
  if (req.body && req.body.CAPTION && req.body.INGREDIENTS) {
    console.log("== Client updated Ingredients on the following item:");
    console.log("  - caption:", req.body.CAPTION);

    var index = -1;
    for (var i = 0; i < itemData.length; i++) {
      if (itemData[i].CAPTION === req.body.CAPTION) {
        index = i;
      }
    }
    if (index != -1) {
      itemData[index].INGREDIENTS = req.body.INGREDIENTS;

      fs.writeFile(
        __dirname + '/itemData.json',
        JSON.stringify(itemData, 2, null),
        function (err) {
          if (!err) {
            res.status(200).send();
          } else {
            res.status(500).send("Failed to write data on server side");
          }
        }
      );
    } else {
      res.status(400).send("Requests needs more info");
    }
  }
});

app.post('/updateDir', function (req, res) {
  if (req.body && req.body.CAPTION && req.body.DIRECTIONS) {
    console.log("== Client updated Directions on the following item:");
    console.log("  - direction:", req.body.DIRECTIONS);

    var index = -1;
    for (var i = 0; i < itemData.length; i++) {
      if (itemData[i].CAPTION === req.body.CAPTION) {
        index = i;
      }
    }
    if (index != -1) {
      itemData[index].DIRECTIONS = req.body.DIRECTIONS;

      fs.writeFile(
        __dirname + '/itemData.json',
        JSON.stringify(itemData, 2, null),
        function (err) {
          if (!err) {
            res.status(200).send();
          } else {
            res.status(500).send("Failed to write data on server side");
          }
        }
      );
    } else {
      res.status(400).send("Requests needs more info");
    }
  }
});

app.get('*', function (req, res) {
  res.status(404).render('404');
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});

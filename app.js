var express = require('express'),
	engine = require('ejs-mate'),
	methodOverride = require('method-override'),
	bodyParser = require('body-parser'),
    app = express();

app.engine('ejs', engine);
 
app.set('views',__dirname + '/views');
app.set("view engine", "ejs");

//javascript link
app.use(express.static(__dirname + "/public"));

var library = [{
        bookID: 1000,
        title: "Alice's Adventures in Wonderland",
        author: 'Lewis Carroll',
        year: 1865
    }];
var title;
var author;
var year;
var bookID = 1000;
var certainBook;


// method-override
app.use(methodOverride('_method'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // for parsing application/json

app.get('/', function(req, res) {
    res.render('index', {
        library: library
    });
});

// Add one book
app.post('/book', function (req, res) {
	title = req.body.title;
	author = req.body.author;
	year = req.body.year;
	bookID += 1;
	newBook = {
        bookID: bookID,
        title: title,
        author: author,
        year: year
    };
    library.push(newBook);
    console.log(req.body);
    if(!book){
		res.render('404');
	}
	res.redirect("/");
});

// Get one book

app.get('/book/:id/show', function(req, res) {
    var id = req.params.id;
	library.forEach(function (el) {
		if(el.bookID === Number(id)) {
			book = el;
		}
	});
    res.render('show', {
        book: book
    });
});

// Update one book
app.get('/book/:id/edit', function (req, res) {
	var id = req.params.id;
	library.forEach(function (el) {
		if(el.bookID === Number(id)) {
			book = el;
		}
	});
	if(!book){
		res.render('404');
	}
	res.render('edit', {
        book: book
    });

});

app.put('/book/:id', function (req, res) {
var id = req.params.id;
var title = req.body.title,
	author = req.body.author,
	year = req.body.year;

	library.forEach(function (el) {
		if(el.bookID === Number(id)) {
			el.title = title;
			el.author = author;
			el.year = year;
			book = el;
		}
	});
	if(!book){
		res.render('404');
	}

	res.redirect("/");
});

// Delete one book
app.delete('/book/:id', function (req, res) {
var id = req.params.id;
	library.forEach(function (el) {
		if(el.bookID === Number(id)) {
			library.splice(library.indexOf(el), 1);	
		}
	});
	if(!book){
		res.render('404');
	}
	res.redirect("/");

});



app.listen(3000, function() {
    console.log("Starting a server on localhost: 3000");
});
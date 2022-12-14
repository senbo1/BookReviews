const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Book = require('./models/Book');
const { bookSchema } = require('./schemas.js');
const methodOverride = require('method-override');
const engine = require('ejs-mate');
const wrapAsync = require('./utils/wrapAsync');
const ExpressError = require('./utils/ExpressError');

mongoose
	.connect('mongodb://127.0.0.1/book-reviews')
	.then(() => console.log('Database Connected!'))
	.catch(error => console.log(error));

const app = express();

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const validateBook = (req, res, next) => {
	const { error } = bookSchema.validate(req.body);
	if (error) {
		const msg = error.details.map(el => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

app.get('/', (req, res) => {
	res.render('home');
});

app.get('/books', wrapAsync(async (req, res) => {
	const books = await Book.find({});
	res.render('books/index', { books });
}));

app.get('/books/new', wrapAsync(async (req, res) => {
	res.render('books/new');
}));

app.post('/books', validateBook, wrapAsync(async (req, res) => {
	const book = new Book(req.body.book);
	await book.save();
	res.redirect(`/books/${book._id}`);
}));

app.get('/books/:id', wrapAsync(async (req, res) => {
	const book = await Book.findById(req.params.id);
	res.render('books/show', { book });
}));

app.get('/books/:id/edit', wrapAsync(async (req, res) => {
	const book = await Book.findById(req.params.id);
	res.render('books/edit', { book });
}));

app.put('/books/:id', validateBook, wrapAsync(async (req, res) => {
	const { id } = req.params;
	await Book.findByIdAndUpdate(id, { ...req.body.book });
	res.redirect(`/books/${id}`);
}));

app.delete('/books/:id', wrapAsync(async (req, res) => {
	const { id } = req.params;
	await Book.findByIdAndDelete(id);
	res.redirect('/books');
}));

app.all('*', (req, res, next) => {
	next(new ExpressError('404! PAGE NOT FOUND Senpai', 404));
});

app.use((err, req, res, next) => {
	const { statusCode = 500 } = err;
	if (!err.message) err.message = 'Something went wrong Senpai';
	res.status(statusCode).render('error', { err });
});

app.listen(3000, () => {
	console.log('Serving on PORT 3000!');
});

const mongoose = require('mongoose');
const Book = require('./models/Book');

mongoose
  .connect('mongodb://127.0.0.1/book-reviews')
  .then(() => console.log('Database Connected'))
  .catch((error) => console.log(error));

books = [
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    image:
      'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.daimanuel.com%2Fwp-content%2Fuploads%2F2016%2F05%2Fthe-alchemist-book-cover.jpg&f=1&nofb=1&ipt=0dc4b78db7553b8c66aa8d8c2fb9cb308674cf31291e2a5bbdfa0a8652543e2f&ipo=images',
    description:
      'A novel about a young shepherd boy who embarks on a journey to find his "Personal Legend" and achieve his dreams, and offers insights into the nature of destiny, the power of love, and the importance of following our hearts.',
  },
  {
    title: 'The Subtle Art of Not Giving a F*ck',
    author: 'Mark Manson',
    image:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fkbimages1-a.akamaihd.net%2F8bd1ed40-c139-41e4-be69-c93f22ffbeab%2F1200%2F1200%2FFalse%2Fthe-subtle-art-of-not-giving-a-f-ck-2.jpg&f=1&nofb=1&ipt=097f7fd04723f3a1c3f1dea70f2432dc239967b0bd5417d6cc4cdee0df55b2f0&ipo=images',
    description:
      'The "subtle art of not giving a fuck" is a mindset that prioritizes personal happiness and fulfillment over pleasing others.',
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    image:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fn2.sdlcdn.com%2Fimgs%2Fi%2F9%2Fu%2FAtomic-Habits-SDL956916266-1-67ed8.jpeg&f=1&nofb=1&ipt=36670d097544b96e75db940e783e3b3df9330cbd772dcbe72311ad74b7810379&ipo=images',
    description:
      'A book that teaches readers how to form good habits and break bad ones, and offers practical strategies for building a successful and fulfilling life.',
  },
  {
    title: 'Deep Work',
    author: 'Cal Newport',
    image:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.authentic.com.au%2Fwp-content%2Fuploads%2F2020%2F05%2FDeep-Work-By-Cal-Newport-Free-PDF-eBook-Summary.jpg&f=1&nofb=1&ipt=70d9669e22b67a9aae7e1f8e0ac7dd9cbe7c2a6f305d1e84d52880828b20d579&ipo=images',
    description:
      'A book that explores the value of focused, distraction-free work, and offers strategies for mastering this skill and achieving greater success and fulfillment in your career and life.',
  },
];


const SeedDB = async() => {
    // const res = await Book.deleteMany({});
    // console.log(res.deletedCount);
    for (let i = 0; i < books.length; i++) {
      const book = new Book(books[i]);
      await book.save();
    }
}

SeedDB().then(() => {
    mongoose.connection.close();
})
const Joi = require('joi');
module.exports.bookSchema = Joi.object({
    book: Joi.object({
        title: Joi.string().required(),
        author: Joi.string().required(),
        image: Joi.string().required(),
        description: Joi.string().required(),
    }).required(),
});

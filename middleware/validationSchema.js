// // import Joi from 'joi';
// const Joi = require('joi');

const Joi = require('joi');


const userValidationSchema = Joi.object({
    username: Joi.string().alphanum().min(4).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    phone: Joi.string().pattern(new RegExp('^(012|011|010)[0-9]{8}$')).required(),
    gender: Joi.string().valid('male', 'female').required(),
    roles: Joi.string().valid('admin', 'user').default('user'),
});

const validationMiddleware = (req, res, next) => {
    const { error } = userValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ msg: error.details[0].message });
    }
    next();
};

module.exports=validationMiddleware


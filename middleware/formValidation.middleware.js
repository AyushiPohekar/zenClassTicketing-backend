const Joi = require("joi");


const pin = Joi.number().min(10000).max(999999).required();
const phone = Joi.number().min(400000001).max(500000001).required();

const newPassword = Joi.string().min(3).max(30).required();

const shortStr = Joi.string().min(2).max(50);
const longStr = Joi.string().min(2).max(1000);
const dt = Joi.date();








const createNewQueryValidation = (req, res, next) => {
	const schema = Joi.object({
		subject: shortStr.required(),
        category:shortStr.required(),
        subCategory:shortStr.required(),
        description:longStr.required(),
        category:shortStr.required(),
        preferredLanguage:shortStr.required(),
    
            from: shortStr.required(),
            till:shortStr.required() 
      
      
		
	});

	console.log(req.body);
	const value = schema.validate(req.body);

	if (value.error) {
		return res.json({ status: "error", message: value.error.message });
	}

	next();
};
// const replyQueryMessageValidation = (req, res, next) => {
// 	const schema = Joi.object({
// 		sender: shortStr.required(),
// 		message: longStr.required(),
// 	});

// 	console.log(req.body);
// 	const value = schema.validate(req.body);

// 	if (value.error) {
// 		return res.json({ status: "error", message: value.error.message });
// 	}

// 	next();
// };

// const newUserValidation = (req, res, next) => {
// 	const schema = Joi.object({
// 		name: shortStr.required(),
// 		company: shortStr.required(),
// 		address: shortStr.required(),
// 		phone: phone,
// 		email: shortStr.required(),
// 		password: shortStr.required(),
// 	});

// 	const value = schema.validate(req.body);

// 	if (value.error) {
// 		return res.json({ status: "error", message: value.error.message });
// 	}

// 	next();
// };

module.exports = {
    createNewQueryValidation,
  

};
const Joi = require('joi');

const schemaAddContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.number().integer().min(1).max(45).required(),
  phone: Joi.boolean().optional(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  email: Joi.number().integer().min(1).max(45).optional(),
  phone: Joi.boolean().optional(),
});

const validation = (shema, obj, next) => {
  const { error } = shema.validate(obj);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: 400,
      message: `Filed: ${message.replace(/"/g, '')}`,
    });
  }
  next();
};

module.exports.addContact = (req, res, next) => {
  return validation(schemaAddContact, req.body, next);
};

module.exports.updateContact = (req, res, next) => {
  return validation(schemaUpdateContact, req.body, next);
};

import Joi from "joi";

export const schemaRegist = Joi.object({
  username: Joi.string().alphanum().min(1).max(40).required(),
  password: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  nama: Joi.string().min(1).max(100).required(),
  nip: Joi.string()
    .pattern(/^\d{8,20}$/)
    .required(),
});

export const schemaLogin = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(8).required(),
  email: Joi.string().email(),
});

export const schemaAdd = Joi.object({
  username: Joi.string().alphanum().min(1).max(40).required(),
  password: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  nama: Joi.string().min(1).max(100).required(),
  nip: Joi.string()
    .pattern(/^\d{8,20}$/)
    .required(),
  level: Joi.string()
    .valid("admin", "super admin", "user", "verifikator")
    .default("user"),
});

export const schemaEdit = Joi.object({
  username: Joi.string().alphanum().min(1).max(40),
  password: Joi.string().min(8),
  email: Joi.string().email(),
  nama: Joi.string().min(1).max(100),
  nip: Joi.string().pattern(/^\d{8,20}$/),
  level: Joi.string()
    .valid("admin", "super admin", "user", "verifikator")
    .default("user"),
});

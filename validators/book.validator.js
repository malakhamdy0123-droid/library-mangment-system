const { z } = require("zod");

const bookSchema = z.object({
  title: z.string().trim().min(1).max(200),

  author: z.string().trim().min(1).max(150),

  totalCopies: z.number().int().min(1).max(10000)
});

const updateBookSchema = z.object({
  title: z.string().trim().min(1).max(200).optional(),

  author: z.string().trim().min(1).max(150).optional(),

  totalCopies: z.number().int().min(1).max(10000).optional()
}).refine(
  (data) => Object.keys(data).length > 0,
  {
    message: "At least one field must be provided"
  }
);

module.exports = {
  bookSchema,
  updateBookSchema
};
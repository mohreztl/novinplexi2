import { z } from 'zod';

export const ReviewSchema = z.object({
  productId: z.string()
    .min(1, "شناسه محصول الزامی است")
    .refine(val => /^[0-9a-fA-F]{24}$/.test(val), {
      message: "شناسه محصول نامعتبر است"
    }),
  rating: z.number()
    .min(1, "حداقل امتیاز 1 است")
    .max(5, "حداکثر امتیاز 5 است"),
  comment: z.string()
    .min(3, "نظر باید حداقل 3 کاراکتر باشد")
    .max(500, "نظر نمی‌تواند بیشتر از 500 کاراکتر باشد")
});

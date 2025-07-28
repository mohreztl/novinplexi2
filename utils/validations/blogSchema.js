import { z } from 'zod';

export const BlogSchema = z.object({
  title: z.string()
    .min(3, "عنوان باید حداقل 3 کاراکتر باشد")
    .max(100, "عنوان نمی‌تواند بیشتر از 100 کاراکتر باشد"),
  description: z.string()
    .min(10, "توضیحات باید حداقل 10 کاراکتر باشد"),
  excerpt: z.string()
    .min(10, "خلاصه باید حداقل 10 کاراکتر باشد")
    .max(300, "خلاصه نمی‌تواند بیشتر از 300 کاراکتر باشد"),
  quote: z.string().optional(),
  category: z.string()
    .min(1, "دسته‌بندی الزامی است"),
  images: z.array(z.string())
    .min(1, "حداقل یک تصویر الزامی است"),
  authorId: z.string()
    .min(1, "شناسه نویسنده الزامی است")
});

import dbConnect from "@/utils/config/dbConnection";
import { NextResponse } from "next/server";
import Blog from "@/models/Blog";

export const dynamic = 'force-dynamic';

// GET - دریافت یک بلاگ بر اساس slug یا ID
export async function GET(req, { params }) {
  try {
    await dbConnect();
    
    const { slug } = params;
    
    if (!slug) {
      return NextResponse.json(
        { success: false, error: "slug یا ID الزامی است" },
        { status: 400 }
      );
    }
    
    // بررسی اینکه آیا پارامتر یک ObjectId است یا slug
    let blog;
    if (slug.match(/^[0-9a-fA-F]{24}$/)) {
      // اگر ObjectId است
      blog = await Blog.findById(slug);
    } else {
      // اگر slug است
      blog = await Blog.findOne({ slug });
    }
    
    if (!blog) {
      return NextResponse.json(
        { success: false, error: "مقاله پیدا نشد" },
        { status: 404 }
      );
    }
    
    // افزایش تعداد بازدید
    blog.views = (blog.views || 0) + 1;
    await blog.save();
    
    return NextResponse.json({
      success: true,
      blog
    });
    
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { success: false, error: "خطا در دریافت مقاله" },
      { status: 500 }
    );
  }
}

// PUT - آپدیت کردن بلاگ
export async function PUT(req, { params }) {
  try {
    await dbConnect();
    
    const { slug } = params;
    const body = await req.json();
    
    console.log('Edit - Received body:', JSON.stringify(body, null, 2));
    console.log('Edit - Slug parameter:', slug);
    
    if (!slug) {
      return NextResponse.json(
        { success: false, error: "slug یا ID الزامی است" },
        { status: 400 }
      );
    }

    // بررسی اینکه آیا پارامتر یک ObjectId است یا slug
    let currentBlog;
    if (slug.match(/^[0-9a-fA-F]{24}$/)) {
      // اگر ObjectId است
      currentBlog = await Blog.findById(slug);
    } else {
      // اگر slug است
      currentBlog = await Blog.findOne({ slug });
    }
    
    if (!currentBlog) {
      return NextResponse.json(
        { success: false, error: "مقاله پیدا نشد" },
        { status: 404 }
      );
    }

    // پردازش داده‌ها مشابه POST method
    const {
      title,
      category,
      description,
      content,
      excerpt,
      featuredImage,
      tags,
      status,
      author,
      seo
    } = body;
    
    // اعتبارسنجی داده‌های اصلی
    const finalContent = content || description || '';
    
    console.log('Edit validation check:', { 
      title: title, 
      titleExists: !!title, 
      content: content, 
      contentExists: !!content, 
      description: description, 
      descriptionExists: !!description, 
      finalContent: finalContent, 
      finalContentExists: !!finalContent 
    });
    
    if (!title || !finalContent) {
      console.log('Edit validation failed:', { title: !!title, content: !!content, description: !!description, finalContent: !!finalContent });
      return NextResponse.json(
        { success: false, error: 'عنوان و محتوا الزامی هستند', details: { title: !!title, finalContent: !!finalContent } },
        { status: 400 }
      );
    }
    
    // اگر author وجود ندارد، مقدار پیش‌فرض تنظیم کنیم
    const finalAuthor = author || {
      name: 'نوین پلکسی',
      avatar: '/default-avatar.png',
      bio: 'نویسنده مقالات نوین پلکسی'
    };
    
    // اگر excerpt وجود ندارد، از محتوا بسازیم
    const finalExcerpt = excerpt || (finalContent ? finalContent.substring(0, 200) + '...' : 'خلاصه مقاله');
    
    // اگر featuredImage وجود ندارد، تصویر پیش‌فرض تنظیم کنیم
    const finalFeaturedImage = featuredImage || '/placeholder.webp';
    
    // تبدیل tags از string به array
    const tagsArray = Array.isArray(tags) ? tags : [];

    // بررسی یکتا بودن slug جدید اگر تغییر کرده
    if (body.slug && body.slug !== slug) {
      const existingBlog = await Blog.findOne({ slug: body.slug });
      if (existingBlog) {
        return NextResponse.json(
          { success: false, error: "این slug قبلاً استفاده شده است" },
          { status: 400 }
        );
      }
    }
    
    const updateData = {
      title,
      slug: body.slug || slug,
      description: description || finalContent,
      content: finalContent,
      excerpt: finalExcerpt,
      category,
      tags: tagsArray,
      featuredImage: finalFeaturedImage,
      status: status || 'draft',
      author: {
        name: finalAuthor.name || 'نوین پلکسی',
        avatar: finalAuthor.avatar || '/default-avatar.png',
        bio: finalAuthor.bio || 'نویسنده مقالات نوین پلکسی'
      },
      seo: seo || {},
      updatedAt: new Date()
    };
    
    if (status === 'published') {
      updateData.publishedAt = new Date();
    }

    // آپدیت بلاگ
    let updatedBlog;
    if (slug.match(/^[0-9a-fA-F]{24}$/)) {
      // اگر ObjectId است
      updatedBlog = await Blog.findByIdAndUpdate(
        slug,
        updateData,
        { new: true, runValidators: true }
      );
    } else {
      // اگر slug است
      updatedBlog = await Blog.findOneAndUpdate(
        { slug },
        updateData,
        { new: true, runValidators: true }
      );
    }
    
    if (!updatedBlog) {
      return NextResponse.json(
        { success: false, error: "مقاله پیدا نشد" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: "مقاله با موفقیت آپدیت شد",
      blog: updatedBlog
    });
    
  } catch (error) {
    console.error("Error updating blog - Full error:", error);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: "عنوان یا slug تکراری است" },
        { status: 400 }
      );
    }
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      console.log('Edit validation errors:', validationErrors);
      return NextResponse.json(
        { success: false, error: `خطای اعتبارسنجی: ${validationErrors.join(', ')}` },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: "خطا در آپدیت مقاله", details: error.message },
      { status: 500 }
    );
  }
}

// DELETE - حذف بلاگ
export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    
    const { slug } = params;
    
    if (!slug) {
      return NextResponse.json(
        { success: false, error: "slug یا ID الزامی است" },
        { status: 400 }
      );
    }
    
    // بررسی اینکه آیا پارامتر یک ObjectId است یا slug
    let deletedBlog;
    if (slug.match(/^[0-9a-fA-F]{24}$/)) {
      // اگر ObjectId است
      deletedBlog = await Blog.findByIdAndDelete(slug);
    } else {
      // اگر slug است
      deletedBlog = await Blog.findOneAndDelete({ slug });
    }
    
    if (!deletedBlog) {
      return NextResponse.json(
        { success: false, error: "مقاله پیدا نشد" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: "مقاله با موفقیت حذف شد"
    });
    
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { success: false, error: "خطا در حذف مقاله" },
      { status: 500 }
    );
  }
}

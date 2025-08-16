import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Blog from "@/models/Blog";

// GET - دریافت همه مقالات
export async function GET(request) {
  try {
    await connectToDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const status = searchParams.get('status');
    
    // ساخت query
    const query = {};
    if (category) {
      query.category = category;
    }
    if (status) {
      query.status = status;
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } }
      ];
    }
    
    const skip = (page - 1) * limit;
    
    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    
    const total = await Blog.countDocuments(query);
    
    return NextResponse.json({
      success: true,
      data: blogs,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      }
    });
    
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { success: false, error: 'خطا در دریافت مقالات' },
      { status: 500 }
    );
  }
}

// POST - ایجاد مقاله جدید
export async function POST(request) {
  try {
    await connectToDB();
    
    const body = await request.json();
    const {
      title,
      slug,
      description,
      content,
      excerpt,
      category,
      tags,
      featuredImage,
      status = 'draft',
      author,
      seo
    } = body;

    // اعتبارسنجی داده‌های اصلی
    if (!title || !description || !content || !author) {
      return NextResponse.json(
        { success: false, error: 'عنوان، توضیحات، محتوا و نویسنده الزامی هستند' },
        { status: 400 }
      );
    }
    
    // بررسی یکتا بودن slug
    if (slug) {
      const existingBlog = await Blog.findOne({ slug });
      if (existingBlog) {
        return NextResponse.json(
          { success: false, error: 'این نامک قبلاً استفاده شده است' },
          { status: 400 }
        );
      }
    }
    
    // تبدیل tags از string به array
    const tagsArray = Array.isArray(tags) ? tags : [];
    
    const blogData = {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9\u0600-\u06FF\s-]/g, '').replace(/\s+/g, '-'),
      description,
      content,
      excerpt: excerpt || description.substring(0, 200) + '...',
      category,
      tags: tagsArray,
      featuredImage,
      status,
      author: {
        name: author.name || 'نوین پلکسی',
        avatar: author.avatar || '/default-avatar.png',
        bio: author.bio || 'نویسنده مقالات نوین پلکسی'
      },
      seo: seo || {},
      publishedAt: status === 'published' ? new Date() : null
    };
    
    const newBlog = new Blog(blogData);
    const savedBlog = await newBlog.save();

    return NextResponse.json(
      { 
        success: true, 
        data: savedBlog,
        message: 'مقاله با موفقیت ایجاد شد'
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Error creating blog:', error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'نامک تکراری است' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'خطا در ایجاد مقاله' },
      { status: 500 }
    );
  }
}

// PUT - بروزرسانی مقاله
export async function PUT(request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { id, ...updateData } = body;
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'شناسه مقاله الزامی است' },
        { status: 400 }
      );
    }
    
    // اگر status به published تغییر کرد، publishedAt را تنظیم کن
    if (updateData.status === 'published' && !updateData.publishedAt) {
      updateData.publishedAt = new Date();
    }
    
    // تبدیل tags از string به array اگر نیاز باشد
    if (updateData.tags && typeof updateData.tags === 'string') {
      updateData.tags = updateData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    }
    
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('author', 'name email');
    
    if (!updatedBlog) {
      return NextResponse.json(
        { success: false, error: 'مقاله یافت نشد' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: updatedBlog,
      message: 'مقاله با موفقیت بروزرسانی شد'
    });
    
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { success: false, error: 'خطا در بروزرسانی مقاله' },
      { status: 500 }
    );
  }
}

// DELETE - حذف مقاله
export async function DELETE(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'شناسه مقاله الزامی است' },
        { status: 400 }
      );
    }
    
    const deletedBlog = await Blog.findByIdAndDelete(id);
    
    if (!deletedBlog) {
      return NextResponse.json(
        { success: false, error: 'مقاله یافت نشد' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'مقاله با موفقیت حذف شد'
    });
    
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { success: false, error: 'خطا در حذف مقاله' },
      { status: 500 }
    );
  }
}

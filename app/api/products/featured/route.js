import { connectToDB } from '@/lib/db';
import { Product } from '@/models/Product';
import { NextResponse } from 'next/server';

export const GET = async () => {
    try {
        await connectToDB();
        
        const products = await Product
            .find({})
            .sort({ createdAt: -1 })
            .limit(6)
            .lean();
        
        return NextResponse.json(products);
    } catch (error) {
        console.error('Error in /api/products/featured:', error);
        return NextResponse.json(
            { error: 'خطا در دریافت محصولات برتر' },
            { status: 500 }
        );
    }
};

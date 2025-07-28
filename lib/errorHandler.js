import { NextResponse } from "next/server";

export class ApiError extends Error {
  constructor(message, statusCode, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

export function errorHandler(error) {
  console.error('API Error:', error);

  if (error instanceof ApiError) {
    return NextResponse.json({
      error: error.message,
      ...(error.details && { details: error.details })
    }, { status: error.statusCode });
  }

  // MongoDB Duplicate Key Error
  if (error.code === 11000) {
    return NextResponse.json({
      error: 'این رکورد قبلاً ثبت شده است',
      field: Object.keys(error.keyPattern)[0]
    }, { status: 400 });
  }

  // MongoDB Validation Error
  if (error.name === 'ValidationError') {
    const details = Object.values(error.errors).map(err => ({
      field: err.path,
      message: err.message
    }));
    return NextResponse.json({
      error: 'اطلاعات نامعتبر',
      details
    }, { status: 400 });
  }

  // MongoDB CastError (Invalid ID)
  if (error.name === 'CastError') {
    return NextResponse.json({
      error: 'شناسه نامعتبر',
      field: error.path
    }, { status: 400 });
  }

  // Default Error Response
  return NextResponse.json({
    error: 'خطای سرور. لطفا دوباره تلاش کنید'
  }, { status: 500 });
}

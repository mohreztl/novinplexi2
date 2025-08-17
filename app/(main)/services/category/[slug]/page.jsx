'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import ServiceCard from '@/components/services/ServiceCard'
import CategoryHeader from '@/components/CategoryHeader'

export default function ServiceCategoryPage({ params }) {
  const searchParams = useSearchParams()
  const page = parseInt(searchParams.get('page') || '1')

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/categories/${params.slug}?page=${page}&type=service`,
          { cache: 'no-store' }
        )
        if (!res.ok) throw new Error('Failed to fetch')
        const json = await res.json()
        setData(json)
      } catch (err) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params.slug, page])

  if (loading) return <div className="text-center mt-10">در حال بارگذاری...</div>
  if (error || !data)
    return <div className="text-center mt-10 text-red-500">دسته‌بندی پیدا نشد.</div>

  return (
    <>
      {/* Category Header */}
      <CategoryHeader type="service" category={data} />
      
      <div className="mx-auto mt-10 px-4 max-w-screen-xl">
        <h1 className="text-xl font-bold mb-6 text-center text-primary">
          خدمات دسته {data.name || data.title}
        </h1>

        {!data.services || data.services.length === 0 ? (
          <p className="text-center text-gray-500">خدمتی در این دسته‌بندی موجود نیست.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {data.pagination && data.pagination.totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-2 flex-wrap">
            {Array.from({ length: data.pagination.totalPages }, (_, i) => {
              const pageNum = i + 1
              return (
                <Link
                  key={i}
                  href={`/services/category/${params.slug}?page=${pageNum}`}
                  className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                    data.pagination.currentPage === pageNum
                      ? 'bg-primary text-white'
                      : 'bg-white text-black hover:bg-gray-200'
                  }`}
                >
                  {pageNum}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}

import React from "react";
import { Input } from "../ui/input";
import Link from "next/link";
import Image from "next/image";
import { Star, ChevronLeft, SearchCheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const SearchDrawer = ({
  searchOpen,
  searchTerm,
  handleChange,
  handleSearchClose,
  firstTwelveItems,
  resultArr,
}) => {
  return (
    searchOpen && (
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[999] flex items-start justify-center pt-20"
        onClick={handleSearchClose}
      >
        <div
          className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden mx-4 border border-[#31508c]/10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-[#31508c] to-[#2a4374]">
            <h2 className="text-2xl font-bold text-white mb-4">
              جستجوی محصولات
            </h2>
            <div className="relative">
              <Input
                type="text"
                name="search"
                value={searchTerm.search}
                onChange={handleChange}
                placeholder="نام محصول را وارد کنید..."
                className="w-full pl-12 pr-4 py-3 rounded-full bg-white/90 border-none focus:ring-2 focus:ring-[#ffd700] text-[#31508c]"
                autoComplete="off"
                autoFocus
              />
              <SearchCheckIcon className="absolute left-4 top-3.5 h-5 w-5 text-[#31508c]" />
            </div>
          </div>

          {/* Results */}
          <div className="overflow-y-auto max-h-[calc(80vh-160px)]">
            {firstTwelveItems?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                {firstTwelveItems.map((prod) => (
                  <div
                    key={prod._id}
                    className="group bg-white rounded-lg border border-[#31508c]/10 hover:border-[#31508c]/30 transition-all"
                  >
                    <div className="flex h-full">
                      {/* Image */}
                      <div className="w-1/3 relative">
                        <Link
                          href={`/product/${prod.slug}`}
                          onClick={handleSearchClose}
                          className="block h-full"
                        >
                          <Image
                            src={prod.images[0] || "/placeholder-watch.jpg"}
                            alt={prod.name}
                            width={160}
                            height={160}
                            className="object-cover w-full h-full rounded-l-lg"
                          />
                        </Link>
                      </div>

                      {/* Details */}
                      <div className="w-2/3 p-4 flex flex-col justify-between">
                        <div>
                          <Link
                            href={`/product/${prod.slug}`}
                            onClick={handleSearchClose}
                          >
                            <h3 className="font-bold text-lg text-[#31508c] mb-1 hover:text-[#ffd700] transition-colors">
                              {prod.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-gray-600 mb-2">
                            {prod.brand}
                          </p>
                          <div className="flex items-center mb-2">
                            <Star className="h-4 w-4 text-[#ffd700] fill-current" />
                            <span className="text-sm text-gray-600 ml-1">
                              {prod.averageRating.toFixed(1)} ({prod.numReviews} نظر)
                            </span>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-lg font-bold text-[#31508c]">
                              تومان{prod.price}
                            </span>
                            {prod.originalPrice && (
                              <span className="text-sm text-gray-400 line-through">
                              تومان{prod.originalPrice}
                              </span>
                            )}
                          </div>
                          
                          <Link
                            href={`/product/${prod.slug}`}
                            onClick={handleSearchClose}
                            className="inline-flex items-center text-[#31508c] hover:text-[#ffd700] transition-colors"
                          >
                            مشاهده جزئیات
                            <ChevronLeft className="mr-1 h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                نتیجه‌ای یافت نشد
              </div>
            )}
          </div>

          {/* Footer */}
          {resultArr?.length > 12 && (
            <div className="p-4 border-t border-[#31508c]/10 bg-gray-50">
              <Button
                asChild
                className="w-full bg-[#31508c] hover:bg-[#2a4374] rounded-full"
              >
                <Link
                  href={`/searchedProducts/${searchTerm?.search}`}
                  onClick={handleSearchClose}
                >
                  نمایش همه نتایج ({resultArr.length})
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default SearchDrawer;
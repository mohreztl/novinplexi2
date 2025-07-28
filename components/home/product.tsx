<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {filteredProducts.map((product, index) => (
        <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-xl border border-blue-100 hover:shadow-2xl transition-all duration-300"
        >
            {/* برچسب‌های محصول */}
            <div className="absolute top-4 left-4 z-10 flex gap-2">
                {product.isNew && (
                    <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        جدید
                    </span>
                )}
                {product.discount > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {product.discount}% تخفیف
                    </span>
                )}
            </div>

            {/* تصویر محصول */}
            <div className="relative h-64 overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100">
                <div className="absolute inset-0 flex items-center justify-center">
                    {/* نمایش شماتیک محصول اکریلیک */}
                    <div className="relative w-48 h-48 bg-gradient-to-br from-blue-200/50 to-indigo-300/50 backdrop-blur-sm rounded-xl border border-white/50 shadow-lg">
                        <div className="absolute inset-4 bg-gradient-to-br from-blue-300/30 to-indigo-400/30 rounded-lg border border-white/30 flex items-center justify-center">
                            <div className="text-center p-4">
                                <div className="text-xl font-bold text-gray-800">
                                    {product.title.split(" ")[0]}
                                </div>
                                <div className="w-16 h-1 bg-blue-400 mx-auto my-2 rounded-full"></div>
                                <div className="text-xs text-gray-700">
                                    {product.title
                                        .split(" ")
                                        .slice(1)
                                        .join(" ")}
                                </div>
                            </div>
                        </div>

                        {/* جلوه شیشه‌ای */}
                        <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-gradient-to-br from-blue-400/40 to-indigo-500/40 backdrop-blur-sm border border-white/30"></div>
                        <div className="absolute bottom-3 left-3 w-8 h-8 rounded-full bg-gradient-to-br from-blue-400/40 to-indigo-500/40 backdrop-blur-sm border border-white/30"></div>
                    </div>
                </div>

                {/* دکمه‌های اکشن */}
                <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-blue-50 transition-colors">
                        <FiHeart className="text-gray-700" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-blue-50 transition-colors">
                        <FiEye className="text-gray-700" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center shadow-md hover:from-blue-700 hover:to-indigo-800 transition-all">
                        <FiShoppingCart className="text-white" />
                    </button>
                </div>
            </div>

            {/* محتوای محصول */}
            <div className="p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-bold text-lg text-gray-900 mb-1">
                            {product.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                            {product.description}
                        </p>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <div>
                        <span className="font-bold text-lg text-gray-900">
                            {product.price}
                        </span>
                        {product.discount > 0 && (
                            <span className="text-gray-400 text-sm line-through ml-2">
                                {Math.round(
                                    parseInt(product.price.replace(/,/g, "")) /
                                        (1 - product.discount / 100)
                                ).toLocaleString()}{" "}
                                تومان
                            </span>
                        )}
                    </div>

                    <button className="text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all shadow hover:shadow-lg">
                        افزودن به سبد
                    </button>
                </div>
            </div>
        </motion.div>
    ))}
</div>;

{
    /* دکمه مشاهده همه */
}

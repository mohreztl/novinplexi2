import React from "react";
import mongoose from "mongoose";
import { connectToDB } from "@/lib/db";
import TopProductSectionClient from "./TopProductSectionClient";

const TopProductSection = async () => {
    try {
        await connectToDB();
        
        const products = await mongoose
            .model("Product")
            .find({})
            .sort({ createdAt: -1 })
            .limit(6)
            .lean();

        return (
            <>
                <TopProductSectionClient products={products} />
            </>
        );
    } catch (error) {
        console.error("Error fetching products:", error);
        return (
            <>
                <TopProductSectionClient products={[]} />
            </>
        );
    }
};

export default TopProductSection;

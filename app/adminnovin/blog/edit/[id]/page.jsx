"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {Input} from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

const initialState = {
  title: "",
  description: "",
  excerpt: "",
  quote: "",
  category: "Songbirds",
  photo: {},
  blogId: "",
  newImage: "",
};

const EditBlog = ({ params }) => {
  const [state, setState] = useState(initialState);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await fetch(`/api/blog/${params.id}`);
        if (res.status === 200) {
          const blogData = await res.json();
          setState({
            ...state,
            title: blogData.title,
            description: blogData.description,
            excerpt: blogData.excerpt,
            quote: blogData.quote,
            category: blogData.category,
            photo: blogData.image,
            blogId: blogData._id,
          });
        } else {
          setError("Error fetching blog data");
        }
      } catch (error) {
        setError("Error fetching blog data");
      }
    }

    fetchBlog();
  }, [params.id]);

  if (status === "loading") {
    return <p>loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Access denied</p>;
  }

  const handleChange = (event) => {
    setError("");
    const { name, value, type, files } = event.target;
    if (type === "file") {
      setState({ ...state, [name]: files[0] });
    } else {
      setState({ ...state, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { newImage, title, category, description, excerpt, quote } = state;

    if (!title || !description || !category || !excerpt || !quote) {
      setError("Please fill out all required fields.");
      return;
    }

    if (newImage) {
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (newImage.size > maxSize) {
        setError("File size is too large. Please select a file under 5MB.");
        return;
      }
    }

    if (title.length < 4) {
      setError("Title must be at least 4 characters long.");
      return;
    }

    if (description.length < 20) {
      setError("Description must be at least 20 characters long.");
      return;
    }

    if (excerpt.length < 10) {
      setError("Excerpt must be at least 10 characters long.");
      return;
    }

    if (quote.length < 6) {
      setError("Quote must be at least 6 characters long.");
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      setSuccess("");

      const updateBlog = {
        title,
        description,
        excerpt,
        quote,
        category,
        authorId: session?.user?._id,
        image: newImage ? newImage : state.photo, // Handling image upload
      };

      const response = await fetch(`/api/blog/${params.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
        method: "PUT",
        body: JSON.stringify(updateBlog),
      });

      if (response?.status === 200) {
        setSuccess("Blog updated successfully.");
        setTimeout(() => {
          router.push(`/blog/${params.id}`);
        }, 1500);
      } else {
        setError("Error occurred while updating blog.");
      }
    } catch (error) {
      setError("Error occurred while updating blog.");
    }

    setIsLoading(false);
  };

  const handleCancleUploadImg = () => {
    setState({ ...state, ["newImage"]: "" });
  };

  return (
    <section className="container max-w-3xl">
      <h2 className="mb-5">
        <span className="special-word">Edit</span> Blog
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Title"
          type="text"
          name="title"
          placeholder="Write your title here..."
          onChange={handleChange}
          value={state.title}
        />

        <Textarea
          label="Description"
          rows="4"
          name="description"
          placeholder="Write your description here..."
          onChange={handleChange}
          value={state.description}
        />

        <Textarea
          label="Excerpt"
          rows="2"
          name="excerpt"
          placeholder="Write your excerpt here..."
          onChange={handleChange}
          value={state.excerpt}
        />

        <Textarea
          label="Quote"
          rows="2"
          name="quote"
          placeholder="Write your quote here..."
          onChange={handleChange}
          value={state.quote}
        />

        <div>
          <label className="block">Select an option</label>
          <select
            name="category"
            onChange={handleChange}
            value={state.category}
            className="block rounded-lg w-full p-3 bg-primaryColorLight"
          >
            <option value="Songbirds">Songbirds</option>
            <option value="Waterfowl">Waterfowl</option>
            <option value="Parrots">Parrots</option>
            <option value="Seabirds">Seabirds</option>
            <option value="Gamebirds">Gamebirds</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Upload Image</label>
          <input
            onChange={handleChange}
            type="file"
            name="newImage"
            accept="image/*"
          />

          {state.newImage ? (
            <div>
              <Image
                src={URL.createObjectURL(state.newImage)}
                priority
                alt="Sample image"
                width={100}
                height={100}
                className="w-32 mt-5"
              />
              <button onClick={handleCancleUploadImg}>Cancel</button>
            </div>
          ) : (
            <div>
              {state.photo?.url && (
                <div>
                  <Image
                    src={state.photo.url}
                    priority
                    alt="Sample image"
                    width={100}
                    height={100}
                    className="w-32 mt-5"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {error && <div className="text-red-700">{error}</div>}
        {success && <div className="text-green-700">{success}</div>}

        <button type="submit" className="btn">
          {isLoading ? "Loading..." : "Edit"}
        </button>
      </form>
    </section>
  );
};

export default EditBlog;

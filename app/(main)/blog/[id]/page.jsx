"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import moment from "moment-jalaali";
import axios from "axios";
import {
  AiFillHeart,
  AiOutlineComment,
  AiOutlineHeart,
  AiTwotoneCalendar,
} from "react-icons/ai";
import { BsFillPencilFill, BsTrash } from "react-icons/bs";

import demoImage from "@/public/profile.jpg";
import { Input } from "@/components/ui/input";

function splitParagraph(paragraph) {
  const MIN_LENGTH = 280;
  const sentences = paragraph.split(". ");

  let currentParagraph = "";
  let paragraphs = [];

  for (let i = 0; i < sentences.length; i++) {
    const sentence = sentences[i];
    const isLastSentence = i === sentences.length - 1;

    if (isLastSentence) {
      currentParagraph += sentence + " ";
    } else if (currentParagraph.length + sentence.length + 2 <= MIN_LENGTH) {
      currentParagraph += sentence + ". ";
    } else {
      paragraphs.push(<p key={paragraphs.length}>{currentParagraph.trim()}</p>);
      currentParagraph = sentence + ". ";
    }
  }

  if (currentParagraph) {
    paragraphs.push(<p key={paragraphs.length}>{currentParagraph.trim()}</p>);
  }

  return paragraphs;
}

export default function BlogDetailsPage({ params }) {
  const [blogDetails, setBlogDetails] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [blogLikes, setBlogLikes] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [blogComments, setBlogComments] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();
  const { data: session } = useSession();

  async function fetchBlog() {
    try {
      const response = await axios.get(`/api/blog/${params.id}`);
      if  (response.status === 200) {
   
        setBlogDetails(response.data) 
   
      }
      setIsLiked(blog?.likes?.includes(session?.user?._id));
      setBlogLikes(blog?.likes?.length || 0);
      setBlogComments(blog?.comments?.length || 0);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchBlog();
  }, []);

  const formattedTime = moment(blogDetails?.createdAt).format("jMMMM jD، jYYYY");

  const handleBlogDelete = async (imageId) => {
    const confirmModal = window.confirm("مطمئنی می‌خوای این پست رو حذف کنی؟");
    if (!confirmModal) return;
    try {
      setIsDeleting(true);
      const res = await fetch(`http://localhost:3000/api/blog/${params.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
      });
      if (res.status === 200) {
        router.refresh();
        router.push("/blog");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleLike = async () => {
    if (!session?.user) return alert("برای لایک کردن ابتدا وارد شوید");
    try {
      const res = await fetch(`http://localhost:3000/api/blog/${params.id}/like`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${session?.user?.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(null),
      });
      if (res.status === 200) {
        setIsLiked((prev) => !prev);
        setBlogLikes((prev) => (isLiked ? prev - 1 : prev + 1));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText) return setError("متن نظر الزامی است");
    try {
      setIsCommenting(true);
      setError("");
      const response = await fetch(`http://localhost:3000/api/blog/${params.id}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
        body: JSON.stringify({ text: commentText }),
      });
      if (response.status === 201) {
        setSuccess("نظر شما با موفقیت ثبت شد");
        setCommentText("");
        fetchBlog();
      } else {
        setError("خطا در ارسال نظر");
      }
    } catch (err) {
      console.log(err);
      setError("خطا در ارسال نظر");
    } finally {
      setIsCommenting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const res = await fetch(`http://localhost:3000/api/blog/${params.id}/comment/${commentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
      });
      if (res.status === 200) fetchBlog();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="container max-w-7xl py-10">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold text-primaryColor">{blogDetails?.title}</h1>
        <p className="text-gray-500 text-base">{blogDetails?.excerpt}</p>
        <p className="flex justify-center gap-3 text-sm text-gray-400">
          <span className="text-primaryColor">{blogDetails?.category}</span>
          <span className="flex items-center gap-1"><AiTwotoneCalendar />{formattedTime}</span>
        </p>
      </div>

      <div className="py-8">
        <Image
        src={(blogDetails?.images?.[0] || demoImage)}
          alt={blogDetails?.title ||""}
          width={900}
          height={500}
          className="rounded-lg mx-auto"
        />
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none prose-lg prose-img:rounded-lg" dangerouslySetInnerHTML={{ __html: blogDetails?.description }} />

      {blogDetails?.quote && (
        <blockquote className="border-l-4 border-primaryColor italic my-10 pl-5">
          {blogDetails.quote}
        </blockquote>
      )}

      <div className="flex justify-center gap-10 text-xl py-10">
        <div className="flex items-center gap-2 cursor-pointer" onClick={handleLike}>
          <p>{blogLikes}</p>
          {isLiked ? <AiFillHeart color="#ed5784" /> : <AiOutlineHeart />}
        </div>

        <div className="flex items-center gap-2">
          <p>{blogComments}</p>
          <AiOutlineComment />
        </div>
      </div>

      <div className="space-y-5">
        {!session?.user && <p className="text-red-500">برای ثبت نظر وارد شوید</p>}
        {session?.user && (
          <form onSubmit={handleCommentSubmit} className="space-y-2">
            <Input
              onChange={(e) => setCommentText(e.target.value)}
              value={commentText}
              name="comment"
              type="text"
              placeholder="نظر خود را بنویسید..."
            />
            <button type="submit" className="btn">
              {isCommenting ? "در حال ارسال..." : "ارسال نظر"}
            </button>
          </form>
        )}

        {blogDetails?.comments?.map((comment) => (
          <div key={comment._id} className="flex items-start gap-4 border-b border-gray-700 py-4">
            <Image
              src={comment?.user?.avatar?.url || demoImage}
              alt="avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex-1">
              <p className="font-bold text-whiteColor">{comment.user.name}</p>
              <p>{comment.text}</p>
            </div>
            {session?.user?._id === comment.user._id && (
              <BsTrash onClick={() => handleDeleteComment(comment._id)} className="text-red-500 cursor-pointer" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
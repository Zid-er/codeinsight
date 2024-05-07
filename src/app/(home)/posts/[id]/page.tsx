/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client"
import React from 'next'
import Image from 'next/image';
import user from '~/assets/user.png';
import Comment from '~/components/Comment';
import { CommentType } from '~/types/CommentType';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

type PostType = {
  id: number,
  title: string,
  description: string,
  authorName: string,
  tag: string,
  comments?: CommentType[]
}

const mockComments: CommentType[] = [
  {
    id: 1,
    authorName: "u/developer 1",
    authorId: 1,
    comment: "Lorem ipsum dolor sit amet consectetur. Convallis id gravida lacinia faucibus mattis. Sem enim vitae proin tristique rutrum eget duis at. At sit in quis ipsum aliquam in sed tellus nibh.",
    replies: [
      {
        id: 2,
        authorName: "u/developer 2",
        authorId: 2,
        comment: "Lorem Ipsum Lorem Ipsum Lorem Ipsum. Lorem Ipsum Lorem Ipsum Lorem Ipsum. Lorem Ipsum Lorem Ipsum Lorem Ipsum.",
        replies: [
          {
            id: 3,
            authorName: "u/developer 4",
            authorId: 4,
            comment: "Lorem Ipsum Lorem Ipsum Lorem Ipsum. Lorem Ipsum Lorem Ipsum Lorem Ipsum. Lorem Ipsum Lorem Ipsum Lorem Ipsum.",
          }
        ]
      }
    ]
  },
  {
    id: 4,
    authorName: "u/developer 2",
    authorId: 2,
    comment: "Lorem Ipsum Lorem Ipsum Lorem Ipsum. Lorem Ipsum Lorem Ipsum Lorem Ipsum. Lorem Ipsum Lorem Ipsum Lorem Ipsum.",
  }
]

const mockPost: PostType = {
  id: 1,
  authorName: "u/postAuthor",
  title: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Uno",
  description: `Lorem ipsum dolor sit amet consectetur. Convallis id gravida lacinia faucibus mattis. Sem enim vitae proin tristique rutrum eget duis at. At sit in quis ipsum aliquam in sed tellus nibh. Lorem ipsum dolor sit amet consectetur. Convallis id gravida lacinia faucibus mattis. Sem enim vitae proin tristique rutrum eget duis at.\nAt sit in quis ipsum aliquam in sed tellus nibh. Lorem ipsum dolor sit amet consectetur. Convallis id gravida lacinia faucibus mattis. Sem enim vitae proin tristique rutrum eget duis at. At sit in quis ipsum aliquam in sed tellus nibh. Lorem ipsum dolor sit amet consectetur. Convallis id gravida lacinia faucibus mattis.\nSem enim vitae proin tristique rutrum eget duis at. At sit in quis ipsum aliquam in sed tellus nibh. Lorem ipsum dolor sit amet consectetur. Convallis id gravida lacinia faucibus mattis. Sem enim vitae proin tristique rutrum eget duis at. At sit in quis ipsum aliquam in sed tellus nibh.`,
  tag: "javascript",
  comments: mockComments
}

const getPost = async (postId: string) => {
  try {
    const res = await axios.get<PostType>(`/api/post/${postId}`, { withCredentials: true })
    return res.data
  } catch (error: any) {
    throw new Error(error.response.data.message || "Error fetching post")
  }
}

const PostPage = () => {
  const { id } = useParams<{ id: string }>()
  const { data: post, error } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id),
    enabled: !!id,
    retry: false,
  })
  return (
    <div className="flex flex-col items-center py-12 px-12 lg:px-0 gap-2">
      {post && <> <div className="border w-full border-slate-200 dark:bg-primary dark:border-none rounded-lg px-8 py-4 flex flex-col gap-4 max-w-screen-lg">
        <div className="flex flex-col gap-2 flex-wrap">
          <div className="flex flex-row gap-2 items-center">
            <Image className="rounded-full" src={user} alt="user" width={32} height={32} />
            <p className="text-xs font-medium dark:text-neutral-200 text-white">{mockPost.authorName}</p>
          </div>
          <p className="text-3xl font-semibold dark:text-white">{post.title}</p>
          <p className="text-sm text-neutral-300">{post.description}</p>
        </div>
        <div className="flex flex-row justify-end bg-transparent">
          <p className={`border dark:border-[#282828] rounded-lg text-sm px-2 py-1 bg-transparent dark:text-neutral-200`}>{post.tag}</p>
        </div>
      </div>
        <div className="w-full max-w-screen-lg">
          <p className="font-bold py-4 dark:text-white">Comments</p>
          <div className="flex flex-col gap-4">
            {mockPost.comments && mockPost.comments.map(comment => {
              return (
                <Comment key={comment.id} comment={comment} />
              )
            })}
          </div>
        </div></>}
    </div>
  )
}

export default PostPage

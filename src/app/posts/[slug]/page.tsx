/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client"
import React from 'next'
import Image from 'next/image';
import user from '~/assets/user.png';
import Comment from '~/components/Comment';
import { CommentType } from '~/types/CommentType';

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

const PostPage = () => {
  // workaround for splitting description into paragraphs
  // because line breaks do not work in jsx
  const descriptionSlices = mockPost.description.split("\n")
  return (
    <div className="flex flex-col items-center py-12 px-12 lg:px-0 gap-2">
      <div className="border border-slate-200 dark:bg-primary dark:border-none rounded-lg px-8 py-4 flex flex-col gap-4 max-w-screen-lg">
        <div className="flex flex-col gap-2 flex-wrap">
          <div className="flex flex-row gap-2 items-center">
            <Image className="rounded-full" src={user} alt="user" width={32} height={32} />
            <p className="text-xs font-medium">{mockPost.authorName}</p>
          </div>
          <p className="text-3xl font-semibold">{mockPost.title}</p>
          {descriptionSlices.map((slice, i) => (
            <p className="text-sm text-neutral-300" key={i}>{slice}</p>
          ))}
        </div>
        <div className="flex flex-row justify-end bg-transparent">
          <p className={`border dark:border-[#282828] rounded-lg text-sm px-2 py-1 bg-transparent`}>{mockPost.tag}</p>
        </div>
      </div>
      <div className="w-full max-w-screen-lg">
        <p className="font-bold py-4">Comments</p>
        <div className="flex flex-col gap-4">
          {mockPost.comments && mockPost.comments.map(comment => {
            return (
              <Comment key={comment.id} comment={comment} />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default PostPage

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Card from "~/components/Card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from "~/components/ui/dropdown-menu";
import { PostT } from "~/types/PostT";
import dar from '~/assets/darrow.svg'
import Image from 'next/image';

export default function Home() {
  const mock_data = [
    {
      id: 1,
      title: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Uno",
      description: "Lorem Ipsum Lorem Ipsum Lorem Ipsum. Lorem Ipsum Lorem Ipsum Lorem Ipsum. Lorem Ipsum Lorem Ipsum Lorem Ipsum.",
      tag: "javascript"
    },
    {
      id: 2,
      title: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Dos",
      description: "Lorem Ipsum Lorem Ipsum Lorem Ipsum. Lorem Ipsum Lorem Ipsum Lorem Ipsum. Lorem Ipsum Lorem Ipsum Lorem Ipsum.",
      tag: "c++"
    },
    {
      id: 3,
      title: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Tres",
      description: "Lorem Ipsum Lorem Ipsum Lorem Ipsum. Lorem Ipsum Lorem Ipsum Lorem Ipsum. Lorem Ipsum Lorem Ipsum Lorem Ipsum. Lorem Ipsum Lorem Ipsum Lorem Ipsum. Lorem Ipsum Lorem Ipsum Lorem Ipsum. Lorem Ipsum Lorem Ipsum Lorem Ipsum. Lorem Ipsum Lorem Ipsum Lorem Ipsum. Lorem Ipsum Lorem Ipsum Lorem Ipsum. Lorem Ipsum Lorem Ipsum Lorem Ipsum. Lorem Ipsum Lorem Ipsum Lorem Ipsum. Lorem Ipsum Lorem Ipsum Lorem Ipsum. Lorem Ipsum Lorem Ipsum Lorem Ipsum. Lorem Ipsum Lorem Ipsum Lorem Ipsum. Lorem Ipsum Lorem Ipsum Lorem Ipsum. Lorem Ipsum Lorem Ipsum Lorem Ipsum.",
      tag: "c#"
    }
  ]
  return (
    <div className="flex flex-col py-12 gap-2 md:px-32">
      <div className="flex flex-row gap-1 items-center w-full">
        <button className="px-6 py-2 bg-primary rounded">All*</button>
        <button className="px-4 py-2 bg-primary rounded flex flex-row gap-4 justify-center items-center">
          <p className="bg-transparent">Tag</p>
          <Image src={dar} alt="dbl d arrow" width="10" height="10" className="bg-transparent" />
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger>Tags</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Languages</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Javascript</DropdownMenuItem>
            <DropdownMenuItem>C++</DropdownMenuItem>
            <DropdownMenuItem>C#</DropdownMenuItem>
            <DropdownMenuItem>Golang</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col gap-2">
        {
          mock_data.map((post:PostT) => {
            return <Card key={post.id} {...post} />
          })
        }
      </div>
    </div>
  );
}

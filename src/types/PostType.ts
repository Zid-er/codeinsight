interface image {
  id: number,
  url: string,
  order: number | null,
  postId: number
}



export 
interface PostType {
  id: number,
  title: string,
  description: string,
  tag: string,
  imgUrl?: string,
  imgUrls?: image[]
}
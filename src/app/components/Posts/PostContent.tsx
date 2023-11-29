import React from 'react'
import parse from 'html-react-parser';
import Link from 'next/link';
import Image from 'next/image';
import { Post } from "@/app/models/Posts"

function PostContent(params: { post: Post }) {

  //console.log(params.post)

  const StringToDate = () => {
    let toDate: Date = new Date(params.post.node.date || "")
    console.log(toDate)
    return toDate.getDate()+"/"+(toDate.getMonth()+1)+"/"+toDate.getFullYear()
  }

  return (
    <div>
      <Link href={"/blog/"+params.post.node.postId} className='h-full'>
        <div className='bg-slate-200 hover:bg-slate-300 dark:bg-slate-900 dark:hover:bg-slate-800 transition linear delay-150 rounded-sm mr-3 min-h-[275px] max-h-[275px] h-auto flex flex-col relative'>
            <div className='opacityDiv min-h-[275px] h-auto p-5'>
              <div className='flex justify-between'>
                <div className="font-bold text-lg mb-3">{parse(params.post.node.title)}</div>
                <div>{StringToDate()}</div>
              </div>
              <div>
                {params.post.node.featuredImage?.node.sourceUrl &&
                  <Image 
                    src={params.post.node.featuredImage?.node.sourceUrl}
                    height={100}
                    width={100}
                    alt={params.post.node.title}
                  />
                }
              </div>
              <div className="text-ellipsis">{parse(params.post.node.excerpt.substring(0, 300))}</div>
            </div>
            <div className="self-end absolute bottom-3 right-5">Leer más</div>
        </div>
      </Link>
    </div>
  )
}

export default PostContent
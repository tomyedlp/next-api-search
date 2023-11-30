import React from 'react'
import parse from 'html-react-parser';
import { commentNode } from "@/app/models/Posts"
import { FaReply } from "react-icons/fa";

function CommentContent(params: { comment: commentNode, setShowReply: Function | null, mL: number }) {

  const StringToDate = () => {
    let toDate: Date = new Date(params.comment.node.date || "")
    return toDate.getDate()+"/"+(toDate.getMonth()+1)+"/"+toDate.getFullYear()
  }

  const bgColor = params.mL === 0 ? "bg-slate-200 dark:bg-slate-950" : "bg-slate-300 dark:bg-slate-800"

    return (
        <div style={{ marginLeft: params.mL+"px" }} className={"text-sm mt-3 p-2 "+bgColor+" border-solid border-slate-700 border-2"} data-commentid={params.comment.node.commentId}>
            <div className='flex'>
                <div>
                    {StringToDate()} - &nbsp;
                </div>
                <div>
                    {params.comment.node.author.node.name}
                </div>
            </div>
            <div className='mb-3'>{parse(params.comment.node.content)}</div>
            <FaReply onClick={() => params.setShowReply !== null ? params.setShowReply((prevState: boolean) => !prevState) : ""} className="cursor-pointer hover:scale-125 transition ease-linear delay-0" />
        </div>
    )
    
}

export default CommentContent
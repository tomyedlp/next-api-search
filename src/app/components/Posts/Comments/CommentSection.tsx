import React, { useState, JSX } from 'react'
import { commentNode } from "@/app/models/Posts"
import ReplySection from '../ReplySection';
import CommentContent from '@/app/components/Posts/Comments/CommentContent';

function CommentSection(params: { comments: Array<commentNode>, comment: commentNode, commentId: number | null }) {

  const loopingComments = (cId: number, mL: number): (JSX.Element | undefined)[] => {
    return params.comments.map((comment, id) => {
        if(comment.node.parent !== null) {
            if(comment.node.parent.node.commentId === cId) {
                const [showReply, setShowReply] = useState(false);
                return (
                    <div key={id}>
                        <CommentContent mL={mL} comment={comment} setShowReply={setShowReply} />
                        <ReplySection mL={mL} showReply={showReply} commentid={comment.node.commentId} />
                        {loopingComments(comment.node.commentId, mL+25)}
                    </div>
                )
            }
        }
    })
}

  const appendComment = () => {
    const [showReply, setShowReply] = useState(false);
    return (
        <>
            {params.comment.node.parentId === null &&
                <>
                    <CommentContent mL={0} comment={params.comment} setShowReply={setShowReply} />
                    <ReplySection mL={0} showReply={showReply} commentid={params.comment.node.commentId} />
                    {loopingComments(params.comment.node.commentId, 25)}
                </>
            }
        </>
    )
  }

    return appendComment()
    
}

export default CommentSection
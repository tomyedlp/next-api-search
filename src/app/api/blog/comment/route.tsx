import { NextResponse } from "next/server";



export async function POST(request: Request) {
  
    const data = await request.json();
    console.log(data.comment, data.commentid)

    const subpath = data.pathname.split("/");
    let commentid = (data.commentid === undefined) ? "" : "parent: "+data.commentid 

      const createComment = {
        query: `
          mutation CREATE_COMMENT {
            createComment(input: {
              status: APPROVE,
              approved: "1",
              commentOn: ${subpath[2]},
              content: "${data.comment}", 
              author: "Anonymous",
              ${commentid}
            }) {
              success
              comment {
                id
                date
                parentId
                commentId
                content
                author {
                  node {
                    name
                  }
                }
                parent {
                  node {
                    commentId
                  }
                }
              }
            }
          }
        `
      }

    const response = await fetch(`${process.env.WP_GRAPHQL_URL}`, {
        method: "POST",
        body: JSON.stringify(createComment),
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store"
      });
      const result = await response.json();

      console.log(result)

    return NextResponse.json(result)
}
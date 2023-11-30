import { NextResponse } from "next/server";



export async function POST(request: Request) {
    const data = await request.json();
    console.log(data.commentid)

      const createComment = {
        query: `
          mutation CREATE_COMMENT {
            createComment(input: {
              commentOn: ${data.commentid}, 
              content: "${data.comment}", 
              author: "Anonymous"
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

    // const response = await fetch(`${process.env.WP_GRAPHQL_URL}`, {
    //     method: "POST",
    //     body: JSON.stringify(params),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   const { data } = await response.json();

      //console.log(data.posts.edges)

    return NextResponse.json(data.comment)
}
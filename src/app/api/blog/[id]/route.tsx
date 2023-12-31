import { NextResponse } from "next/server";

interface Params {
    params: { id: string }
}

export async function GET(request: Request, { params }: Params) {
    //obtenemos el id params.id
    const paramsQuery = {
        query:` query thisPost {
            post(id: ${params.id}, idType: DATABASE_ID) {
              excerpt
              content
              date
              title
              comments(where: {order: ASC}, first: 100) {
                edges {
                  node {
                    id
                    parentId
                    commentId
                    date
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
            }
          }
    `, }

    const response = await fetch(`${process.env.WP_GRAPHQL_URL}`, {
        method: "POST",
        body: JSON.stringify(paramsQuery),
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store"
      });
      const { data } = await response.json();

      //console.log(data.post)

    return NextResponse.json(data.post)

}
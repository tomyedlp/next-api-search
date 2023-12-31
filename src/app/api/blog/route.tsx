import { NextResponse } from "next/server";

export async function POST() {
    const params = {
        query:` query AllPosts {
            posts(first: 20) {
                edges {
                    node {
                      title
                      excerpt
                      date
                      postId
                      featuredImage {
                        node {
                          sourceUrl
                        }
                      }
                    }
                }
              }
            }
    `, }

    const response = await fetch(`${process.env.WP_GRAPHQL_URL}`, {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store"
      });
      const { data } = await response.json();

    return NextResponse.json(data.posts.edges)
}
import { NextResponse } from "next/server";

export async function POST() {
    const params = {
        query:` query AllPosts {
            posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
                edges {
                    node {
                        title
                        excerpt
                        slug
                        date
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
      });
      const { data } = await response.json();

      //console.log(data.posts.edges)

    return NextResponse.json(data.posts.edges)
}
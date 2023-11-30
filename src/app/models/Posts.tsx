export interface PostNode {
    title: string
    excerpt: string
    date: string
    slug?: string
    postId: number
    content?: string
    featuredImage?: featuredImage,
    comments: comments,
    commentCount?: number
}

interface featuredImage {
    node: featuredImageNode
}

interface featuredImageNode {
    sourceUrl: string
}

export interface comments {
    edges: commentNode
}

export interface commentNode {
    node: {
        id: string,
        parentId: null | string,
        commentId: number,
        content: string,
        date: string,
        author: {
            node: {
                name: string
            }
        }
        parent: {
            node: {
                commentId: number
            }
        } | null
    }
}



export interface Post {
    node: PostNode
}
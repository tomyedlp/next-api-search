interface PostNode {
    title: string
    excerpt: string
    date: string
    slug?: string
    postId: number
    content?: string
    featuredImage?: featuredImage
}

interface featuredImage {
    node: featuredImageNode
}

interface featuredImageNode {
    sourceUrl: string
}



export interface Post {
    node: PostNode
}
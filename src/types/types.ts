export interface Blog {
    title: string
    content: string
    image: string
    category: string
    profileimg:string | null | undefined
    username: string | null | undefined
}

export type BlogId = {
    category: string
    content: string
    title: string
    image: string
    id: string
    profileImg:string 
    username: string | null | undefined
}

export type BlogDocumentArray = BlogId[] | undefined;

export interface BlogIdArgument {
    id: string
    blog: Blog
}

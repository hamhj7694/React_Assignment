import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "../page/Home"
import Board from "../components/Board"
import PostDetail from "../page/PostDetail"
import PostWrite from "../page/PostWrite"

const POSTS_STORAGE_KEY = "couplePosts"

const getSavedPosts = () => {
    const savedPosts = localStorage.getItem(POSTS_STORAGE_KEY)

    if(!savedPosts){
        return []
    }

    try {
        return JSON.parse(savedPosts)
    } catch(error) {
        console.error("posts 불러오기 실패:", error)
        return []
    }
}

function PageRouter(){
    const [posts, setPosts] = useState(getSavedPosts)

    useEffect(() => {
        localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts))
    }, [posts])

    return(
        <BrowserRouter>
            <Routes>
                <Route 
                    path="/" 
                    element={
                        <Home posts={posts} setPosts={setPosts}>
                            <Board />
                        </Home>
                    }
                />

                <Route 
                    path="/post/:id" 
                    element={
                        <Home detailMode={true} posts={posts} setPosts={setPosts}>
                            <PostDetail />
                        </Home>
                    } 
                />

                <Route 
                    path="/write" 
                    element={
                        <Home detailMode={true} posts={posts} setPosts={setPosts}>
                            <PostWrite />
                        </Home>
                    } 
                />
            </Routes>
        </BrowserRouter>
    )
}

export default PageRouter
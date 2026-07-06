import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "../page/Login"
import Signup from "../page/Signup"
import CoupleConnect from "../page/CoupleConnect"
import CreateCoupleCode from "../page/CreateCoupleCode"
import JoinCoupleCode from "../page/JoinCoupleCode"

import Home from "../page/Home"
import Board from "../components/Board"
import PostDetail from "../page/PostDetail"
import PostWrite from "../page/PostWrite"

const POSTS_STORAGE_KEY = "couplePosts"
const CHATS_STORAGE_KEY = "coupleChats"

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

const getSavedChats = () => {
    const savedChats = localStorage.getItem(CHATS_STORAGE_KEY)

    if(!savedChats){
        return []
    }

    try {
        return JSON.parse(savedChats)
    } catch(error) {
        console.error("chats 불러오기 실패:", error)
        return []
    }
}

function PageRouter(){
    const [posts, setPosts] = useState(getSavedPosts)
    const [chats, setChats] = useState(getSavedChats)

    useEffect(() => {
        localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts))
    }, [posts])

    useEffect(() => {
        localStorage.setItem(CHATS_STORAGE_KEY, JSON.stringify(chats))
    }, [chats])

    return(
        <BrowserRouter>
            <Routes>
                {/* 로그인 / 회원가입 / 커플 연결 샘플 페이지 */}
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/couple-connect" element={<CoupleConnect />} />
                <Route path="/create-code" element={<CreateCoupleCode />} />
                <Route path="/join-code" element={<JoinCoupleCode />} />

                {/* 기존 Home.jsx = 커플 홈 */}
                <Route 
                    path="/home" 
                    element={
                        <Home 
                            posts={posts} 
                            setPosts={setPosts}
                            chats={chats}
                            setChats={setChats}
                        >
                            <Board />
                        </Home>
                    }
                />

                <Route 
                    path="/post/:id" 
                    element={
                        <Home 
                            detailMode={true} 
                            posts={posts} 
                            setPosts={setPosts}
                            chats={chats}
                            setChats={setChats}
                        >
                            <PostDetail />
                        </Home>
                    } 
                />

                <Route 
                    path="/write" 
                    element={
                        <Home 
                            detailMode={true} 
                            posts={posts} 
                            setPosts={setPosts}
                            chats={chats}
                            setChats={setChats}
                        >
                            <PostWrite />
                        </Home>
                    } 
                />
            </Routes>
        </BrowserRouter>
    )
}

export default PageRouter
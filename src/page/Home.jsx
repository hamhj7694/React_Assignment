import { useState, cloneElement, isValidElement } from "react"
import "./Home.css"

import Menu from "../components/Menu"
import Top from "../components/Top"
import SummaryCards from "../components/SummaryCards"
import Category from "../components/Category"
import RecentFeed from "../components/RecentFeed"

function Home({ children, detailMode = false, posts = [], setPosts }){
    const [searchKeyword, setSearchKeyword] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("전체")
    const [chatList, setChatList] = useState([])

    return(
        <div className="HomePage">
            <div className="Container">
                <Menu />

                {detailMode ? (
                    <div className="Content detail_content">
                        {isValidElement(children)
                            ? cloneElement(children, {
                                posts,
                                setPosts,
                            })
                            : children
                        }
                    </div>
                ) : (
                    <div className="Content">
                        <div className="Content_mid">
                            <div className="Header">
                                <Top 
                                    searchKeyword={searchKeyword}
                                    setSearchKeyword={setSearchKeyword}
                                />

                                <div className="Boxs">
                                    <SummaryCards 
                                        posts={posts}
                                        chatList={chatList} 
                                    />
                                </div>
                            </div>

                            <div className="Main">
                                <div className="Board">
                                    {isValidElement(children) 
                                        ? cloneElement(children, { 
                                            searchKeyword,
                                            selectedCategory,
                                            posts,
                                            setPosts,
                                        }) 
                                        : children
                                    }
                                </div>
                            </div>
                        </div>
                        
                        <div className="Board_info">
                            <Category
                                posts={posts}
                                selectedCategory={selectedCategory}
                                setSelectedCategory={setSelectedCategory}
                            />

                            <RecentFeed 
                                chatList={chatList}
                                setChatList={setChatList}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home
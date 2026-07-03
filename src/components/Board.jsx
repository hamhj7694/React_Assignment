import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Board.css"

function Board({ searchKeyword = "", selectedCategory = "전체", posts = [] }){
    const navigate = useNavigate()

    const [page, setPage] = useState(1)

    const postsPerPage = 8

    const keyword = searchKeyword.trim().toLowerCase()

    const filteredPosts = posts.filter((post) => {
        const isCategoryMatched = 
            selectedCategory === "전체" || post.category === selectedCategory

        if(!isCategoryMatched) return false

        if(keyword === "") return true

        const title = String(post.title || "").toLowerCase()
        const content = String(post.content || "").toLowerCase()
        const writer = String(post.writer || "").toLowerCase()
        const category = String(post.category || "").toLowerCase()
        const mood = String(post.mood || "").toLowerCase()

        return (
            title.includes(keyword) ||
            content.includes(keyword) ||
            writer.includes(keyword) ||
            category.includes(keyword) ||
            mood.includes(keyword)
        )
    })

    const totalPage = Math.ceil(filteredPosts.length / postsPerPage)

    const startIndex = (page - 1) * postsPerPage
    const endIndex = startIndex + postsPerPage
    const currentPosts = filteredPosts.slice(startIndex, endIndex)

    useEffect(() => {
        setPage(1)
    }, [searchKeyword, selectedCategory, posts.length])

    const handleWrite = () => {
        navigate("/write")
    }

    const goFirstPage = () => {
        setPage(1)
    }

    const goLastPage = () => {
        if(totalPage === 0) return
        setPage(totalPage)
    }

    const goPrevPage = () => {
        if(page === 1) return
        setPage(page - 1)
    }

    const goNextPage = () => {
        if(page === totalPage || totalPage === 0) return
        setPage(page + 1)
    }

    const PARTNER = "너"

    const getReactionDisplay = (post) => {
        const partnerReactionLog = post.reactions?.find((log) => (
            log.nickname === PARTNER
        ))

        if(!partnerReactionLog){
            return "읽음"
        }

        const word = partnerReactionLog.word?.trim() || ""

        if(word.length >= 3) return "💬"
        if(word.length >= 1) return word

        return partnerReactionLog.reaction || "읽음"
    }
    
    const getCategoryClass = (category) => {
        if(category === "데이트") return "date"
        if(category === "일상") return "daily"
        if(category === "마음") return "heart"
        if(category === "여행") return "travel"
        if(category === "약속") return "promise"

        return "all"
    }

    const handlePostClick = (postId) => {
        navigate(`/post/${postId}`)
    }

    return(
        <div className="Board_wrap">
            <div className="Board_title">
                <h2>우리의 기록</h2>

                <button type="button" onClick={handleWrite}>
                    + 함께 기록하기
                </button>
            </div>

            <div className="Board_list_wrap">
                <table className="Board_list">
                    <thead>
                        <tr className="column_title">
                            <th className="col_no">NO</th>
                            <th className="col_title">기억 조각</th>
                            <th className="col_writer">쓴이</th>
                            <th className="col_date">날짜</th>
                            <th className="col_mood">기분</th>
                            <th className="col_reaction">반응</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentPosts.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="empty_result">
                                    {posts.length === 0 
                                        ? "아직 작성된 기억이 없어요." 
                                        : "관련 기억이 없어요."
                                    }
                                </td>
                            </tr>
                        ) : (
                            currentPosts.map((post, index) => {
                                const displayNo = startIndex + index + 1

                                return(
                                    <tr 
                                        className="post_item" 
                                        key={post.id}
                                        onClick={() => handlePostClick(post.id)}
                                    >
                                        <td className="col_no">
                                            {displayNo}
                                        </td>

                                        <td className="col_title">
                                            <span className={`post_badge ${getCategoryClass(post.category)}`}>
                                                {post.category}
                                            </span>

                                            <span className="post_title">
                                                {post.title}
                                            </span>
                                        </td>

                                        <td className="col_writer">
                                            {post.writer}
                                        </td>

                                        <td className="col_date">
                                            {post.date}
                                        </td>

                                        <td className="col_mood">
                                            {post.mood}
                                        </td>

                                        <td className="col_reaction">
                                            <span className={getReactionDisplay(post) === "읽음" ? "reaction_badge read" : "reaction_badge"}>
                                                {getReactionDisplay(post)}
                                            </span>
                                        </td>
                                    </tr>
                                )
                            })
                        )}
                    </tbody>
                </table>

                {totalPage > 0 && (
                    <div className="Pagination">
                        <button 
                            type="button" 
                            onClick={goFirstPage}
                            disabled={page === 1}
                        >
                            «
                        </button>

                        <button 
                            type="button" 
                            onClick={goPrevPage}
                            disabled={page === 1}
                        >
                            ‹
                        </button>

                        {Array.from({ length: totalPage }, (_, index) => (
                            <button
                                type="button"
                                key={index + 1}
                                className={page === index + 1 ? "active" : ""}
                                onClick={() => setPage(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}

                        <button 
                            type="button" 
                            onClick={goNextPage}
                            disabled={page === totalPage}
                        >
                            ›
                        </button>

                        <button 
                            type="button" 
                            onClick={goLastPage}
                            disabled={page === totalPage}
                        >
                            »
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Board
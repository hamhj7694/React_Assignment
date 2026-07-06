import { useEffect, useRef, useState } from "react"
import "./RecentFeed.css"

function RecentFeed({ chatList, setChatList }){
    const [chatText, setChatText] = useState("")
    const [selectedChatId, setSelectedChatId] = useState(null)
    const [editingChatId, setEditingChatId] = useState(null)

    const chatBodyRef = useRef(null)
    const chatInputRef = useRef(null)

    useEffect(() => {
        if(!chatBodyRef.current) return

        chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight
    }, [chatList])

    const getNowTime = () => {
        const now = new Date()

        return now.toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    const handleChatClick = (chat) => {
        if(chat.user !== "나") return

        if(selectedChatId === chat.id){
            setSelectedChatId(null)
            return
        }

        setSelectedChatId(chat.id)
    }

    const handleDeleteChat = (chatId) => {
        setChatList((prevChatList) => (
            prevChatList.filter((chat) => chat.id !== chatId)
        ))

        if(selectedChatId === chatId){
            setSelectedChatId(null)
        }

        if(editingChatId === chatId){
            setEditingChatId(null)
            setChatText("")
        }
    }

    const handleEditStart = (chat) => {
        setEditingChatId(chat.id)
        setChatText(chat.text)
        setSelectedChatId(null)

        setTimeout(() => {
            if(chatInputRef.current){
                chatInputRef.current.focus()
            }
        }, 0)
    }

    const handleEditCancel = () => {
        setEditingChatId(null)
        setChatText("")
        setSelectedChatId(null)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const trimmedText = chatText.trim()

        if(trimmedText === "") return

        if(editingChatId){
            setChatList((prevChatList) => (
                prevChatList.map((chat) => (
                    chat.id === editingChatId
                        ? {
                            ...chat,
                            text: trimmedText,
                            edited: true,
                        }
                        : chat
                ))
            ))

            setEditingChatId(null)
            setChatText("")
            return
        }

        const newChat = {
            id: Date.now(),
            user: "나",
            text: trimmedText,
            time: getNowTime(),
        }

        setChatList((prevChatList) => [
            ...prevChatList,
            newChat,
        ])

        setChatText("")
    }

    return(
        <div className="RecentChat">
            <div className="RecentChat_header">
                <div>
                    <span className="RecentChat_label">Live Chat</span>
                    <h3>우리 채팅</h3>
                </div>

                <span className="RecentChat_icon">💬</span>
            </div>

            <div className="RecentChat_body" ref={chatBodyRef}>
                {chatList.map((chat) => (
                    <div 
                        className={
                            chat.user === "나" 
                                ? "RecentChat_message mine" 
                                : "RecentChat_message partner"
                        }
                        key={chat.id}
                    >
                        <div 
                            className={
                                selectedChatId === chat.id
                                    ? "RecentChat_bubble selected"
                                    : "RecentChat_bubble"
                            }
                            onClick={() => handleChatClick(chat)}
                        >
                            <div className="RecentChat_meta">
                                <span>{chat.user}</span>

                                <em>
                                    {chat.time}
                                    {chat.edited ? " · 수정됨" : ""}
                                </em>
                            </div>

                            <p>{chat.text}</p>

                            {chat.user === "나" && selectedChatId === chat.id && (
                                <div className="RecentChat_actions">
                                    <button 
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleEditStart(chat)
                                        }}
                                    >
                                        수정
                                    </button>

                                    <button 
                                        type="button"
                                        className="delete"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleDeleteChat(chat.id)
                                        }}
                                    >
                                        삭제
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {editingChatId && (
                <div className="RecentChat_editStatus">
                    <span>수정중</span>
                    <button 
                        type="button"
                        onClick={handleEditCancel}
                    >
                        취소
                    </button>
                </div>
            )}

            <form className="RecentChat_form" onSubmit={handleSubmit}>
                <input 
                    ref={chatInputRef}
                    type="text"
                    value={chatText}
                    onChange={(e) => setChatText(e.target.value)}
                    placeholder={editingChatId ? "메시지 수정 중" : "메시지 입력"}
                />

                {editingChatId && (
                    <button 
                        type="button"
                        className="cancel"
                        onClick={handleEditCancel}
                    >
                        취소
                    </button>
                )}

                <button type="submit">
                    {editingChatId ? "수정" : "보내기"}
                </button>
            </form>
        </div>
    )
}
export default RecentFeed
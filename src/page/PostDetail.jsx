import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./PostDetail.css"
import PostReaction from "../components/PostReaction"
import ImageViewer from "../components/ImageViewer"
import PostWriteImage from "../components/PostWrite/PostWriteImage"
import ScheduleSection from "../components/PostWrite/ScheduleSection"

const CURRENT_USER = "나"
const PARTNER = "너"

const reactionOptions = ["💗", "🥰", "🥺", "😂", "✨", "🫶"]

const categoryList = ["데이트", "일상", "마음", "여행", "약속"]

const moodList = [
    "행복",
    "설렘",
    "몽글",
    "고마움",
    "아쉬움",
    "그리움",
    "평온",
    "미안함",
    "기대",
]

const createImageId = () => {
    if(window.crypto?.randomUUID){
        return crypto.randomUUID()
    }

    return `${Date.now()}-${Math.random()}`
}

function PostDetail({ posts = [], setPosts }){
    const { id } = useParams()
    const navigate = useNavigate()

    const post = posts.find((item) => item.id === Number(id))

    const [reactionLogs, setReactionLogs] = useState(post?.reactions || [])
    const [wordText, setWordText] = useState("")

    const [isEditing, setIsEditing] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null)
    const [editTitle, setEditTitle] = useState(post?.title || "")
    const [editCategory, setEditCategory] = useState(post?.category || "데이트")
    const [editMood, setEditMood] = useState(post?.mood || "행복")
    const [editContent, setEditContent] = useState(post?.content || "")
    const [editImages, setEditImages] = useState(post?.images || [])

    const [editScheduleTitle, setEditScheduleTitle] = useState(post?.schedule?.title || post?.title || "")
    const [editScheduleDate, setEditScheduleDate] = useState(post?.schedule?.date || "")
    const [editScheduleTime, setEditScheduleTime] = useState(post?.schedule?.time || "")
    const [editSchedulePlace, setEditSchedulePlace] = useState(post?.schedule?.place || "")
    const [editScheduleMemo, setEditScheduleMemo] = useState(post?.schedule?.memo || "")

    const isEditSchedulePost = editCategory === "약속"

    if(!post){
        return(
            <div className="PostDetail_wrap">
                <div className="PostDetail_card">
                    <p className="PostDetail_empty">기록을 찾을 수 없어요.</p>

                    <button 
                        type="button" 
                        className="Back_button"
                        onClick={() => navigate("/")}
                    >
                        목록으로 돌아가기
                    </button>
                </div>
            </div>
        )
    }

    const isOriginalSchedulePost = post.category === "약속"

    const getNowText = () => {
        const now = new Date()

        const dateText = now.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        })

        const timeText = now.toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
        })

        return {
            date: dateText,
            time: timeText,
        }
    }

    const myReactionLog = reactionLogs.find((log) => log.nickname === CURRENT_USER)
    const partnerReactionLog = reactionLogs.find((log) => log.nickname === PARTNER)

    const getReactionDisplay = (reactionLog) => {
        if(!reactionLog) return "읽음"

        const word = reactionLog.word?.trim() || ""

        if(word.length >= 3) return "💬"
        if(word.length >= 1) return word

        return reactionLog.reaction || "읽음"
    }

    const updateReactionLogs = (newLog) => {
        setReactionLogs((prevLogs) => {
            const filteredLogs = prevLogs.filter(
                (log) => log.nickname !== CURRENT_USER
            )

            const updatedLogs = [newLog, ...filteredLogs]

            if(setPosts){
                setPosts((prevPosts) => (
                    prevPosts.map((item) => (
                        item.id === post.id
                            ? {
                                ...item,
                                reactions: updatedLogs,
                            }
                            : item
                    ))
                ))
            }

            return updatedLogs
        })
    }

    const handleReactionClick = (selectedReaction) => {
        const newLog = {
            nickname: CURRENT_USER,
            reaction: selectedReaction,
            word: myReactionLog?.word || "",
            reactedAt: getNowText(),
        }

        updateReactionLogs(newLog)
    }

    const handleWordSubmit = (e) => {
        e.preventDefault()

        const trimmedWord = wordText.trim()

        if(trimmedWord === "") return

        const newLog = {
            nickname: CURRENT_USER,
            reaction: myReactionLog?.reaction || "💗",
            word: trimmedWord,
            reactedAt: getNowText(),
        }

        updateReactionLogs(newLog)

        setWordText("")
    }

    const handleEditStart = () => {
        setEditTitle(post.title)
        setEditCategory(post.category)
        setEditMood(post.mood)
        setEditContent(post.content)
        setEditImages(post.images || [])

        setEditScheduleTitle(post.schedule?.title || post.title || "")
        setEditScheduleDate(post.schedule?.date || "")
        setEditScheduleTime(post.schedule?.time || "")
        setEditSchedulePlace(post.schedule?.place || "")
        setEditScheduleMemo(post.schedule?.memo || "")

        setIsEditing(true)
    }

    const handleEditCancel = () => {
        setEditTitle(post.title)
        setEditCategory(post.category)
        setEditMood(post.mood)
        setEditContent(post.content)
        setEditImages(post.images || [])

        setEditScheduleTitle(post.schedule?.title || post.title || "")
        setEditScheduleDate(post.schedule?.date || "")
        setEditScheduleTime(post.schedule?.time || "")
        setEditSchedulePlace(post.schedule?.place || "")
        setEditScheduleMemo(post.schedule?.memo || "")

        setIsEditing(false)
    }

    const handleEditCategoryClick = (selectedCategory) => {
        if(isOriginalSchedulePost){
            return
        }

        setEditCategory(selectedCategory)

        if(selectedCategory === "약속"){
            setEditScheduleTitle(post.schedule?.title || editTitle || post.title || "")
            setEditScheduleDate(post.schedule?.date || "")
            setEditScheduleTime(post.schedule?.time || "")
            setEditSchedulePlace(post.schedule?.place || "")
            setEditScheduleMemo(post.schedule?.memo || "")
            return
        }

        setEditScheduleTitle("")
        setEditScheduleDate("")
        setEditScheduleTime("")
        setEditSchedulePlace("")
        setEditScheduleMemo("")
    }

    const handleEditImageChange = (e) => {
        const files = Array.from(e.target.files)

        if(files.length === 0) return

        const newImages = files.map((file) => ({
            id: createImageId(),
            file,
            name: file.name,
            url: URL.createObjectURL(file),
        }))

        setEditImages((prevImages) => [
            ...prevImages,
            ...newImages,
        ])

        e.target.value = ""
    }

    const handleRemoveEditImage = (imageId) => {
        const targetImage = editImages.find((image) => image.id === imageId)

        if(targetImage?.file && targetImage?.url){
            URL.revokeObjectURL(targetImage.url)
        }

        setEditImages((prevImages) => (
            prevImages.filter((image) => image.id !== imageId)
        ))
    }
        
    const handleEditSave = () => {
        const fixedEditCategory = isOriginalSchedulePost
            ? "약속"
            : editCategory

        const isFixedSchedulePost = fixedEditCategory === "약속"

        const trimmedTitle = isFixedSchedulePost
            ? editScheduleTitle.trim()
            : editTitle.trim()

        const trimmedContent = editContent.trim()

        if(!isFixedSchedulePost && trimmedTitle === ""){
            alert("제목을 입력해줘!")
            return
        }

        if(!isFixedSchedulePost && trimmedContent === ""){
            alert("내용을 입력해줘!")
            return
        }

        if(isFixedSchedulePost){
            if(editScheduleTitle.trim() === ""){
                alert("약속 제목을 입력해줘!")
                return
            }

            if(editScheduleDate === ""){
                alert("약속 날짜를 선택해줘!")
                return
            }

            if(editScheduleTime === ""){
                alert("약속 시간을 선택해줘!")
                return
            }
        }

        if(!setPosts){
            alert("수정 기능이 아직 연결되지 않았어!")
            return
        }

        const scheduleContent = isFixedSchedulePost
            ? [
                editScheduleTitle.trim(),
                `${editScheduleDate} ${editScheduleTime}`,
                editSchedulePlace.trim() ? `장소: ${editSchedulePlace.trim()}` : "",
                editScheduleMemo.trim() ? `메모: ${editScheduleMemo.trim()}` : "",
            ]
                .filter(Boolean)
                .join("\n")
            : trimmedContent

        setPosts((prevPosts) => (
            prevPosts.map((item) => (
                item.id === post.id
                    ? {
                        ...item,
                        title: trimmedTitle,
                        category: fixedEditCategory,
                        mood: editMood,
                        content: scheduleContent,
                        images: editImages.map((image) => ({
                            id: image.id,
                            url: image.url,
                            name: image.name,
                        })),
                        schedule: isFixedSchedulePost
                            ? {
                                id: item.schedule?.id || item.id,
                                postId: item.id,
                                title: editScheduleTitle.trim(),
                                date: editScheduleDate,
                                time: editScheduleTime,
                                place: editSchedulePlace.trim(),
                                memo: editScheduleMemo.trim(),
                            }
                            : null,
                    }
                    : item
            ))
        ))

        setIsEditing(false)
    }

    const handleDelete = () => {
        const isConfirmed = window.confirm("이 기록을 삭제할까?")

        if(!isConfirmed) return

        if(!setPosts){
            alert("삭제 기능이 아직 연결되지 않았어!")
            return
        }

        setPosts((prevPosts) => (
            prevPosts.filter((item) => item.id !== post.id)
        ))

        navigate("/")
    }

    return(
        <div className="PostDetail_wrap">
            <div className="PostDetail_card">

                <div className="PostDetail_header">
                    {isEditing ? (
                        <>
                            <div className="PostDetail_edit_group">
                                <label>카테고리</label>

                                {isOriginalSchedulePost ? (
                                    <div className="PostDetail_locked_category">
                                        <span>약속</span>
                                        <p>약속 글은 카테고리를 변경할 수 없어요.</p>
                                    </div>
                                ) : (
                                    <div className="PostDetail_chip_group">
                                        {categoryList.map((category) => (
                                            <button
                                                type="button"
                                                key={category}
                                                className={
                                                    editCategory === category
                                                        ? "PostDetail_chip active"
                                                        : "PostDetail_chip"
                                                }
                                                onClick={() => handleEditCategoryClick(category)}
                                            >
                                                {category}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {!isEditSchedulePost && (
                                <div className="PostDetail_edit_group">
                                    <label>제목</label>

                                    <input
                                        type="text"
                                        className="PostDetail_edit_title"
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                    />
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <span className="PostDetail_category">
                                {post.category}
                            </span>

                            <h2>{post.title}</h2>
                        </>
                    )}
                </div>

                <div className="PostDetail_meta">
                    <span>쓴 사람: {post.writer}</span>

                    <span>
                        날짜: {post.date}
                        {post.time ? ` ${post.time}` : ""}
                    </span>

                    {isEditing ? (
                        <span className="PostDetail_mood_edit">
                            기분:{" "}
                            <select 
                                value={editMood}
                                onChange={(e) => setEditMood(e.target.value)}
                            >
                                {moodList.map((mood) => (
                                    <option key={mood} value={mood}>
                                        {mood}
                                    </option>
                                ))}
                            </select>
                        </span>
                    ) : (
                        <span>기분: {post.mood}</span>
                    )}

                    <span>
                        상대 반응:{" "}
                        <strong>
                            {getReactionDisplay(partnerReactionLog)}
                        </strong>
                    </span>
                </div>

                {isEditing ? (
                    isEditSchedulePost ? (
                        <ScheduleSection
                            scheduleTitle={editScheduleTitle}
                            setScheduleTitle={setEditScheduleTitle}
                            scheduleDate={editScheduleDate}
                            setScheduleDate={setEditScheduleDate}
                            scheduleTime={editScheduleTime}
                            setScheduleTime={setEditScheduleTime}
                            schedulePlace={editSchedulePlace}
                            setSchedulePlace={setEditSchedulePlace}
                            scheduleMemo={editScheduleMemo}
                            setScheduleMemo={setEditScheduleMemo}
                        />
                    ) : (
                        <div className="PostDetail_edit_content">
                            <label>내용</label>

                            <textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                            />

                            <div className="PostDetail_edit_count">
                                {editContent.length}자
                            </div>
                        </div>
                    )
                ) : (
                    <div className="PostDetail_content">
                        {post.content.split("\n").map((line, index) => (
                            <p key={index}>{line}</p>
                        ))}
                    </div>
                )}

                {isEditing ? (
                    <PostWriteImage
                        images={editImages}
                        handleImageChange={handleEditImageChange}
                        handleRemoveImage={handleRemoveEditImage}
                    />
                ) : (
                    post.images && post.images.length > 0 && (
                        <div className="PostDetail_images">
                            {post.images.map((image) => (
                                <button 
                                    type="button"
                                    className="PostDetail_image_item" 
                                    key={image.id}
                                    onClick={() => setSelectedImage(image)}
                                >
                                    <img src={image.url} alt={image.name || "게시글 이미지"} />
                                </button>
                            ))}
                        </div>
                    )
                )}

                {!isEditing && (
                    <div className="PostReaction">
                        <PostReaction
                            reactionOptions={reactionOptions}
                            myReactionLog={myReactionLog}
                            partnerReactionLog={partnerReactionLog}
                            handleReactionClick={handleReactionClick}
                            wordText={wordText}
                            setWordText={setWordText}
                            handleWordSubmit={handleWordSubmit}
                        />
                    </div>
                )}

                <div className="PostDetail_actions">
                    {!isEditing && (
                        <button 
                            type="button" 
                            className="Back_button"
                            onClick={() => navigate("/")}
                        >
                            목록으로 돌아가기
                        </button>
                    )}

                    {isEditing ? (
                        <>
                            <button
                                type="button"
                                className="PostDetail_save_button"
                                onClick={handleEditSave}
                            >
                                저장
                            </button>

                            <button
                                type="button"
                                className="PostDetail_cancel_button"
                                onClick={handleEditCancel}
                            >
                                취소
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                type="button"
                                className="PostDetail_edit_button"
                                onClick={handleEditStart}
                            >
                                수정
                            </button>

                            <button
                                type="button"
                                className="PostDetail_delete_button"
                                onClick={handleDelete}
                            >
                                삭제
                            </button>
                        </>
                    )}
                </div>

            </div>

            <ImageViewer
                image={selectedImage}
                onClose={() => setSelectedImage(null)}
            />
        </div>
    )
}

export default PostDetail
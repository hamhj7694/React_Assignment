import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./PostWrite.css"

import PostWriteHeader from "../components/PostWrite/PostWriteHeader"
import CategoryMoodSection from "../components/PostWrite/CategoryMoodSection"
import TitleSection from "../components/PostWrite/TitleSection"
import ScheduleSection from "../components/PostWrite/ScheduleSection"
import PostWriteImage from "../components/PostWrite/PostWriteImage"

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

const CURRENT_USER = {
    id: "user_1",
    nickname: "나",
}

const getNowDateTime = () => {
    const now = new Date()

    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, "0")
    const date = String(now.getDate()).padStart(2, "0")
    const hour = String(now.getHours()).padStart(2, "0")
    const minute = String(now.getMinutes()).padStart(2, "0")

    return {
        date: `${year}-${month}-${date}`,
        time: `${hour}:${minute}`,
        createdAt: `${year}-${month}-${date} ${hour}:${minute}`,
    }
}

const createImageId = () => {
    if(window.crypto?.randomUUID){
        return crypto.randomUUID()
    }

    return `${Date.now()}-${Math.random()}`
}

function PostWrite({ setPosts }){
    const navigate = useNavigate()

    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("데이트")
    const [mood, setMood] = useState("행복")
    const [content, setContent] = useState("")
    const [images, setImages] = useState([])

    const [isMoodOpen, setIsMoodOpen] = useState(false)

    const [scheduleTitle, setScheduleTitle] = useState("")
    const [scheduleDate, setScheduleDate] = useState("")
    const [scheduleTime, setScheduleTime] = useState("")
    const [schedulePlace, setSchedulePlace] = useState("")
    const [scheduleMemo, setScheduleMemo] = useState("")

    const isSchedulePost = category === "약속"

    const handleCategoryClick = (selectedCategory) => {
        setCategory(selectedCategory)

        if(selectedCategory !== "약속"){
            setScheduleTitle("")
            setScheduleDate("")
            setScheduleTime("")
            setSchedulePlace("")
            setScheduleMemo("")
        }
    }

    const handleMoodSelect = (selectedMood) => {
        setMood(selectedMood)
        setIsMoodOpen(false)
    }

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files)

        if(files.length === 0) return

        const newImages = files.map((file) => ({
            id: createImageId(),
            file,
            name: file.name,
            url: URL.createObjectURL(file),
        }))

        setImages((prevImages) => [
            ...prevImages,
            ...newImages,
        ])

        e.target.value = ""
    }

    const handleRemoveImage = (imageId) => {
        const targetImage = images.find((image) => image.id === imageId)

        if(targetImage?.url){
            URL.revokeObjectURL(targetImage.url)
        }

        setImages((prevImages) => (
            prevImages.filter((image) => image.id !== imageId)
        ))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const trimmedTitle = isSchedulePost
            ? scheduleTitle.trim()
            : title.trim()

        const trimmedContent = content.trim()

        if(!isSchedulePost && trimmedTitle === ""){
            alert("제목을 입력해줘!")
            return
        }

        if(!isSchedulePost && trimmedContent === ""){
            alert("본문을 입력해줘!")
            return
        }

        if(isSchedulePost){
            if(scheduleTitle.trim() === ""){
                alert("약속 제목을 입력해줘!")
                return
            }

            if(scheduleDate === ""){
                alert("약속 날짜를 선택해줘!")
                return
            }

            if(scheduleTime === ""){
                alert("약속 시간을 선택해줘!")
                return
            }
        }

        const now = getNowDateTime()
        const postId = Date.now()

        const scheduleContent = isSchedulePost
            ? [
                scheduleTitle.trim(),
                `${scheduleDate} ${scheduleTime}`,
                schedulePlace.trim() ? `장소: ${schedulePlace.trim()}` : "",
                scheduleMemo.trim() ? `메모: ${scheduleMemo.trim()}` : "",
            ]
                .filter(Boolean)
                .join("\n")
            : trimmedContent

        const newPost = {
            id: postId,

            title: trimmedTitle,
            category,

            writerId: CURRENT_USER.id,
            writer: CURRENT_USER.nickname,

            date: now.date,
            time: now.time,
            createdAt: now.createdAt,

            mood,
            content: scheduleContent,

            images: images.map((image) => ({
                id: image.id,
                url: image.url,
                name: image.name,
            })),

            reaction: "읽음",
            reactions: [],

            schedule: isSchedulePost
                ? {
                    id: postId,
                    postId,
                    title: scheduleTitle.trim(),
                    date: scheduleDate,
                    time: scheduleTime,
                    place: schedulePlace.trim(),
                    memo: scheduleMemo.trim(),
                }
                : null,
        }

        if(setPosts){
            setPosts((prevPosts) => [
                newPost,
                ...prevPosts,
            ])
        }

        alert("기억이 저장됐어!")
        navigate("/")
    }

    return(
        <div className="PostWrite_wrap">
            <form className="PostWrite_card" onSubmit={handleSubmit}>
                <PostWriteHeader />

                <div className="PostWrite_section">
                    <CategoryMoodSection
                        categoryList={categoryList}
                        moodList={moodList}
                        category={category}
                        mood={mood}
                        isMoodOpen={isMoodOpen}
                        handleCategoryClick={handleCategoryClick}
                        handleMoodSelect={handleMoodSelect}
                        setIsMoodOpen={setIsMoodOpen}
                    />
                </div>

                {!isSchedulePost && (
                    <TitleSection
                        title={title}
                        setTitle={setTitle}
                    />
                )}

                {isSchedulePost && (
                    <ScheduleSection
                        scheduleTitle={scheduleTitle}
                        setScheduleTitle={setScheduleTitle}
                        scheduleDate={scheduleDate}
                        setScheduleDate={setScheduleDate}
                        scheduleTime={scheduleTime}
                        setScheduleTime={setScheduleTime}
                        schedulePlace={schedulePlace}
                        setSchedulePlace={setSchedulePlace}
                        scheduleMemo={scheduleMemo}
                        setScheduleMemo={setScheduleMemo}
                    />
                )}

                {!isSchedulePost && (
                    <div className="PostWrite_section">
                        <label className="PostWrite_field_label">본문</label>

                        <textarea
                            className="PostWrite_content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="오늘의 기억을 자세히 적어주세요"
                        />

                        <div className="PostWrite_count">
                            {content.length}자
                        </div>
                    </div>
                )}

                <PostWriteImage
                    images={images}
                    handleImageChange={handleImageChange}
                    handleRemoveImage={handleRemoveImage}
                />

                <div className="PostWrite_actions">
                    <button
                        type="button"
                        className="PostWrite_cancel"
                        onClick={() => navigate("/")}
                    >
                        취소
                    </button>

                    <button
                        type="submit"
                        className="PostWrite_submit"
                    >
                        기억 저장하기
                    </button>
                </div>
            </form>
        </div>
    )
}

export default PostWrite
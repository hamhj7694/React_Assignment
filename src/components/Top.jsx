import { useState } from "react"
import "./Top.css"

const STORAGE_KEY = "coupleStartDate"
const MOOD_STORAGE_KEY = "todayMood"

const moodList = [
    "몽글",
    "행복",
    "설렘",
    "평온",
    "고마움",
    "보고싶음",
    "피곤",
    "그리움",
    "아쉬움",
    "미안함",
]

const getTodayDate = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, "0")
    const date = String(today.getDate()).padStart(2, "0")

    return `${year}-${month}-${date}`
}

const getSavedStartDate = () => {
    const savedDate = localStorage.getItem(STORAGE_KEY)

    if(savedDate){
        return savedDate
    }

    return getTodayDate()
}

const getSavedMood = () => {
    const todayKey = getTodayDate()
    const savedData = JSON.parse(localStorage.getItem(MOOD_STORAGE_KEY))

    if(savedData && savedData.date === todayKey){
        return savedData.mood
    }

    return "몽글"
}

const getDDayText = (startDate) => {
    if(!startDate) return "D+1"

    const today = new Date()
    const start = new Date(startDate)

    today.setHours(0, 0, 0, 0)
    start.setHours(0, 0, 0, 0)

    const diffTime = today - start
    const diffDay = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if(diffDay < 0){
        return `D${diffDay}`
    }

    return `D+${diffDay + 1}`
}

function Top({ searchKeyword, setSearchKeyword }){
    const [startDate, setStartDate] = useState(getSavedStartDate)
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

    const [todayMood, setTodayMood] = useState(getSavedMood)
    const [isMoodListOpen, setIsMoodListOpen] = useState(false)

    const handleStartDateChange = (e) => {
        const selectedDate = e.target.value

        setStartDate(selectedDate)
        localStorage.setItem(STORAGE_KEY, selectedDate)
        setIsDatePickerOpen(false)
    }

    const handleMoodSelect = (mood) => {
        const todayKey = getTodayDate()

        localStorage.setItem(
            MOOD_STORAGE_KEY,
            JSON.stringify({
                date: todayKey,
                mood,
            })
        )

        setTodayMood(mood)
        setIsMoodListOpen(false)
    }

    return(
        <div className="Top">
            <div className="Top_right">
                <div className="Top_chip dday">
                    <span className="Top_chip_label">D-Day</span>

                    <strong>{getDDayText(startDate)}</strong>

                    <button
                        type="button"
                        className="Top_calendar_button"
                        onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                    >
                        📅
                    </button>

                    {isDatePickerOpen && (
                        <div className="Top_date_picker">
                            <label>시작한 날짜</label>

                            <input 
                                type="date"
                                value={startDate}
                                onChange={handleStartDateChange}
                            />
                        </div>
                    )}
                </div>

                <div className="Top_chip mood">
                    <span className="Top_chip_label">오늘 기분</span>

                    <strong>{todayMood}</strong>

                    <button
                        type="button"
                        className="Top_mood_button"
                        onClick={() => setIsMoodListOpen(!isMoodListOpen)}
                    >
                        ✏️
                    </button>

                    {isMoodListOpen && (
                        <div className="Top_mood_picker">
                            <label>오늘의 기분</label>

                            <select
                                className="Top_mood_select"
                                value={todayMood}
                                onChange={(e) => handleMoodSelect(e.target.value)}
                                autoFocus
                            >
                                {moodList.map((mood) => (
                                    <option key={mood} value={mood}>
                                        {mood}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
            </div>

            <div className="Top_search">
                <input 
                    type="text"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    placeholder="기억의 조각 검색하기"
                />

                <span className="Top_search_icon">🔍</span>
            </div>
        </div>
    )
}

export default Top
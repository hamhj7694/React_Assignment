import "./SummaryCards.css"

const CURRENT_USER = "나"

const getScheduleDateTime = (schedule) => {
    if(!schedule?.date) return null

    const time = schedule.time || "00:00"

    return new Date(`${schedule.date}T${time}`)
}

const getUpcomingSchedule = (posts) => {
    const now = new Date()

    const schedules = posts
        .filter((post) => post.schedule)
        .map((post) => ({
            ...post.schedule,
            postId: post.id,
            postTitle: post.title,
        }))
        .filter((schedule) => {
            const scheduleDateTime = getScheduleDateTime(schedule)

            if(!scheduleDateTime) return false

            return scheduleDateTime >= now
        })
        .sort((a, b) => (
            getScheduleDateTime(a) - getScheduleDateTime(b)
        ))

    return schedules[0]
}

function SummaryCards({ posts = [], chatList = [] }){
    const totalRecordCount = posts.length

    const myRecordCount = posts.filter((post) => (
        post.writer === CURRENT_USER
    )).length

    const chatCount = chatList.length
    const upcomingSchedule = getUpcomingSchedule(posts)

    return(
        <div className="SummaryCards">
            <div className="SummaryCard">
                <div className="SummaryCard_icon record">📓</div>

                <div className="SummaryCard_text">
                    <span className="SummaryCard_label">전체 기록</span>
                    <strong>{totalRecordCount}</strong>
                    <p>우리의 기록</p>
                </div>
            </div>

            <div className="SummaryCard">
                <div className="SummaryCard_icon mine">✍️</div>

                <div className="SummaryCard_text">
                    <span className="SummaryCard_label">내 기록</span>
                    <strong>{myRecordCount}</strong>
                    <p>내가 쓴 기록</p>
                </div>
            </div>

            <div className="SummaryCard">
                <div className="SummaryCard_icon chat">💬</div>

                <div className="SummaryCard_text">
                    <span className="SummaryCard_label">채팅 수</span>
                    <strong>{chatCount}</strong>
                    <p>오늘 대화</p>
                </div>
            </div>

            <div className="SummaryCard schedule">
                <div className="SummaryCard_icon schedule_icon">📅</div>

                <div className="SummaryCard_text">
                    <span className="SummaryCard_label">다가오는 약속</span>

                    {upcomingSchedule ? (
                        <>
                            <strong>
                                {upcomingSchedule.date}
                                {upcomingSchedule.time ? ` ${upcomingSchedule.time}` : ""}
                            </strong>

                            <p>{upcomingSchedule.title}</p>

                            <div className="Schedule_hover_panel">
                                <span>다가오는 약속</span>

                                <strong>
                                    {upcomingSchedule.date}
                                    {upcomingSchedule.time ? ` ${upcomingSchedule.time}` : ""}
                                </strong>

                                <p>{upcomingSchedule.title}</p>

                                {upcomingSchedule.place && (
                                    <p>{upcomingSchedule.place}</p>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <strong>없음</strong>
                            <p>아직 등록된 약속이 없어요</p>

                            <div className="Schedule_hover_panel">
                                <span>다가오는 약속</span>
                                <strong>없음</strong>
                                <p>아직 등록된 약속이 없어요</p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SummaryCards
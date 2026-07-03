function ScheduleSection({
    scheduleTitle,
    setScheduleTitle,
    scheduleDate,
    setScheduleDate,
    scheduleTime,
    setScheduleTime,
    schedulePlace,
    setSchedulePlace,
    scheduleMemo,
    setScheduleMemo,
}){
    return(
        <div className="PostWrite_schedule">
            <div className="PostWrite_schedule_header">
                <span>Promise Schedule</span>
                <h3>약속 일정</h3>
                <p>
                    게시글, 캘린더, 약속 카드에 표시됩니다!
                </p>
            </div>

            <div className="PostWrite_section">
                <label className="PostWrite_field_label">약속 제목</label>

                <input
                    type="text"
                    value={scheduleTitle}
                    onChange={(e) => setScheduleTitle(e.target.value)}
                    placeholder="예: 성수동 카페 데이트"
                />
            </div>

            <div className="PostWrite_grid">
                <div className="PostWrite_section">
                    <label className="PostWrite_field_label">약속 날짜</label>

                    <input
                        type="date"
                        value={scheduleDate}
                        onChange={(e) => setScheduleDate(e.target.value)}
                    />
                </div>

                <div className="PostWrite_section">
                    <label className="PostWrite_field_label">약속 시간</label>

                    <input
                        type="time"
                        value={scheduleTime}
                        onChange={(e) => setScheduleTime(e.target.value)}
                    />
                </div>
            </div>

            <div className="PostWrite_section">
                <label className="PostWrite_field_label">장소</label>

                <input
                    type="text"
                    value={schedulePlace}
                    onChange={(e) => setSchedulePlace(e.target.value)}
                    placeholder="예: 성수동, 강릉, 집 앞 카페"
                />
            </div>

            <div className="PostWrite_section">
                <label className="PostWrite_field_label">약속 메모</label>

                <textarea
                    className="PostWrite_small_textarea"
                    value={scheduleMemo}
                    onChange={(e) => setScheduleMemo(e.target.value)}
                    placeholder="약속에 대해 기억해둘 내용을 적어줘"
                />
            </div>
        </div>
    )
}

export default ScheduleSection
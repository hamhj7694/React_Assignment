function TitleSection({
    title,
    setTitle,
}){
    return(
        <div className="PostWrite_section">
            <label className="PostWrite_field_label">제목</label>

            <input
                type="text"
                className="PostWrite_title_input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="오늘 기억에 남은 일을 적어주세요"
            />
        </div>
    )
}

export default TitleSection
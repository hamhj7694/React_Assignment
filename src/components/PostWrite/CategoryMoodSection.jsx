function CategoryMoodSection({
    categoryList,
    moodList,
    category,
    mood,
    isMoodOpen,
    handleCategoryClick,
    handleMoodSelect,
    setIsMoodOpen,
}){
    return(
        <div className="PostWrite_section">
            <label className="PostWrite_field_label">카테고리</label>

            <div className="PostWrite_chip_group">
                {categoryList.map((item) => (
                    <button
                        type="button"
                        key={item}
                        className={
                            category === item 
                                ? "PostWrite_chip active" 
                                : "PostWrite_chip"
                        }
                        onClick={() => handleCategoryClick(item)}
                    >
                        {item}
                    </button>
                ))}
            </div>

            <div className="PostWrite_mood_select">
                <span>기분</span>

                <div className="PostWrite_mood_box">
                    <button
                        type="button"
                        className="PostWrite_mood_button"
                        onClick={() => setIsMoodOpen(!isMoodOpen)}
                    >
                        <strong>{mood}</strong>
                        <em>{isMoodOpen ? "▲" : "▼"}</em>
                    </button>

                    {isMoodOpen && (
                        <div className="PostWrite_mood_options">
                            {moodList.map((item) => (
                                <button
                                    type="button"
                                    key={item}
                                    className={
                                        mood === item 
                                            ? "PostWrite_mood_option active" 
                                            : "PostWrite_mood_option"
                                    }
                                    onClick={() => handleMoodSelect(item)}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CategoryMoodSection
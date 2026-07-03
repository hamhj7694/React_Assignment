import "./PostReaction.css"

function PostReaction({
    reactionOptions,
    myReactionLog,
    partnerReactionLog,
    handleReactionClick,
    wordText,
    setWordText,
    handleWordSubmit,
}){
    return(
        <div className="PostDetail_reaction_box">
            <p>반응하기</p>

            <div className="Reaction">
                <div className="Reaction_buttons">
                    {reactionOptions.map((reaction) => (
                        <button 
                            type="button"
                            key={reaction}
                            className={myReactionLog?.reaction === reaction ? "active" : ""}
                            onClick={() => handleReactionClick(reaction)}
                        >
                            {reaction}
                        </button>
                    ))}
                </div>

                <div className="word">
                    <p>한마디:</p>

                    <form onSubmit={handleWordSubmit}>
                        <input 
                            type="text"
                            value={wordText}
                            onChange={(e) => setWordText(e.target.value)}
                            placeholder="한마디 남기기"
                        />

                        <input 
                            type="submit" 
                            value="제출"
                        />
                    </form>
                </div>
            </div>

            <div className="Reaction_log_box">
                <p className="Reaction_log_title">우리 반응</p>

                <div className="Reaction_log_list">
                    <div className="Reaction_log_item">
                        <span className="Reaction_log_name">내 반응</span>

                        <span className="Reaction_log_reaction">
                            {myReactionLog ? myReactionLog.reaction : "아직 없음"}
                        </span>

                        <span className="Reaction_log_word">
                            {myReactionLog?.word ? myReactionLog.word : "한마디 없음"}
                        </span>

                        <span className="Reaction_log_time">
                            {myReactionLog ? (
                                <>
                                    <span>{myReactionLog.reactedAt.date}</span>
                                    <span>{myReactionLog.reactedAt.time}</span>
                                </>
                            ) : (
                                "-"
                            )}
                        </span>
                    </div>

                    <div className="Reaction_log_item">
                        <span className="Reaction_log_name">상대 반응</span>

                        <span className="Reaction_log_reaction">
                            {partnerReactionLog ? partnerReactionLog.reaction : "읽음"}
                        </span>

                        <span className="Reaction_log_word">
                            {partnerReactionLog?.word ? partnerReactionLog.word : "한마디 없음"}
                        </span>
                        
                        <span className="Reaction_log_time">
                            {partnerReactionLog ? (
                                <>
                                    <span>{partnerReactionLog.reactedAt.date}</span>
                                    <span>{partnerReactionLog.reactedAt.time}</span>
                                </>
                            ) : (
                                "-"
                            )}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostReaction
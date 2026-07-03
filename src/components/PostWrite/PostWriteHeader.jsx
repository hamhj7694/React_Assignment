function PostWriteHeader(){
    return(
        <div className="PostWrite_header">
            <div>
                <span className="PostWrite_label">Write Memory</span>
                <h2>기억 남기기</h2>
                <p>
                    오늘의 순간을 기록하면 사진첩과 캘린더에도 자연스럽게 모이게 돼.
                </p>
            </div>

            <button
                type="button"
                className="PostWrite_back"
                onClick={() => navigate("/")}
            >
                목록으로
            </button>
        </div>
    )
}
export default PostWriteHeader
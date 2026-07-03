import "./ImageViewer.css"

function ImageViewer({ image, onClose }){
    if(!image) return null

    return(
        <div 
            className="ImageViewer_overlay"
            onClick={onClose}
        >
            <div 
                className="ImageViewer_modal"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    className="ImageViewer_close"
                    onClick={onClose}
                >
                    ×
                </button>

                <img src={image.url} alt={image.name || "확대 이미지"} />
            </div>
        </div>
    )
}
export default ImageViewer
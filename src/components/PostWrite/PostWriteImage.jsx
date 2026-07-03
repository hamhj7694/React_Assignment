import { useState } from "react"
import ImageViewer from "../ImageViewer"

function PostWriteImage({
    images = [],
    handleImageChange,
    handleRemoveImage,
}){
    const [selectedImage, setSelectedImage] = useState(null)

    return(
        <>
            <div className="PostWrite_section">
                <label className="PostWrite_field_label">사진</label>

                <label className="PostWrite_image_upload">
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                    />

                    <span>+ 사진 추가</span>
                </label>

                {images.length > 0 && (
                    <div className="PostWrite_image_preview">
                        {images.map((image) => (
                            <div className="PostWrite_image_item" key={image.id}>
                                <button
                                    type="button"
                                    className="PostWrite_image_thumb"
                                    onClick={() => setSelectedImage(image)}
                                >
                                    <img 
                                        src={image.url} 
                                        alt={image.name || "업로드 이미지"} 
                                    />
                                </button>

                                <button
                                    type="button"
                                    className="PostWrite_image_remove"
                                    onClick={() => handleRemoveImage(image.id)}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <ImageViewer
                image={selectedImage}
                onClose={() => setSelectedImage(null)}
            />
        </>
    )
}

export default PostWriteImage
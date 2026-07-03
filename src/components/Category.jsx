import "./Category.css"

const categoryList = [
    {
        id: 1,
        name: "전체",
        color: "all",
    },
    {
        id: 2,
        name: "데이트",
        color: "date",
    },
    {
        id: 3,
        name: "일상",
        color: "daily",
    },
    {
        id: 4,
        name: "마음",
        color: "heart",
    },
    {
        id: 5,
        name: "여행",
        color: "travel",
    },
    {
        id: 6,
        name: "약속",
        color: "promise",
    },
]

function Category({ posts = [], selectedCategory, setSelectedCategory }){
    const getCategoryCount = (categoryName) => {
        if(categoryName === "전체"){
            return posts.length
        }

        return posts.filter((post) => post.category === categoryName).length
    }

    const handleCategoryClick = (categoryName) => {
        setSelectedCategory(categoryName)
    }

    return(
        <div className="Category_box">
            <div className="Category_header">
                <div>
                    <span className="Category_label">Archive</span>
                    <h3>기억 보관함</h3>
                </div>

                <span className="Category_icon">🗂️</span>
            </div>

            <ul className="Category_list">
                {categoryList.map((category) => (
                    <li key={category.id}>
                        <button
                            type="button"
                            className={
                                selectedCategory === category.name
                                    ? "Category_item active"
                                    : "Category_item"
                            }
                            onClick={() => handleCategoryClick(category.name)}
                        >
                            <div className="Category_name_wrap">
                                <span className={`Category_dot ${category.color}`}></span>

                                <span className="Category_name">
                                    {category.name}
                                </span>
                            </div>

                            <span className="Category_count">
                                {getCategoryCount(category.name)}
                            </span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Category
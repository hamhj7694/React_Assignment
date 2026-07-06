import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SampleNotice from '../components/SampleNotice'
import './CreateCoupleCode.css'

function CreateCoupleCode(){

    const navigate = useNavigate()

    const [coupleName, setCoupleName] = useState('')
    const [coupleCode, setCoupleCode] = useState('')

    const clickCreateCode = () => {
        // 실제 커플 홈 생성 기능은 아직 없음
        // 샘플이므로 버튼 클릭 시 기존 Home.jsx로 이동
        navigate('/home')
    }

    const goBack = () => {
        navigate('/couple-connect')
    }

    return(
        <div className="CreateCoupleCode">
            <div className="CreateCoupleCodeBox">
                <h2>커플 홈 만들기</h2>
                <p className="sub-text">
                    우리 둘만 사용할 커플 홈 정보를 입력하세요
                </p>

                <div className="input-area">
                    <input 
                        type="text"
                        placeholder="커플 홈 이름"
                        value={coupleName}
                        onChange={(event)=>setCoupleName(event.target.value)}
                    />

                    <input 
                        type="text"
                        placeholder="커플 암호"
                        value={coupleCode}
                        onChange={(event)=>setCoupleCode(event.target.value)}
                    />
                </div>

                <button className="create-main-btn" onClick={clickCreateCode}>
                    커플 홈 만들기
                </button>

                <button className="back-btn" onClick={goBack}>
                    이전으로 돌아가기
                </button>

                <SampleNotice />
            </div>
        </div>
    )
}

export default CreateCoupleCode
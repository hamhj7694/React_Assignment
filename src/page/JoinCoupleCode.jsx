import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SampleNotice from '../components/SampleNotice'
import './JoinCoupleCode.css'

function JoinCoupleCode(){

    const navigate = useNavigate()

    const [coupleCode, setCoupleCode] = useState('')

    const clickJoinCode = () => {
        // 실제 커플 암호 확인 기능은 아직 없음
        // 샘플이므로 버튼 클릭 시 기존 Home.jsx로 이동
        navigate('/home')
    }

    const goBack = () => {
        navigate('/couple-connect')
    }

    return(
        <div className="JoinCoupleCode">
            <div className="JoinCoupleCodeBox">
                <h2>커플 홈 입장</h2>
                <p className="sub-text">
                    전달받은 커플 암호를 입력하세요
                </p>

                <div className="input-area">
                    <input 
                        type="text"
                        placeholder="커플 암호"
                        value={coupleCode}
                        onChange={(event)=>setCoupleCode(event.target.value)}
                    />
                </div>

                <button className="join-main-btn" onClick={clickJoinCode}>
                    커플 홈 입장하기
                </button>

                <button className="back-btn" onClick={goBack}>
                    이전으로 돌아가기
                </button>

                <SampleNotice />
            </div>
        </div>
    )
}

export default JoinCoupleCode
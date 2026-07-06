import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SampleNotice from '../components/SampleNotice'
import './Signup.css'

function Signup(){

    const navigate = useNavigate()

    const [userId, setUserId] = useState('')
    const [password, setPassword] = useState('')
    const [nickname, setNickname] = useState('')
    const [phone, setPhone] = useState('')

    const clickSignup = () => {
        // 실제 회원가입 기능은 아직 없음
        // 샘플이므로 회원가입 완료 후 커플 연결 선택 화면으로 이동
        navigate('/couple-connect')
    }

    const goLogin = () => {
        navigate('/')
    }

    return(
        <div className="Signup">
            <div className="SignupBox">
                <h2>회원가입</h2>
                <p className="sub-text">우리 둘만의 공간을 시작해보세요</p>

                <div className="input-area">
                    <input 
                        type="text" 
                        placeholder="아이디"
                        value={userId}
                        onChange={(event)=>setUserId(event.target.value)}
                    />

                    <input 
                        type="password" 
                        placeholder="비밀번호"
                        value={password}
                        onChange={(event)=>setPassword(event.target.value)}
                    />

                    <input 
                        type="text" 
                        placeholder="닉네임"
                        value={nickname}
                        onChange={(event)=>setNickname(event.target.value)}
                    />

                    <input 
                        type="text" 
                        placeholder="전화번호"
                        value={phone}
                        onChange={(event)=>setPhone(event.target.value)}
                    />
                </div>

                <button className="signup-main-btn" onClick={clickSignup}>
                    회원가입 완료
                </button>

                <button className="login-back-btn" onClick={goLogin}>
                    로그인으로 돌아가기
                </button>

                <SampleNotice />
            </div>
        </div>
    )
}

export default Signup
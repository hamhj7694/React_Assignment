import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SampleNotice from '../components/SampleNotice'
import './Login.css'

function Login(){

    const navigate = useNavigate()

    const [userId, setUserId] = useState('')
    const [password, setPassword] = useState('')

    const clickLogin = () => {
        // 실제 로그인 기능은 아직 없음
        // 샘플이므로 로그인 버튼을 누르면 기존 Home.jsx로 이동
        navigate('/home')
    }

    const goSignup = () => {
        navigate('/signup')
    }

    return(
        <div className="Login">
            <div className="LoginBox">
                <h2>우리 둘만의 공간</h2>
                <p className="sub-text">커플 홈에 로그인하세요</p>

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
                </div>

                <button className="login-btn" onClick={clickLogin}>
                    로그인
                </button>

                <button className="signup-btn" onClick={goSignup}>
                    회원가입
                </button>

                <SampleNotice />
            </div>
        </div>
    )
}

export default Login
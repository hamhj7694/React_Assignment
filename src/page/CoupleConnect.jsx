import { useNavigate } from 'react-router-dom'
import SampleNotice from '../components/SampleNotice'
import './CoupleConnect.css'

function CoupleConnect(){

    const navigate = useNavigate()

    const goCreateCode = () => {
        navigate('/create-code')
    }

    const goJoinCode = () => {
        navigate('/join-code')
    }

    return(
        <div className="CoupleConnect">
            <div className="CoupleConnectBox">
                <h2>커플 홈 연결</h2>
                <p className="sub-text">
                    우리 둘만의 공간을 어떻게 시작할까요?
                </p>

                <div className="connect-buttons">
                    <button className="connect-btn main" onClick={goCreateCode}>
                        우리 커플 홈을 처음 만들 거예요
                    </button>

                    <button className="connect-btn sub" onClick={goJoinCode}>
                        이미 만들어진 커플 홈이 있어요
                    </button>
                </div>

                <SampleNotice />
            </div>
        </div>
    )
}

export default CoupleConnect
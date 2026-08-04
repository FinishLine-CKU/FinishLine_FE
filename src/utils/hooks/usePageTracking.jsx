import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { sendPageView } from '../ga';

// GA 보고서에서 경로 대신 읽기 쉬운 이름으로 보기 위한 매핑
const PAGE_TITLES = {
    '/': '메인',
    '/loginPage': '로그인',
    '/signupPage1': '회원가입 - 학생 인증',
    '/signupPage2': '회원가입 - 추가 정보',
    '/userGuidePage': '이용 안내',
    '/uploadpdf': '기이수과목 PDF 등록',
    '/donelecture': '기이수과목 관리',
    '/oneClickTestPage': '원클릭 검사',
    '/graduTestPage': '졸업요건 검사 결과',
    '/manageGraduPage': '졸업요건 관리',
    '/myPage': '마이페이지',
};

// SPA는 라우트가 바뀌어도 페이지가 새로 로드되지 않으므로 page_view를 직접 보낸다.
function PageTracking() {
    const location = useLocation();

    useEffect(() => {
        sendPageView(location.pathname + location.search, PAGE_TITLES[location.pathname]);
    }, [location.pathname, location.search]);

    return null;
};

export default PageTracking;

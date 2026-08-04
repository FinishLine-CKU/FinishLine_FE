// Google Analytics 4 (gtag.js) 연동
// 측정 ID(REACT_APP_GA_MEASUREMENT_ID)가 없으면 모든 함수가 아무 동작도 하지 않는다.
const MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID ?? '';

let initialized = false;

// gtag는 arguments 객체를 그대로 dataLayer에 넣어야 하므로 화살표 함수를 쓸 수 없다.
function gtag() {
    window.dataLayer.push(arguments);
};

function initGA() {
    if (!MEASUREMENT_ID || initialized) return;
    initialized = true;

    window.dataLayer = window.dataLayer || [];

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    document.head.appendChild(script);

    gtag('js', new Date());
    // SPA라 라우트가 바뀌어도 페이지가 새로 로드되지 않는다.
    // 최초 진입까지 포함해 page_view는 usePageTracking에서 직접 보내므로 자동 전송은 끈다.
    gtag('config', MEASUREMENT_ID, { send_page_view: false });
};

function sendPageView(path, title) {
    if (!initialized) return;
    gtag('event', 'page_view', {
        page_path: path,
        page_location: window.location.href,
        page_title: title ?? document.title,
    });
};

function sendEvent(name, params = {}) {
    if (!initialized) return;
    gtag('event', name, params);
};

// 학번은 개인정보라 GA에 원문을 보낼 수 없다.
// 해시값만 넘겨서 같은 학생이 여러 기기에서 접속해도 한 명으로 집계되게 한다.
const USER_ID_SALT = 'finishline-ga';

async function setUserId(studentId) {
    if (!initialized || !studentId) return;
    // crypto.subtle은 보안 컨텍스트(HTTPS, localhost)에서만 동작한다.
    if (!window.crypto?.subtle) return;

    try {
        const encoded = new TextEncoder().encode(`${USER_ID_SALT}:${studentId}`);
        const digest = await window.crypto.subtle.digest('SHA-256', encoded);
        const hashed = Array.from(new Uint8Array(digest))
            .map(byte => byte.toString(16).padStart(2, '0'))
            .join('')
            .slice(0, 16);

        gtag('set', { user_id: hashed });
    } catch (error) {
        // 사용자 식별 실패가 로그인 같은 본 기능을 막아서는 안 된다.
        console.error('GA user_id 설정 실패: ', error);
    };
};

function clearUserId() {
    if (!initialized) return;
    gtag('set', { user_id: null });
};

export { initGA, sendPageView, sendEvent, setUserId, clearUserId };

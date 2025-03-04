import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { ArrowUpRight } from 'lucide-react';

const VisitorCounter = ({subjects}) => {
  const [todayVisitors, setTodayVisitors] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [increaseRate, setIncreaseRate] = useState(0);
  const targetVisitors = 247; // 나중에 백엔드에서 받아올 값, 하드코딩
  const yesterdayVisitors = 220; // 둘을써서 증가량, 감소량 
  
  // 애니메이션 효과
  useEffect(() => {
    // 백엔드 연결 전 애니메이션만 구현
    setIsLoading(false);
    
    // 증가율 계산
    const rate = ((targetVisitors - yesterdayVisitors) / yesterdayVisitors) * 100;
    setIncreaseRate(parseFloat(rate.toFixed(1)));
    
    const duration = 1500;
    const interval = 20;
    const steps = duration / interval;
    let step = 0;
    
    const counter = setInterval(() => {
      step++;
      setTodayVisitors(Math.floor(targetVisitors * (step / steps)));
      
      if (step >= steps) {
        clearInterval(counter);
        setTodayVisitors(targetVisitors);
      }
    }, interval);
    
    return () => clearInterval(counter);
  }, []);
  
  // 방문자 수 증가 로직 
  useEffect(() => {
    // 실제로는 사용자가 처음 방문했을 때만 카운트를 증가
    const incrementVisitorCount = async () => {
      // 쿠키나 localStorage를 통해 오늘 이미 방문했는지 확인
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD 형식
      const lastVisit = localStorage.getItem('lastVisit');
      
      if (lastVisit !== today) {
        // 오늘 처음 방문한 경우에만 카운트 증가 API 호출
        // await fetch('/api/visitors/increment', { method: 'POST' });
        
        // 마지막 방문일 업데이트
        localStorage.setItem('lastVisit', today);
      }
    };
    
    if (!isLoading) {
      incrementVisitorCount();
    }
  }, [isLoading]);
  
  if (isLoading) {
    return <div className={css(styles.visitorCounter)}>로딩 중...</div>;
  }
  
  // 증가율이 양수면 증가, 음수면 감소, 0이면 변화 없음
  const renderTrend = () => {
    if (increaseRate > 0) {
      return (
        <div className={css(styles.trend, styles.increase)}>
          <ArrowUpRight className={css(styles.trendIcon)} />
          <span>어제보다 {increaseRate}% 증가</span>
        </div>
      );
    } else if (increaseRate < 0) {
      return (
        <div className={css(styles.trend, styles.decrease)}>
          <ArrowUpRight className={css(styles.trendIcon, styles.rotateDown)} />
          <span>어제보다 {Math.abs(increaseRate)}% 감소</span>
        </div>
      );
    } else {
      return (
        <div className={css(styles.trend, styles.noChange)}>
          <span>어제와 동일</span>
        </div>
      );
    }
  };
  
  return (
    <div className={css(styles.visitorCounter)}>
      <div className={css(styles.counterContent)}>
        <p className={css(styles.counterTitle)}>오늘 방문자 수</p>
        <p className={css(styles.counterValue)}>
          {subjects}<span className={css(styles.unit)}>명</span>
        </p>
        {/* {renderTrend()} */}
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  visitorCounter: {
    position: 'absolute',
    top: '170px',
    right: '5px',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    padding: '12px 15px',
    color: '#ffffff',
    width: '155px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  counterContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  counterTitle: {
    fontSize: '12px',
    margin: '0 0 5px 0',
    fontWeight: '500',
    opacity: '0.9',
  },
  counterValue: {
    fontSize: '24px',
    fontWeight: '700',
    margin: '0 0 5px 0',
  },
  unit: {
    fontSize: '14px',
    fontWeight: '400',
    marginLeft: '2px',
  },
  trend: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '11px',
  },
  increase: {
    color: '#4ade80', // 증가일 때 녹색
  },
  decrease: {
    color: '#f87171', // 감소일 때 빨간색
  },
  noChange: {
    color: '#94a3b8', // 변화 없을 때 회색
  },
  trendIcon: {
    width: '12px',
    height: '12px',
    marginRight: '4px',
  },
  rotateDown: {
    transform: 'rotate(135deg)', // 화살표를 아래 방향으로 회전
  }
});

export default VisitorCounter;
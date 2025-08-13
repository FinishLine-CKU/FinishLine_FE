import { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import { ModalContext } from '../utils/hooks/modalContext';
import axios from 'axios';
import Header from '../components/header';
import Template from '../components/template';
import Footer from '../components/footer';
import Modal from '../components/modal';
import Symbol from '../assets/images/symbol.png';

// 기존 코드
export const MAJOR = [
    { value: '030501*', label: '의예과' },
    { value: '030502*', label: '간호학과' },
    { value: '030503*', label: '의학과' },
    { value: '030701*', label: '국어교육과' },
    { value: '030702*', label: '지리교육과' },
    { value: '030704*', label: '수학교육과' },
    { value: '030705*', label: '체육교육과' },
    { value: '030707*', label: '컴퓨터교육과' },
    { value: '030709*', label: '영어교육과' },
    { value: '030710*', label: '역사교육과' },
    { value: '030790*', label: '통합사회' },
    { value: '031103*', label: '관광경영학과' },
    { value: '03300111', label: '스포츠건강관리학과' },
    { value: '03300108', label: '호텔경영학과' },
    { value: '03300110', label: '스포츠레저학과' },
    { value: '03300112', label: '스포츠지도학과' },
    { value: '031191*', label: '스포테인먼트전공(F)' },
    { value: '03300109', label: '조리외식경영학과' },
    { value: '03300118', label: '건축학부 건축공학' },
    { value: '03300118', label: '건축학부-건축공학' },
    { value: '03300117', label: '건축학부 건축학' },
    { value: '03300117', label: '건축학부-건축학' },
    { value: '031214*', label: '토목공학과' },
    { value: '031224*', label: '전자공학과' },
    { value: '031230*', label: '트리니티융합 소프트웨어학과' },
    { value: '031230*', label: '트리니티융합-소프트웨어학과' },
    { value: '031230*', label: '소프트웨어학과' },
    { value: '031230*', label: '트리니티자유 소프트웨어학과' },
    { value: '031230*', label: '트리니티자유-소프트웨어학과' },
    { value: '031241*', label: '기술창업학과' },
    { value: '031295*', label: 'AI융합전공(C)' },
    { value: '031297*', label: 'AI융합전공(F)' },
    { value: '031298*', label: '항만물류시스템전공' },
    { value: '031299*', label: '반도체융합전공' },
    { value: '03300105', label: '사회복지학과' },
    { value: '03300106', label: '경영학과' },
    { value: '03300107', label: '광고홍보학과' },
    { value: '03301001', label: '경찰행정학과' },
    { value: '03301001', label: '경찰행정학부' },
    { value: '03301001', label: '경찰행정학부 경찰행정학' },
    { value: '03301001', label: '경찰행정학부-경찰행정학' },
    { value: '03301002', label: '경찰행정학부 해양경찰' },
    { value: '03301002', label: '경찰행정학부-해양경찰' },
    { value: '03301001', label: '경찰행정학부 경찰행정학전공' },
    { value: '03301001', label: '경찰행정학부-경찰행정학전공' },
    { value: '03301002', label: '경찰행정학부 해양경찰전공' },
    { value: '03301002', label: '경찰행정학부-해양경찰전공' },
    { value: '03300104', label: '행정학과' },
    { value: '032391*', label: '스타트업콘텐츠마케팅전공(F) 스타트업콘텐츠마케팅' },
    { value: '032391*', label: '스타트업콘텐츠마케팅전공(F)-스타트업콘텐츠마케팅' },
    { value: '032401*', label: '의료공학과' },
    { value: '032402*', label: '의료IT학과' },
    { value: '032403*', label: '의생명과학과' },
    { value: '03300101', label: '의료경영학과' },
    { value: '032408*', label: '바이오융합공학과' },
    { value: '032415*', label: '안경광학과' },
    { value: '032490*', label: '정밀의료융합전공' },
    { value: '03300103', label: '디지털헬스케어융합전공' },
    { value: '032492*', label: '스마트수소에너지융합전공' },
    { value: '032501*', label: '항공운항서비스학과' },
    { value: '032506*', label: '항공교통물류학과' },
    { value: '03300114', label: '항공운항학과' },
    { value: '032515*', label: '무인항공학과' },
    { value: '03300115', label: '항공정비학과' },
    { value: '032591*', label: '항공설계전공(F-C)' },
    { value: '03260103', label: '공연예술학부 실용음악' },
    { value: '03260103', label: '공연예술학부-실용음악' },
    { value: '03260104', label: '공연예술학부 연기예술' },
    { value: '03260104', label: '공연예술학부-연기예술' },
    { value: '032603*', label: '뷰티디자인학과 뷰티디자인' },
    { value: '032603*', label: '뷰티디자인학과-뷰티디자인' },
    { value: '032608*', label: '콘텐츠제작학과' },
    { value: '032609*', label: 'CG디자인학과' },
    { value: '032702*', label: '치매전문재활학과' },
    { value: '032703*', label: '산림치유학과' },
    { value: '032705*', label: '언어재활학과' },
    { value: '032708*', label: '복지상담학과' },
    { value: '032709*', label: '스마트통합치유학과' },
    { value: '032710*', label: '해양치유레저학과' },
    { value: '032801*', label: '임상병리학과' },
    { value: '032802*', label: '치위생학과' },
    { value: '03290112', label: '트리니티자유 반려동물학' },
    { value: '03290112', label: '트리니티자유-반려동물학' },
    { value: '03290113', label: '트리니티자유 군사학' },
    { value: '03290113', label: '트리니티자유-군사학' },
    { value: '03300101', label: '트리니티융합 의료경영학' },
    { value: '03300101', label: '트리니티융합-의료경영학' },
    { value: '03300102', label: '트리니티융합 바이오메디컬' },
    { value: '03300102', label: '트리니티융합-바이오메디컬' },
    { value: '03300103', label: '트리니티융합 디지털헬스케어' },
    { value: '03300103', label: '트리니티융합-디지털헬스케어' },
    { value: '03300104', label: '트리니티융합 행정학' }, 
    { value: '03300104', label: '트리니티융합-행정학' }, 
    { value: '03300105', label: '트리니티융합 사회복지학' },
    { value: '03300105', label: '트리니티융합-사회복지학' },
    { value: '03300106', label: '트리니티융합 경영학' }, 
    { value: '03300106', label: '트리니티융합-경영학' }, 
    { value: '03300107', label: '트리니티융합 광고홍보학' },
    { value: '03300107', label: '트리니티융합-광고홍보학' },
    { value: '03300108', label: '트리니티융합 호텔경영학' },
    { value: '03300108', label: '트리니티융합-호텔경영학' },
    { value: '03300109', label: '트리니티융합 조리외식경영학' },
    { value: '03300109', label: '트리니티융합-조리외식경영학' },
    { value: '03300110', label: '트리니티융합 스포츠레저학' },
    { value: '03300110', label: '트리니티융합-스포츠레저학' },
    { value: '03300111', label: '트리니티융합 스포츠건강관리학' },
    { value: '03300111', label: '트리니티융합-스포츠건강관리학' },
    { value: '03300112', label: '트리니티융합 스포츠지도학' },
    { value: '03300112', label: '트리니티융합-스포츠지도학' },
    { value: '032506*', label: '트리니티융합 항공교통물류' }, 
    { value: '032506*', label: '트리니티융합-항공교통물류' },
    { value: '03300114', label: '트리니티융합 항공운항' }, 
    { value: '03300114', label: '트리니티융합-항공운항' },
    { value: '03300115', label: '트리니티융합 항공정비학' }, 
    { value: '03300115', label: '트리니티융합-항공정비학' }, 
    { value: '03300116', label: '트리니티융합 스마트항만공학' },
    { value: '03300116', label: '트리니티융합-스마트항만공학' },
    { value: '03300117', label: '트리니티융합 건축학' },
    { value: '03300117', label: '트리니티융합-건축학' },
    { value: '03300118', label: '트리니티융합 건축공학' },
    { value: '03300118', label: '트리니티융합-건축공학' },
    { value: '03260103', label: '트리니티융합 실용음악' }, 
    { value: '03260103', label: '트리니티융합-실용음악' }, 
    { value: '032608*', label: '트리니티융합 콘텐츠제작' }, 
    { value: '032608*', label: '트리니티융합-콘텐츠제작' },
    { value: '032609*', label: '트리니티융합 CG디자인' },  
    { value: '032609*', label: '트리니티융합-CG디자인' },
    { value: '03301001', label: '경찰학부 경찰행정학' }, 
    { value: '03301001', label: '경찰학부-경찰행정학' },
    { value: '03301002', label: '경찰학부 해양경찰' },
    { value: '03301002', label: '경찰학부-해양경찰' },
    { value: '033020', label: '자율전공학부' }, 
    { value: '03300122', label: '트리니티융합 호텔관광경영학' }, 
    { value: '03300122', label: '트리니티융합-호텔관광경영학' },
    { value: '03300123', label: '트리니티융합 스포츠재활의학' }, 
    { value: '03300123', label: '트리니티융합-스포츠재활의학' }, 
];
// 학생신상기록카드 대비 코드
export const MAJOR_ALL = [
    // 의과대학
    { value: '030503*', label: '의예과' },
    { value: '030502*', label: '간호학과' },
    { value: '030503*', label: '의학과' },
    // 사범대학
    { value: '030701*', label: '국어교육과' },
    { value: '030702*', label: '지리교육과' },
    { value: '030704*', label: '수학교육과' },
    { value: '030705*', label: '체육교육과' },
    { value: '030707*', label: '컴퓨터교육과' },
    { value: '030709*', label: '영어교육과' },
    { value: '030710*', label: '역사교육과' },
    // 일반학과 + 트리니티
    { value: '031103*', label: '관광경영학과' },
    { value: '03300111', label: '스포츠건강관리학과' },
    { value: '03300111', label: '트리니티융합 스포츠건강관리학전공' },
    { value: '03300111', label: '트리니티융합 스포츠재활의학전공' },
    { value: '03300111', label: '트리니티자유 스포츠건강관리학전공' },
    { value: '03300111', label: '트리니티자유 스포츠재활의학전공' },
    { value: '03300108', label: '호텔경영학과' },
    { value: '03300108', label: '트리니티융합 호텔경영학전공' },
    { value: '03300108', label: '트리니티자유 호텔경영학전공' },
    { value: '03300108', label: '트리니티융합 호텔관광경영학전공' },
    { value: '03300108', label: '트리니티자유 호텔관광경영학전공' },
    { value: '03300110', label: '스포츠레저학과' },
    { value: '03300110', label: '트리니티융합 스포츠레저학전공' },
    { value: '03300110', label: '트리니티자유 스포츠레저학전공' },
    { value: '03300112', label: '스포츠지도학과' },
    { value: '03300112', label: '트리니티융합 스포츠지도학전공' },
    { value: '03300112', label: '트리니티자유 스포츠지도학전공' },
    { value: '03300112', label: '경기지도학과' },
    { value: '03300112', label: '스포츠레저학부' },
    { value: '03300112', label: '스포츠레저학부 경기지도학전공' },
    { value: '03300112', label: '스포츠레저학부-경기지도학전공' },
    { value: '031191*', label: '스포테인먼트전공(F)' },
    { value: '03300109', label: '조리외식경영학과' },
    { value: '03300109', label: '트리니티융합 조리외식경영학전공' },
    { value: '03300109', label: '트리니티자유 조리외식경영학전공' },
    { value: '03300118', label: '건축학부' },   // 건축학 or 건축공학 확인 필요
    { value: '03300118', label: '건축학부 건축공학' },
    { value: '03300118', label: '건축학부 건축공학전공' },
    { value: '03300117', label: '건축학부 건축학전공' },
    { value: '03300117', label: '트리니티융합 건축학전공' },
    { value: '03300117', label: '트리니티자유 건축학전공' },
    { value: '03300117', label: '건축학부 건축학' },
    { value: '03300118', label: '트리니티융합 건축공학전공' },
    { value: '03300118', label: '트리니티자유 건축공학전공' },
    { value: '031214*', label: '토목공학과' },
    { value: '031224*', label: '전자공학과' },
    { value: '031230*', label: '소프트웨어학과' },
    { value: '031241*', label: '기술창업학과' },
    { value: '031241*', label: '창업지식재산학과' },
    { value: '031295*', label: 'AI융합전공(C)' },
    { value: '031297*', label: 'AI융합전공(F)' },
    { value: '031298*', label: '항만물류시스템전공' },
    { value: '031299*', label: '반도체융합전공' },
    { value: '03300105', label: '사회복지학과' },
    { value: '03300105', label: '트리니티융합 사회복지학전공' },
    { value: '03300105', label: '트리니티자유 사회복지학전공' },
    { value: '03300106', label: '경영학과' },
    { value: '03300106', label: '트리니티융합 경영학전공' }, 
    { value: '03300106', label: '트리니티자유 경영학전공' }, 
    { value: '03300107', label: '광고홍보학과' },
    { value: '03300107', label: '트리니티융합 광고홍보학전공' },
    { value: '03300107', label: '트리니티자유 광고홍보학전공' },
    { value: '03301001', label: '경찰행정학부' },
    { value: '03301001', label: '경찰행정학과' },
    { value: '03301001', label: '경찰행정학부 경찰행정학' },
    { value: '03301001', label: '경찰행정학부 경찰행정학전공' },
    { value: '03301001', label: '경찰학부 경찰행정학' },
    { value: '03301001', label: '경찰학부 경찰행정학전공' },
    { value: '03301001', label: '경찰공공행정학부 경찰행정학전공' },
    { value: '03301001', label: '트리니티융합 경찰행정학전공' },
    { value: '03301001', label: '트리니티자유 경찰행정학전공' },
    { value: '03301002', label: '경찰행정학부 해양경찰' },
    { value: '03301002', label: '경찰행정학부 해양경찰전공' },
    { value: '03301002', label: '경찰학부 해양경찰' },
    { value: '03301002', label: '경찰학부 해양경찰전공' },
    { value: '03301001', label: '트리니티융합 해양경찰학전공' },
    { value: '03301001', label: '트리니티자유 해양경찰학전공' },
    { value: '03300104', label: '경찰공공행정학부 공공행정학전공' },
    { value: '03300104', label: '행정학과' },
    { value: '03300104', label: '트리니티융합 행정학전공' },
    { value: '03300104', label: '트리니티자유 행정학전공' },
    { value: '032391*', label: '스타트업콘텐츠마케팅전공(F) 스타트업콘텐츠마케팅' },
    { value: '032391*', label: '스타트업콘텐츠마케팅전공(F)-스타트업콘텐츠마케팅' },
    { value: '032401*', label: '의료공학과' },
    { value: '032401*', label: '트리니티융합 디지털헬스케어전공' },
    { value: '032401*', label: '트리니티자유 디지털헬스케어전공' },
    { value: '032402*', label: '의료IT학과' },
    { value: '032403*', label: '의생명과학과' },
    { value: '032403*', label: '트리니티융합 의생명과학전공' },
    { value: '032403*', label: '트리니티자유 의생명과학전공' },
    { value: '032403*', label: '트리니티융합 바이오메디컬전공' },
    { value: '032403*', label: '트리니티자유 바이오메디컬전공' },
    { value: '03300101', label: '의료경영학과' },
    { value: '03300101', label: '트리니티융합 의료경영학전공' },
    { value: '03300101', label: '트리니티자유 의료경영학전공' },
    { value: '032408*', label: '바이오융합공학과' },
    { value: '032415*', label: '안경광학과' },
    { value: '032490*', label: '정밀의료융합전공' },
    { value: '032492*', label: '스마트수소에너지융합전공' },
    { value: '032501*', label: '항공운항서비스학과' },
    { value: '032506*', label: '항공경영학과' },
    { value: '032506*', label: '항공경영물류학과' },
    { value: '032506*', label: '항공교통물류학과' },
    { value: '032506*', label: '트리니티융합 항공교통물류전공' },
    { value: '032506*', label: '트리니티자유 항공교통물류전공' }, 
    { value: '03300114', label: '항공운항학과' },
    { value: '03300114', label: '트리니티융합 항공운항전공' },
    { value: '03300114', label: '트리니티자유 항공운항전공' },
    { value: '032515*', label: '무인항공학과' },
    { value: '03300115', label: '항공정비학과' },
    { value: '03300115', label: '트리니티융합 항공정비학전공' },
    { value: '03300115', label: '트리니티자유 항공정비학전공' },
    { value: '032591*', label: '항공설계전공(F-C)' },
    { value: '03260103', label: '공연예술학부' },
    { value: '03260103', label: '공연예술학부 실용음악' },
    { value: '03260103', label: '트리니티융합 실용음악전공' },
    { value: '03260103', label: '트리니티자유 실용음악전공' },
    { value: '03260104', label: '공연예술학부 방송연예전공' },
    { value: '03260104', label: '공연예술학부-방송연예전공' },
    { value: '03260104', label: '공연예술학부 연기예술전공' },
    { value: '03260104', label: '공연예술학부-연기예술전공' },
    { value: '032603*', label: '뷰티디자인학과' },
    { value: '032603*', label: '공연예술학부 뷰티디자인학전공' },
    { value: '032603*', label: '공연예술학부-뷰티디자인학전공' },
    { value: '032608*', label: '콘텐츠제작학과' },
    { value: '032608*', label: '트리니티융합 콘텐츠제작전공' },
    { value: '032608*', label: '트리니티자유 콘텐츠제작전공' },
    { value: '032609*', label: 'CG디자인학과' },
    { value: '032609*', label: '트리니티융합 CG디자인전공' },
    { value: '032609*', label: '트리니티자유 CG디자인전공' },
    { value: '032609*', label: '미디어콘텐츠학부 CG디자인전공' },
    // 휴먼서비스대학
    { value: '032702*', label: '치매전문재활학과' },
    { value: '032703*', label: '산림치유학과' },
    { value: '032705*', label: '언어재활학과' },
    { value: '032708*', label: '중독재활학과' },
    { value: '032708*', label: '중독재활상담학과' },
    { value: '032708*', label: '복지상담학과' },
    { value: '032709*', label: '통합치유학과' },
    { value: '032709*', label: '스마트통합치유학과' },
    { value: '032710*', label: '해양치유레저학과' },
    // 헬스케어융합대학
    { value: '032801*', label: '임상병리학과' },
    { value: '032802*', label: '치위생학과' },
    // 기타
    { value: '03290112', label: '트리니티자유 반려동물학전공' },
    { value: '03290113', label: '트리니티자유 군사학전공' },
    { value: '03300116', label: '트리니티융합 스마트항만공학' },
    { value: '033020', label: '자율전공학부' },
    { value: '033020', label: '자율전공학부 자율전공' },
];
// 최신학과 기준 코드
export const MAJOR_NEW = [
    { value: '030503*', label: '의예과' }, //의예와 통일
    { value: '030502*', label: '간호학과' },
    { value: '030503*', label: '의학과' },
    { value: '030701*', label: '국어교육과' },
    { value: '030702*', label: '지리교육과' },
    { value: '030704*', label: '수학교육과' },
    { value: '030705*', label: '체육교육과' },
    { value: '030707*', label: '컴퓨터교육과' },
    { value: '030709*', label: '영어교육과' },
    { value: '030710*', label: '역사교육과' },
    { value: '031103*', label: '관광경영학과' },
    { value: '03300111', label: '트리니티융합 스포츠재활의학전공' },
    { value: '03300111', label: '트리니티융합-스포츠재활의학전공' },
    { value: '03300108', label: '트리니티융합 호텔관광경영학' },
    { value: '03300108', label: '트리니티융합-호텔관광경영학' },
    { value: '03300110', label: '트리니티융합 스포츠레저학전공' },
    { value: '03300110', label: '트리니티융합-스포츠레저학전공' },
    { value: '03300112', label: '스포츠레저학부' },
    { value: '03300112', label: '트리니티융합 스포츠지도학전공' },
    { value: '03300112', label: '트리니티융합-스포츠지도학전공' },
    { value: '031191*', label: '스포테인먼트전공(F)' },
    { value: '03300109', label: '트리니티융합 조리외식경영학전공' },
    { value: '03300109', label: '트리니티융합-조리외식경영학전공' },
    { value: '03300117', label: '트리니티융합 건축학전공' },
    { value: '03300117', label: '트리니티융합-건축학전공' },
    { value: '03300118', label: '건축학부' },   // 건축학 or 건축공학 확인 필요
    { value: '03300118', label: '트리니티융합 건축공학전공' },
    { value: '03300118', label: '트리니티융합-건축공학전공' },
    { value: '031214*', label: '토목공학과' },
    { value: '031224*', label: '전자공학과' },
    { value: '031230*', label: '소프트웨어학과' },
    { value: '031241*', label: '기술창업학과' },
    { value: '031241*', label: '창업지식재산학과' },
    { value: '031295*', label: 'AI융합전공(C)' },
    { value: '031297*', label: 'AI융합전공(F)' },
    { value: '031298*', label: '항만물류시스템전공' },
    { value: '031299*', label: '반도체융합전공' },
    { value: '03300105', label: '트리니티융합 사회복지학전공' },
    { value: '03300105', label: '트리니티융합-사회복지학전공' },
    { value: '03300106', label: '트리니티융합 경영학전공' }, 
    { value: '03300106', label: '트리니티융합-경영학전공' },
    { value: '03300107', label: '트리니티융합 광고홍보학전공' },
    { value: '03300107', label: '트리니티융합-광고홍보학전공' },
    { value: '03301001', label: '경찰행정학부' },
    { value: '03301001', label: '경찰행정학과' },
    { value: '03301001', label: '경찰학부 경찰행정학' },
    { value: '03301001', label: '경찰학부-경찰행정학' },
    { value: '03301002', label: '경찰학부 해양경찰' },
    { value: '03301002', label: '경찰학부-해양경찰' },
    { value: '03300104', label: '트리니티융합 행정학전공' },
    { value: '03300104', label: '트리니티융합-행정학전공' },
    { value: '032391*', label: '스타트업콘텐츠마케팅전공(F) 스타트업콘텐츠마케팅' },
    { value: '032391*', label: '스타트업콘텐츠마케팅전공(F)-스타트업콘텐츠마케팅' },
    { value: '032401*', label: '트리니티융합 디지털헬스케어전공' },
    { value: '032401*', label: '트리니티융합-디지털헬스케어전공' },
    { value: '032402*', label: '의료IT학과' },
    { value: '032403*', label: '트리니티융합 의생명과학전공' },
    { value: '032403*', label: '트리니티융합-의생명과학전공' },
    { value: '03300101', label: '트리니티융합 의료경영학전공' },
    { value: '03300101', label: '트리니티융합-의료경영학전공' },
    { value: '032408*', label: '바이오융합공학과' },
    { value: '032415*', label: '안경광학과' },
    { value: '032490*', label: '정밀의료융합전공' },
    { value: '032492*', label: '스마트수소에너지융합전공' },
    { value: '032501*', label: '항공운항서비스학과' },
    { value: '032506*', label: '트리니티융합 항공교통물류전공' },
    { value: '032506*', label: '트리니티융합-항공교통물류전공' },
    { value: '03300114', label: '트리니티융합 항공운항전공' }, 
    { value: '03300114', label: '트리니티융합-항공운항전공' },
    { value: '032515*', label: '무인항공학과' },
    { value: '03300115', label: '트리니티융합 항공정비학전공' },
    { value: '03300115', label: '트리니티융합-항공정비학전공' },
    { value: '032591*', label: '항공설계전공(F-C)' },
    { value: '03260103', label: '공연예술학부' }, 
    { value: '03260103', label: '트리니티융합 실용음악전공' }, 
    { value: '03260103', label: '트리니티융합-실용음악전공' },
    { value: '03260104', label: '공연예술학부 연기예술전공' }, 
    { value: '03260104', label: '공연예술학부-연기예술전공' },
    { value: '032603*', label: '뷰티디자인학과' },
    { value: '032608*', label: '트리니티융합 콘텐츠제작전공' },
    { value: '032608*', label: '트리니티융합-콘텐츠제작전공' },
    { value: '032609*', label: '트리니티융합 CG디자인전공' },
    { value: '032609*', label: '트리니티융합-CG디자인전공' },
    { value: '032702*', label: '치매전문재활학과' },
    { value: '032703*', label: '산림치유학과' },
    { value: '032705*', label: '언어재활학과' },
    { value: '032708*', label: '복지상담학과' },
    { value: '032709*', label: '스마트통합치유학과' },
    { value: '032710*', label: '해양치유레저학과' },
    { value: '032801*', label: '임상병리학과' },
    { value: '032802*', label: '치위생학과' },
    { value: '03290112', label: '트리니티자유 반려동물학전공' },
    { value: '03290112', label: '트리니티자유-반려동물학전공' },
    { value: '03290113', label: '트리니티자유 군사학전공' },
    { value: '03290113', label: '트리니티자유-군사학전공' },
    { value: '03300116', label: '트리니티융합 스마트항만공학' },
    { value: '03300116', label: '트리니티융합-스마트항만공학' },  
    { value: '033020', label: '자율전공학부' }, 
];
export const MICRO_DEGREE = [
    { value: '110', label: '스마트시티 마이크로디그리' },
    { value: '120', label: '재난안전소방 마이크로디그리' },
    { value: '130', label: '지속가능발전 마이크로디그리' },
    { value: '140', label: 'AI리터러시 마이크로디그리' },
    { value: '141', label: 'AI기반환경디자인홍보 마이크로디그리' },
    { value: '150', label: '스마트기술창업 마이크로디그리' },
    { value: '160', label: '스포츠경영관리분석 마이크로디그리' },
    { value: '170', label: '디지털스포츠헬스케어 마이크로디그리' },
    { value: '180', label: '디지털영상콘텐츠 마이크로디그리' },
    { value: '190', label: '반도체공정및장비 마이크로디그리' },
    { value: '200', label: '의료AI시스템 마이크로디그리' },
    { value: '210', label: '다문화와한국어교육 마이크로디그리' },
    { value: '220', label: '융합형사이버수사 마이크로디그리' },
    { value: '230', label: '웰니스치유농업 마이크로디그리' },
    { value: '240', label: '데이터리터러시 마이크로디그리' },
    { value: '250', label: '미래모빌리티 마이크로디그리' },
    { value: '260', label: '의료데이터분석&시각화 마이크로디그리' },
    { value: '270', label: '스마트푸드테크와IT 마이크로디그리' },
];
export const SUBMAJORTYPE = [
    { value: 'double', label: '복수전공' },
    { value: 'minor', label: '부전공' },
    { value: 'linked', label: '연계전공' },
];

function SignupPage2() {
    const [additionalMajorType, setAdditionalMajorType] = useState('');
    const [additionalMajor, setAdditionalMajor] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [error, setError] = useState('');
    const [checkError, setCheckError] = useState('');
    const [microDegree, setMicroDegree] = useState('');
    const navigate = useNavigate();
    const { modalState, openModal, closeModal } = useContext(ModalContext);
    const location = useLocation();
    const { student_id, name, major } = location.state;

    // 추가 전공 선택 (MAJOR)
    const checkMajor = (e) => {
        const input = e.target.value
        if (input === MAJOR.find(item => item.label === major).value) {
            alert('주전공과 동일한 전공은 선택할 수 없습니다.');
            e.target.value = '';
            setAdditionalMajor(e.target.value);
        } else {
            setAdditionalMajor(input);
        };
    };
    const passwordFormat = (e) => {
        const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!#^%*?&])[a-zA-Z\d@$!#^%*?&]{8,20}$/;
        const input = e.target.value;
        setPassword(input)
        if (input === '') {
            setError('비밀번호 필수 입력');
        } else {
            if (regex.test(input)) {
                setError('');
            } else {
                setError('영문 대/소문자, 숫자, 특수문자를 포함하여 8~20자 입력해주세요.');
            }
        };
    };
    const passwordCorrect = (e) => {
        const input = e.target.value;
        setPasswordCheck(input);
        if (password !== '') {
            if (password === input) {
                setCheckError('');
            } else {
                setCheckError('비밀번호가 일치하지 않습니다.');
            };
        } else {
            setError('비밀번호 필수 입력');
        };
    };
    const finalCheck = () => {
        if (password !== '' && passwordCheck !== '' && error === '' && checkError === '') {
            if (additionalMajorType === '' || (additionalMajorType !== '' && additionalMajor !== '')) {
                return false
            } else {
                return true
            }
        } else {
            return true
        };
    };
    // 전공명 코드 찾기 (MAJOR_ALL)
    const registerInfo = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/user/register_info/', {
                name: name,
                major: MAJOR_ALL.find(item => item.label === major).value,
                student_id: student_id,
                additionalMajorType: additionalMajorType,
                additionalMajor: additionalMajor,
                microDegree: microDegree,
                password: password
            });
            if (response.data === true) {
                openModal();
            } else {
                alert("회원 정보가 정상적으로 저장되지 않았습니다. 잠시 후 다시 시도해주세요.");
            };
        } catch {
            alert("서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
        };
    };
    const navigateLoginPage = () => {
        navigate('/loginPage');
        closeModal();
    };
    const enterSubmit = (e) => {
        if (!modalState && e.key === 'Enter') {
            if (password !== '' && passwordCheck !== '' && error === '' && checkError === '') {
                if (additionalMajorType === '' || (additionalMajorType !== '' && additionalMajor !== '')) {
                    registerInfo();
                };
            };
        };
    };
    return (
        <>
            {modalState ?
                <Modal infoMessage="회원가입 완료" infoSymbol={Symbol} mainMessage="FINISH LINE 회원가입을 축하합니다!" mainButton="로그인" mainButtonAction={navigateLoginPage} closeButton={navigateLoginPage} />
                : null}
            <Header />
            <Template title="회원가입" subtitle="졸업요건 검사 서비스 이용을 위해 약관 동의와 학생 인증 절차가 필요합니다." />
            <div className={css(styles.container)}>
                <div className={css(styles.defaultInfoArea)}>
                    <span className={css(styles.containerTitle)}>기본 정보 확인</span>
                    <div className={css(styles.infoContainer)}>
                        <label className={css(styles.infoLable)}>이름</label>
                        <input className={css(styles.defaultInfo)} disabled="true" value={name}></input>
                        <label className={css(styles.infoLable)}>학과</label>
                        <input className={css(styles.defaultInfo)} disabled="true" value={major}></input>
                        <label className={css(styles.infoLable)}>학번</label>
                        <input className={css(styles.defaultInfo)} disabled="true" value={student_id}></input>
                    </div>
                </div>
                <div className={css(styles.additionalInfoArea)}>
                    <span className={css(styles.containerTitle)}>추가 정보 설정</span>
                    <div className={css(styles.infoContainer)} onKeyDown={enterSubmit}>
                        <label className={css(styles.infoLable)}>복수/부/연계 전공</label>
                        <select className={css(styles.majorStatus)} onChange={(e) => setAdditionalMajorType(e.target.value)}>
                            <option value="">해당 없음</option>
                            <option value="double">복수전공</option>
                            <option value="minor">부전공</option>
                            <option value="linked">연계전공</option>
                        </select>
                        <select className={css(styles.majorSelect)} onChange={checkMajor}>
                            {additionalMajorType ? (
                                <>
                                    <option value="">선택</option>
                                    {MAJOR.map((item) => (
                                        <option value={item.value}>{item.label}</option>
                                    ))}
                                </>) : (<option value=""></option>)}
                        </select>
                        <label className={css(styles.infoLable)}>소단위전공</label>
                        <select className={css(styles.majorSelect)} onChange={(e) => setMicroDegree(e.target.value)}>
                            <option value="">해당 없음</option>
                            {MICRO_DEGREE.map((item) => (
                                <option value={item.value}>{item.label}</option>
                            ))}
                        </select>
                        <div className={css(styles.pwLabelSpace)}>
                            <label className={css(styles.infoLable)}>비밀번호 설정<span className={css(styles.essential)}> *</span></label>
                            {error ? <span className={css(styles.errorMessage)}>{error}</span> : null}
                        </div>
                        <input className={css(error ? styles.ErrorAdditionalInfo : styles.additionalInfo)} type="password" onBlur={passwordFormat} placeholder="영문 대/소문자, 숫자, 특수문자 포함 (8~20자)"></input>
                        <div className={css(styles.pwLabelSpace)}>
                            <label className={css(styles.infoLable)}>비밀번호 확인<span className={css(styles.essential)}> *</span></label>
                            {checkError ? <span className={css(styles.errorMessage)}>{checkError}</span> : null}
                        </div>
                        <input className={css(checkError ? styles.ErrorAdditionalInfo : styles.additionalInfo)} type="password" onChange={passwordCorrect} placeholder="영문 대/소문자, 숫자, 특수문자 포함 (8~20자)"></input>
                    </div>
                </div>
                <button className={css(styles.signUpButton)} disabled={finalCheck()} onClick={registerInfo}>가입하기</button>
            </div>
            <Footer />
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '60px 0 0 0',
        backgroundColor: '#FFFEFB',
        fontFamily: 'Lato',
        gap: '65px',
    },
    defaultInfoArea: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '424px',
    },
    containerTitle: {
        fontFamily: 'Lato',
        fontWeight: '600',
        fontSize: '18px',
        marginBottom: '25px',
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '424px',
    },
    infoLable: {
        fontFamily: 'Lato',
        fontWeight: '600',
        fontSize: '14px',
        marginBottom: '8px',
    },
    defaultInfo: {
        marginBottom: '30px',
        padding: '0 0 0 15px',
        width: '410px',
        height: '46px',
        border: '1px solid #CACACA',
        borderRadius: '6px',
        fontFamily: 'Lato',
        fontSize: '16px',
        fontWeight: '500',
        color: '#7A828A',
        backgroundColor: '#F6F6F6'
    },
    additionalInfoArea: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '424px',
    },
    majorStatus: {
        marginBottom: '10px',
        padding: '0 0 0 15px',
        width: '425px',
        height: '46px',
        border: '1px solid #CACACA',
        borderRadius: '6px',
        fontFamily: 'Lato',
        fontSize: '16px',
        fontWeight: '500',
        color: '#7A828A',
        appearance: 'none',
        backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='%237A828A' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 10px center',
        ':focus': {
            color: '#2B2A28',
            outline: '1px solid #2B2A28',
        },
    },
    majorSelect: {
        marginBottom: '30px',
        padding: '0 0 0 15px',
        width: '425px',
        height: '46px',
        border: '1px solid #CACACA',
        borderRadius: '6px',
        fontFamily: 'Lato',
        fontSize: '16px',
        fontWeight: '500',
        color: '#7A828A',
        appearance: 'none',
        backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='%237A828A' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 10px center',
        ':focus': {
            color: '#2B2A28',
            outline: '1px solid #2B2A28',
        },
    },
    pwLabelSpace: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
    },
    essential: {
        color: '#FF4921',
        fontSize: '14px'
    },
    errorMessage: {
        color: '#FF4921',
        fontSize: '12px',
        fontFamily: 'Lato',
        fontWeight: '600',
        margin: '0 0 6px auto',
    },
    additionalInfo: {
        marginBottom: '30px',
        padding: '0 0 0 15px',
        width: '410px',
        height: '46px',
        border: '1px solid #CACACA',
        borderRadius: '6px',
        fontFamily: 'Lato',
        fontSize: '16px',
        fontWeight: '500',
        color: '#7A828A',
        ':focus': {
            color: '#2B2A28',
            outline: '1px solid #2B2A28',
        },
    },
    ErrorAdditionalInfo: {
        marginBottom: '30px',
        padding: '0 0 0 15px',
        width: '410px',
        height: '46px',
        border: '1.5px solid #FF4921',
        borderRadius: '6px',
        fontFamily: 'Lato',
        fontSize: '16px',
        fontWeight: '500',
        color: '#7A828A',
        ':focus': {
            color: '#2B2A28',
            outline: '0.5px solid #FF4921',
        },
    },
    signUpButton: {
        margin: '-30px 0 130px 0',
        width: '117px',
        height: '40px',
        border: '0px',
        borderRadius: '10px',
        fontFamily: 'Lato',
        fontWeight: '700',
        fontSize: '17px',
        color: '#FFFEFB',
        backgroundColor: '#2B2A28',
        ':hover:not(:disabled)': {
            cursor: 'pointer',
        },
        ':active:not(:disabled)': {
            backgroundColor: '#595650',
            color: '#FFFEFB',
        },
        ':disabled': {
            color: '#FFFEFB',
            backgroundColor: '#CACACA',
        },
    },
});

export default SignupPage2;
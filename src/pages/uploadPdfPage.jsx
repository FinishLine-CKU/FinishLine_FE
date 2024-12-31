import React, { useState, useRef } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Template from '../components/template';
import Header from  '../components/header';
import Footer from '../components/footer';

function UploadPdfPage() {
  const imageInput = useRef();
  const [fileNames, setFileNames] = useState([]);

  const onCickImageUpload = () => {
    imageInput.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileNames(file.name);
    }
  };

    return (
      <div>
        <Header />
        <Template title="기이수 과목 관리" />
        <div className={css(styles.container)}>
          <div className={css(styles.donelistcontainer)}>
          <h2 className={css(styles.title)}>기이수과목 등록</h2>
            <hr className={css(styles.custom_hr)}/>
              <div className={css(styles.itemfilecontainer)}>
                <p className={css(styles.custom_text)}>파일 선택</p>
                <div className={css(styles.itemboxcontainer)}>
                  {/* <p className={css(styles.custom_text_box)}>파일을 선택해주세요. (최대 25장)</p> */}
                  <p className={css(styles.custom_text_box)}>
                    {fileNames ? ` ${fileNames}` : "파일을 선택해주세요. (최대 25장)"}
                  </p>
                  <input type="file" style={{ display: "none" }} ref={imageInput} />
                  <button className={css(styles.itemfileButton)} onClick={onCickImageUpload} onChange={handleFileChange}>파일 업로드</button>
                </div>
                  <button className={css(styles.itemregistButton)}>등록하기</button>
              </div>
              <b className={css(styles.custom_b_text)}>가톨릭관동대학교 포털 &gt; 로그인 &gt; 종합정보시스템 &gt; 학적관리 &gt; 학기별 성적조회 및 출력 &gt; 
                인쇄 &gt; PDF로 저장
              </b><b className={css(styles.custom_b_text)}>계절학기 포함 모든 학기 PDF를 첨부해주세요.</b>
            </div>
          </div>
        <Footer />
      </div>
    );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '137px',
  },
  donelistcontainer: {
    marginTop: '50px',
    display: 'flex',
    flexDirection: 'column',
    width: '35%',
  },
  title: {
    marginBottom: '5px',
  },
  custom_hr: {
    width: '100%',
    border: '1px solid #E4E4E4',
  },
  itemfilecontainer: {
    marginTop: '30px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemboxcontainer: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: '10px',
    width: '70%',
    height: '45%',
    border: '1px solid #CCC',
    borderRadius: '5px',
    backgroundColor: '#F6F6F6', 
  },
  itemregistButton: {
    marginLeft: '5px',
    border: '1px soild black',
    borderRadius: '5px',
    backgroundColor: 'transparent',
    color: 'black',
    width: '70px',
    height: '33px',
    fontSize: '12px',
  },
  itemfileButton: {
    marginTop: '5px',
    marginRight: '5px',
    width: '70px',
    height: '20px',
    backgroundColor: 'rgba(90, 87, 87, 0.81)',
    border: '1px solid #CACACA',
    borderRadius: '5px',
    fontSize: '11px',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    color: '#FFFEFB',
    marginLeft: 'auto',
    padding: '5px',
  },
  custom_text: {
    fontSize: '18px',
  },
  custom_text_box: {
    marginLeft: '10px',
    marginTop: '5px',
    fontSize: '13px',
    color: '#CACACA',
  },
  custom_b_text: {
    fontSize: '13px',
    color: '#006277',
  },
});

export default UploadPdfPage;
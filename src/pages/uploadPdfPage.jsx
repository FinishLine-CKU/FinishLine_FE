import React, { useState, useRef, useCallback } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Template from '../components/template';
import Header from  '../components/header';
import Footer from '../components/footer';

function UploadPdfPage() {
  const [fileNames, setFileNames] = useState([]);

  const fileInputHandler = useCallback((event) => {
    const files = event.target && event.target.files;
    if (files) {
      const newFileNamesArray = Array.from(files)
        .slice(0, 25 - fileNames.length)
        .map(file => file.name);
  
      setFileNames(prevFileNames => [...prevFileNames, ...newFileNamesArray]);
    }
  }, [fileNames]);

  const handleDeleteFile = (index) => {
    setFileNames((prevFileNames) => prevFileNames.filter((_, i) => i !== index));
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
                <div 
                    className={css(styles.itemboxcontainerScrollable)} 
                  >
                    <input 
                      type="file" 
                      style={{ display: "none" }} 
                      id="uploadpdf" 
                      name="pdf" 
                      accept=".pdf" 
                      onChange={fileInputHandler}
                    />
                    <div className={css(styles.filenameContainerScrollable)}>
                      {fileNames.length === 0 ? (
                        <p className={css(styles.custom_text_box)}>파일을 선택해주세요. (최대 25장)</p>
                      ) : (
                        fileNames.map((fileName, index) => (
                          <div key={index} className={css(styles.fileNameButtonContainer)}>
                            <button className={css(styles.fileNameButton)}>
                              {fileName}
                              <button
                                            onClick={() => handleDeleteFile(index)}
                                            className={css(styles.deleteButton)}
                                            type="button"
                                        >
                                            ×
                                        </button>
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                  <div className={css(styles.itemboxcontainerScrollabletest)} >
                  <label htmlFor="uploadpdf" className={css(styles.itemfileButton)}>파일 업로드</label>
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
    width: '40%',
  },
  title: {
    marginBottom: '5px',
    fontSize: '23px',
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
    alignItems: 'center',
    marginLeft: '10px',
    width: '70%',
    height: '45%',
    border: '1px solid #CCC',
    borderRadius: '5px',
    backgroundColor: '#F6F6F6', 
  },
  itemregistButton: {
    //marginLeft: '3px',
    border: '1px soild black',
    borderRadius: '5px',
    backgroundColor: 'transparent',
    color: 'black',
    width: '70px',
    height: '33px',
    fontSize: '12px',
  },
  itemfileButton: {
    marginRight: '5px',
    width: '60px',
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
    padding: '3px',
  },
  custom_text: {
    fontSize: '18px',
  },
  custom_text_box: {
    flexDirection: 'row',
    marginLeft: '10px',
    fontSize: '13px',
    color: '#CACACA',
    justifyContent: 'center',  // 수직 중앙 정렬
  },
  custom_b_text: {
    marginTop: '10px',
    fontSize: '13px',
    color: '#006277',
    textAlign: 'center',
  },
  filenameContainer: {
    display: 'flex',
    flexDirection: 'column', 
    marginLeft: '10px',
  },
  itemboxcontainerScrollable: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    //marginLeft: '3px',  // 간격 제거
    paddingLeft: '0px',  // 패딩 제거
    width: '60%',
    height: '100px',
    overflow: 'auto',
    borderTop: '1px solid #CCC',
    borderBottom: '1px solid #CCC',
    borderLeft: '1px solid #CCC',
    backgroundColor: '#F6F6F6',
    borderTopLeftRadius: '5px',
    borderBottomLeftRadius: '5px',
  },
  filenameContainerScrollable: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    width: '100%',
    height: '100px',
  },
  itemboxcontainerScrollabletest: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    marginLeft: '0px',  // 간격 제거
    paddingLeft: '0px',  // 패딩 제거
    width: '13%',
    height: '100px',
    borderTop: '1px solid #CCC',
    borderBottom: '1px solid #CCC',
    borderRight: '1px solid #CCC',
    backgroundColor: '#F6F6F6',
    borderTopRightRadius: '5px',
    borderBottomRightRadius: '5px',
  },
  fileNameButtonContainer: {
    marginBottom: '5px', // 파일 이름 간 간격을 주기 위해 추가
  },
  fileNameButton: {
    flex: 1,
    minHeight: '30px',
    height: '30px',
    padding: '0 13px',
    border: '1px solid #CACACA',
    borderRadius: '6px',
    fontSize: '13px',
    color: 'black',
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '8px',
    wordBreak: 'break-all',
    cursor: 'pointer',  // 버튼처럼 보이게 하기 위해 추가
  },
  deleteButton: {
    background: 'none',
    border: 'none',
    color: '#FF4444',
    cursor: 'pointer',
    fontSize: '16px',
    padding: '0 5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ':hover': {
        color: '#FF0000',
    }
},
});

export default UploadPdfPage;
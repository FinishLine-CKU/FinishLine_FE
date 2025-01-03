import React, { useState, useCallback } from 'react';
import { StyleSheet, css } from 'aphrodite';
import axios from 'axios';

function UploadPdfComponents() {
  const [fileNames, setFileNames] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

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

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
        alert('파일을 선택해주세요.');
        return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
        formData.append('files', file);
    });

    try {
        const response = await axios.post('http://127.0.0.1:8000/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        localStorage.setItem('completedLectures', 'true');
        
        alert('파일이 성공적으로 업로드되었습니다.');
        setSelectedFiles([]);
        setFileNames([]);
    } catch (error) {
        console.error('업로드 에러:', error);
        alert(error.response?.data?.message || '파일 업로드 중 오류가 발생했습니다.');
    }
};

    return (
      <div>
        <div className={css(styles.container)}>
          <div className={css(styles.donelistcontainer)}>
          <h2 className={css(styles.title)}>기이수과목 등록</h2>
            <hr className={css(styles.custom_hr)}/>
              <div className={css(styles.itemRowcontainer)}>
                <p className={css(styles.custom_text)}>파일 선택</p>
                <div className={css(styles.itemboxcontainer)} >
                    <input 
                      type="file" 
                      style={{ display: "none" }} 
                      id="uploadpdf" 
                      name="pdf" 
                      accept=".pdf" 
                      onChange={fileInputHandler}/>
                    <div className={css(styles.itemBoxContainerScrollable)}>
                      {fileNames.length === 0 ? (
                        <p className={css(styles.custom_text_box)}>파일을 선택해주세요. (최대 25장)</p>
                      ) : (
                        fileNames.map((fileName, index) => (
                          <div key={index} className={css(styles.fileNameButtonContainer)}>
                            <button className={css(styles.itemfileNameButton)}>
                              {fileName}
                              <button
                                onClick={() => handleDeleteFile(index)}
                                className={css(styles.itemdeleteButton)}
                                type="button">×</button>
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                  <div className={css(styles.itemboxcontainerScrollableSecond)} >
                  <label htmlFor="uploadpdf" className={css(styles.itemUploadButton)}>파일 업로드</label>
                  </div>
                  <button className={css(styles.itemRegistButton)} onClick={handleUpload}>등록하기</button>
              </div>
              <b className={css(styles.custom_b_text)}>가톨릭관동대학교 포털 &gt; 로그인 &gt; 종합정보시스템 &gt; 학적관리 &gt; 학기별 성적조회 및 출력 &gt; 
                인쇄 &gt; PDF로 저장
              </b><b className={css(styles.custom_b_text)}>계절학기 포함 모든 학기 PDF를 첨부해주세요.</b>
            </div>
          </div>
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
  itemRowcontainer: {
    marginTop: '30px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemRegistButton: {
    border: '1px soild black',
    borderRadius: '5px',
    backgroundColor: 'transparent',
    color: 'black',
    width: '70px',
    height: '33px',
    fontSize: '12px',
    marginLeft: '5px',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#444444',
      color: '#FFFEFB',
    }
  },
  itemUploadButton: {
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
    cursor: 'pointer',
    ':hover': {
      backgroundColor: 'rgba(90, 87, 87, 0.50)',
    }
  },
  custom_text: {
    fontSize: '18px',
  },
  custom_text_box: {
    flexDirection: 'row',
    marginLeft: '10px',
    fontSize: '13px',
    color: '#CACACA',
    marginTop: '40px',
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
  itemboxcontainer: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    overflowY: 'auto',
    width: '63%',
    height: '100px',
    borderTop: '1px solid #CCC',
    borderBottom: '1px solid #CCC',
    borderLeft: '1px solid #CCC',
    backgroundColor: '#F6F6F6',
    borderTopLeftRadius: '5px',
    borderBottomLeftRadius: '5px',
    marginLeft: '5px',
  },
  itemBoxContainerScrollable: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100px',
  },
  itemboxcontainerScrollableSecond: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    marginLeft: '0px',
    paddingLeft: '0px',
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
    marginBottom: '5px',
  },
  itemfileNameButton: {
    flex: 1,
    minHeight: '30px',
    height: 'auto',
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
    cursor: 'pointer',
  },
  itemdeleteButton: {
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

export default UploadPdfComponents;
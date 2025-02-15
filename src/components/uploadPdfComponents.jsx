import { useNavigate, useLocation  } from 'react-router-dom';
import { useState, useCallback } from 'react';
import { StyleSheet, css } from 'aphrodite';
import axios from 'axios';
import whiteCKULogo from '../assets/images/whiteCKULogo.png';
import loadingGIF from '../assets/images/loading.gif';

function UploadPdfComponents() {
  const [fileNames, setFileNames] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState();

  const fileInputHandler = useCallback((event) => {
    const files = event.target && event.target.files;
    if (files) {
      const newFilesArray = Array.from(files)
        .slice(0, 25 - fileNames.length);
  
      setSelectedFiles(prevSelectedFiles => [
        ...prevSelectedFiles,
        ...newFilesArray
      ]);

      const newFileNamesArray = newFilesArray.map(file => file.name);
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
        formData.append('user_id', localStorage.getItem('idToken'));
    });

    try {
        setLoading(true);
        console.log(formData)
        const response = await axios.post('http://127.0.0.1:8000/graduation/upload_pdf/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        const data = response.data.data;
        const duplicateFiles = response.data.duplicate_files;

        if (duplicateFiles.length > 0) {
            setLoading(false);
            alert(`중복된 파일이 포함되어 있습니다:\n${duplicateFiles.join('\n')}\n기이수과목 관리로 넘어갑니다.`);
            setSelectedFiles([]);
            setFileNames([]);
            localStorage.setItem('uploadPDF', true);
            navigate('/donelecture');
        } else {
          setLoading(false);
          localStorage.setItem('uploadPDF', true);
          alert('파일이 성공적으로 업로드되었습니다.');
          setSelectedFiles([]);
          setFileNames([]);
    
          if (location.pathname === '/donelecture') {
            window.location.reload();
          } else {
            localStorage.setItem('uploadPDF', true);
            navigate('/donelecture');
          }
        }
    } catch (error) {
        setLoading(false);
        console.error('업로드 에러:', error);
        alert(error.response?.data?.message || '파일 업로드 중 오류가 발생했습니다.');
    }
  };

    return (
      <div>
        {loading ?  <div className={css(styles.modalbigcontainer)}>
                        <div className={css(styles.modalContainer)}>
                          <div className={css(styles.icons)}>
                              <img src={whiteCKULogo} className={css(styles.ckuLogo)}/>
                              <img src={loadingGIF} className={css(styles.loadingGIF)}/>
                          </div>
                            <div className={css(styles.closeButtonContainer)}>
                                <span className={css(styles.title)}>데이터 저장중...</span>
                            </div>
                            <div className={css(styles.mainContents)}>
                              5초 정도 소요됩니다. 잠시만 기다려주세요
                            </div>
                        </div>
        </div> : null}
        <div className={css(styles.container)}>
          <div className={css(styles.donelistcontainer)}>
            <div className={css(styles.titleContainer)}>
              <span className={css(styles.title)}>기이수과목 등록</span>
            </div>
            <hr className={css(styles.custom_hr)}/>
            <div className={css(styles.itemRowcontainer)}>
              <div className={css(styles.itemTextcontainer)}>
                <p className={css(styles.custom_text)}>파일 선택</p>
              </div>
              <div className={css(styles.containerSecond)}>
                <div className={css(styles.itemboxcontainer)}>
                  <input 
                    type="file" 
                    style={{ display: "none" }} 
                    id="uploadpdf" 
                    accept=".pdf" 
                    multiple
                    onChange={fileInputHandler}
                  />
                  {fileNames.length === 0 ? (
                    <p className={css(styles.custom_text_box)}>
                      파일을 선택해주세요. (최대 25장)
                    </p>
                  ) : (
                    fileNames.map((fileName, index) => (
                      <div key={index} className={css(styles.fileNameButtonContainer)}>
                        <span>{fileName}</span>
                        <button
                          onClick={() => handleDeleteFile(index)}
                          className={css(styles.itemdeleteButton)}
                          type="button"
                        >×</button>
                      </div>
                    ))
                  )}
                </div>
                <div className={css(styles.itemboxcontainerScrollableSecond)}>
                  <label htmlFor="uploadpdf" className={css(styles.itemUploadButton)}>파일 업로드</label>
                </div>
              </div>
              <button className={css(styles.itemRegistButton)} onClick={handleUpload}>등록하기</button>
            </div>
            <b className={css(styles.custom_b_text)}>가톨릭관동대학교 포털 &gt; 로그인 &gt; 종합정보시스템 &gt; 학적관리 &gt; 학기별 성적조회 및 출력 &gt; 인쇄 &gt; PDF로 저장
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
    paddingBottom: '137px',
    backgroundColor: '#FFFEFB'
  },
  donelistcontainer: {
    paddingTop: '50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    paddingBottom: '5px',
    fontFamily: 'Lato',
    fontSize: '23px',
    fontWeight: '700',
    textAlign: 'left',
  },
  titleContainer: {
    width: '520px',
    paddingBottom: '5px',
    fontFamily: 'Lato',
    fontSize: '23px',
  },
  custom_hr: {
    width: '100%',
    border: '1px solid #E4E4E4',
  },
  itemRowcontainer: {
    paddingTop: '30px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemRegistButton: {
    border: '1px solid black',
    borderRadius: '5px',
    backgroundColor: 'transparent',
    color: 'black',
    width: '70px',
    height: '25px',
    fontSize: '12px',
    marginLeft: '1%',
    cursor: 'pointer',
    fontFamily: 'Lato',
    fontWeight: '600'
  },
  itemUploadButton: {
    marginRight: '5px',
    width: '53px',
    height: '16px',
    backgroundColor: 'rgba(90, 87, 87, 0.81)',
    border: '1px solid #CACACA',
    borderRadius: '5px',
    fontSize: '9px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFEFB',
    marginLeft: 'auto',
    padding: '3px',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: 'rgba(90, 87, 87, 0.50)',
    }
  },
  custom_text: {
    fontFamily: 'Lato',
    fontSize: '18px',
    fontWeight: '600',
    whiteSpace: 'nowrap',
    marginRight: '5px',
  },
  custom_text_box: {
    fontFamily: 'Lato',
    fontSize: '13px',
    color: '#CACACA',
  },
  custom_b_text: {
    marginTop: '10px',
    fontFamily: 'Lato',
    fontSize: '11px',
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
    flexDirection: 'column',
    position: 'relative',
    width: '300px',
    minHeight: 'auto', 
    maxHeight: '100px', 
    height: 'auto',    
    border: '1px solid #CCC',
    borderRight: 'none',
    backgroundColor: '#F6F6F6',
    borderRadius: '5px 0 0 5px',
    padding: '4px',
    overflowY: 'auto',
    overflowX: 'hidden',
    scrollbarWidth: 'thin',
    scrollbarColor: '#888 #F6F6F6',
    '&::-webkit-scrollbar': {
      width: '6px'
    },
    '&::-webkit-scrollbar-track': {
      background: '#F6F6F6'
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#888',
      borderRadius: '3px'
    }
  },
  itemboxcontainerScrollableSecond: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '70px',
    height: 'auto',
    border: '1px solid #CCC',
    backgroundColor: '#F6F6F6',
    borderRadius: '0 5px 5px 0',
    minHeight: 'auto',
    maxHeight: '100px', 
    borderLeft: 'none',
  },
  fileNameButtonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    padding: '4px',
    paddingLeft: '15px',
    marginBottom: '2px',
    backgroundColor: '#FFFEFB',
    borderRadius: '3px',
    border: '1px solid #CACACA',
    fontSize: '14px',
  },
  itemfileNameButton: {
    flex: 1,
    minHeight: '20px',
    height: 'auto',
    padding: '0 8px',
    border: '1px solid #CACACA',
    borderRadius: '6px',
    fontFamily: 'Lato',
    fontSize: '13px',
    color: 'black',
    backgroundColor: '#FFFEFB',
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
    fontFamily: 'Lato',
    fontSize: '16px',
    padding: '0 10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ':hover': {
        color: '#FF0000',
    }
  },
  containerSecond: {
    display: 'flex',
    alignItems: 'stretch',
    height: 'auto',
    minHeight: 'auto',
    maxHeight: '100px',
    backgroundColor: '#FFFEFB'
  },
  itemTextcontainer: {
    width: '80px',
  },  
  modalbigcontainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems:'center',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: '999',
  },
  modalContainer: {
      display: 'flex',
      flexDirection: 'column',
      width: '420px',
      padding: '50px 70px 50px 70px',
      backgroundColor: '#FFFEFB',
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.25)',
      border: '1px solid #7A828A',
      borderRadius: '6px',
      zIndex: '1000',
      marginBottom: '30px',
  },
  closeButtonContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '30px',
  },
  close: {
      border: 'none',
      backgroundColor: 'transparent',
      padding: '0px',
      marginRight: '-20px',
  },
  closeIcon: {
      width: '30px',
      height: '30px',
      ':hover': {
          cursor: 'pointer'
      }
  },
  mainContents: {
      display: 'flex',
      justifyContent: 'center',
      color: '#006277',
  },
  ActionButtonContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      paddingRight: '10px'
  },
  actionButton: {
      width: '83px',
      height: '40px',
      borderRadius: '10px',
      backgroundColor: '#2B2A28',
      border: '1px solid #2B2A28',
      color: '#fff',
      fontFamily: 'Lato',
      fontSize: '16px',
      fontWeight: '700',
      marginRight: '-20px',
      ':hover:not(:disabled)': {
          cursor: 'pointer'
      },
      ':active:not(:disabled)': {
          backgroundColor: '#595650',
          borderColor: '#595650'
      },
      ':disabled':{
          color: '#FFFEFB',
          backgroundColor: '#CACACA',
          borderColor: '#CACACA'
      },
  },
  icons: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
    width: '100%'
  },
  loadingGIF: {
    position: 'absolute',
    zIndex: '1001',
    width: '177px',
    marginTop: '40px',
    marginLeft: '90px'
  },
});

export default UploadPdfComponents;
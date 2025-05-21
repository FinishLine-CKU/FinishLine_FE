import { useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import axios from 'axios';
import pdfIcon from '../assets/images/pdfIcon.svg';
import LoadingComponents from "./loadingComponents"

function UploadPdfComponents() {
    const [fileNames, setFileNames] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]); // PDF Files state
    const [loading, setLoading] = useState();
    const [isDrag, setIsDrag] = useState();
    const location = useLocation();
    const navigate = useNavigate();

    // 선택한 PDF Files 처리
    const fileInputHandler = useCallback((event) => {
        const files = event.target && event.target.files;
        if (files) {
            const newFilesArray = Array.from(files)
                .slice(0, 15 - fileNames.length);

            setSelectedFiles(prevSelectedFiles => [
                ...prevSelectedFiles,
                ...newFilesArray
            ]);

            const newFileNamesArray = newFilesArray.map(file => ({
                name: file.name,
                size: Math.round(file.size / 1024)}));  // KB 환산
            setFileNames(prevFileNames => [...prevFileNames, ...newFileNamesArray]);
        }
    }, [fileNames]);

    // PDF Files 삭제
    const handleDeleteFile = (index, e) => {
        e.preventDefault(); // File 삭제 시 파일 선택 창 클릭 오류 방지
        setFileNames((prevFileNames) => prevFileNames.filter((_, i) => i !== index));
    };

    // 선택 Files 업로드
    const handleUpload = async () => {
        if (selectedFiles.length === 0) {
            alert('파일을 선택해주세요.');
            return;
        }

        // 파일 업로드 및 학번 전달을 위해 FormData 사용
        const formData = new FormData();
        selectedFiles.forEach((file) => {
            formData.append('files', file); // Selected Files
            formData.append('user_id', localStorage.getItem('idToken'));    // 학번
        });

        try {
            setLoading(true);
            console.log(formData)
            const response = await axios.post('http://127.0.0.1:8000/graduation/upload_pdf/', formData);
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
            setSelectedFiles([]);
            setFileNames([]);
        }
    };

    const fileDragEnter = () => {
        setIsDrag(true);
    };

    const fileDragOver = (e) => {
        e.preventDefault();
        setIsDrag(true);
    };

    const fileDragEnd = () => {
        setIsDrag(false);
    };

    const fileDrop = (e) => {
        setIsDrag(false);
        e.preventDefault();
        const dragFiles = {
            target : {
                files: e.dataTransfer.files
            }
        };
        fileInputHandler(dragFiles);
    };

    return (
        <div>
            {loading && <LoadingComponents />}
            <div className={css(styles.container)}>
                <div className={css(styles.donelistcontainer)}>
                    <div className={css(styles.titleContainer)}>
                        <span className={css(styles.title)}>기이수과목 등록</span>
                        <span className={css(styles.pcEnvWarn)}>* 원활한 등록을 위해 PC환경을 권장합니다.</span>
                    </div>
                    <hr className={css(styles.custom_hr)} />
                    {localStorage.getItem('uploadPDF') || localStorage.getItem('oneClickTest') ? null :
                    <div className={css(styles.uploadGuide)}>
                        <div className={css(styles.straight)}>
                            <span className={css(styles.guideMessage)}>1. <strong><a href="https://info.cku.ac.kr/haksa/common/loginForm2.jsp" className={css(styles.linkInformationSystem)} target="_blank" >종합정보시스템</a></strong> 접속 후 로그인 (PC환경)</span>
                            <button className={css(styles.ckuWeb)}><a href="https://info.cku.ac.kr/haksa/common/loginForm2.jsp" target="_blank" className={css(styles.removeStyle)}>바로가기</a></button>
                        </div>
                        <span className={css(styles.guideMessage)}>2. 좌측 메뉴에서 <strong>학적관리＞학기별 성적조회 및 출력</strong> 선택</span>
                        <span className={css(styles.guideMessage)}>3. <strong>이수년도, 학기</strong> 선택 및 검색</span>
                        <span className={css(styles.guideMessage)}>4. <strong>인쇄</strong> 및 <strong>PDF로 저장</strong></span>
                    </div>}
                    <div className={css(styles.itemRowcontainer)}>
                        <div className={css(styles.containerSecond)}>
                            <label className={css(isDrag ? styles.itemboxcontainerActive : styles.itemboxcontainer)}
                                onDragEnter={fileDragEnter}
                                onDragOver={fileDragOver}
                                onDragLeave={fileDragEnd}
                                onDrop={fileDrop}>
                                <input
                                    type="file"
                                    id="uploadpdf"
                                    style={{ display: 'none'}}
                                    accept=".pdf"
                                    multiple
                                    onChange={fileInputHandler}
                                    htmlFor="uploadpdf"
                                />
                                {fileNames.length === 0 ?
                                <label htmlFor="uploadpdf"
                                    className={css(isDrag ? styles.itemUploadButtonActive : styles.itemUploadButton)}>
                                    <img src={pdfIcon}></img>
                                    이곳을 클릭하거나 파일을 드래그 하여 첨부하세요.
                                    <div className={css(styles.pdfUploadButton)}>PDF 가져오기</div>
                                </label> : 
                                <label htmlFor="uploadpdf" className={css(isDrag ? styles.fileControlContainerActive : styles.fileControlContainer)}>
                                    <span className={css(styles.fileSelectText)}>파일 선택</span>
                                    <div className={css(styles.fileControlButtons)}>
                                        <div htmlFor="uploadpdf" className={css(styles.pdfUploadButton)}>PDF 가져오기</div>
                                        <button className={css(styles.savePDFButton)} onClick={handleUpload}>등록하기</button>
                                    </div>
                                </label>}
                                {fileNames.length === 0 ? null :
                                <div className={css(isDrag ? styles.filesContinerActive : styles.filesContiner)}>
                                {fileNames.map((file, index) => (
                                <div className={css(styles.filesGap)}>
                                    <label key={index} className={css(styles.fileNameButtonContainer)}>
                                        <div className={css(styles.fileInfo)}>
                                            <img src={pdfIcon} className={css(styles.pdfIcons)}></img>
                                            <span className={css(styles.fileName)}>{file.name}</span>
                                            <span className={css(styles.fileSize)}>{file.size}KB</span>
                                        </div>
                                        <button
                                            onClick={(e) => handleDeleteFile(index, e)}
                                            className={css(styles.itemdeleteButton)}
                                            type="button"
                                        >×</button>
                                    </label>
                                </div>
                                ))}
                                </div>}
                            </label>
                        </div>
                    </div>
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
    pcEnvWarn: {
        fontFamily: 'Lato',
        fontSize: '12px',
        color: '#FF4921'
    },
    titleContainer: {
        width: '520px',
        paddingBottom: '5px',
        fontFamily: 'Lato',
        fontSize: '23px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    custom_hr: {
        width: '100%',
        border: '1px solid #E4E4E4',
    },
    uploadGuide: {
        width: '95%',
        padding: '30px 0 30px 0',
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        gap: '18px'
    },
    straight: {
        display: 'flex',
        alignItems: 'center',
    },
    linkInformationSystem: {
        color: '#006277',
        // textDecoration: 'none',
        padding: '3px 0',
        transition: 'color 0.1s ease',
        ':hover': {
            color: '#EA7175',
            textDecoration: 'underline',
        }
    },
    ckuWeb: {
        backgroundColor: '#006277',
        font: 'Lato',
        fontWeight: '600',
        fontSize: '11px',
        color: '#FFFEFB',
        border: '1px solid #006277',
        borderRadius: '6px',
        height: '23px',
        ':hover': {
            cursor: 'pointer'
        },
        ':active': {
            opacity: '0.8'
        }
    },
    removeStyle: {
        textDecoration: 'none',
        color: '#FFFEFB'
    },
    guideMessage: {
        fontFamily: 'Lato',
        fontSize: '18px',
        fontWeight: '500',
        paddingRight: '15px'
    },
    itemRowcontainer: {
        paddingTop: '20px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '35px'
    },
    itemUploadButton: {
        width: '100%',
        height: '100%',
        fontSize: '13px',
        fontWeight: '600',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#3D5286',
        marginLeft: 'auto',
        padding: '30px 0',
        cursor: 'pointer',
        ':hover': {
            backgroundColor: '#F6F6F6',
        }
    },
    itemUploadButtonActive: {
        width: '100%',
        height: '100%',
        fontSize: '13px',
        fontWeight: '600',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#3D5286',
        marginLeft: 'auto',
        padding: '30px 0',
        cursor: 'pointer',
        backgroundColor: '#F6F6F6'
    },
    fileControlButtons: {
        display: 'flex',
        gap: '14px'
    },
    pdfUploadButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '110px',
        height: '30px',
        borderRadius: '5px',
        backgroundColor: '#3D5286',
        border: '1px solid #3D5286',
        color: '#FFFEFB',
        fontFamily: 'Lato',
        fontSize: '12px',
        fontWeight: '700',
        ':hover': {
            cursor: 'pointer',
        },
        ':active': {
            border: '1px solid rgba(61, 82, 134, 0.8)',
            opacity: '0.8',
        }
    },
    savePDFButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100px',
        height: '30px',
        borderRadius: '5px',
        backgroundColor: '#FFFEFB',
        border: '1px solid #3D5286',
        color: '#3D5286',
        fontFamily: 'Lato',
        fontSize: '12px',
        fontWeight: '800',
        ':hover': {
            cursor: 'pointer',
        },
        ':active': {
            border: '1px solid rgba(61, 82, 134, 0.8)',
            opacity: '0.7',
        }
    },
    fileControlContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '25px 30px'
    },
    fileControlContainerActive: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '25px 30px',
        backgroundColor: '#F6F6F6'
    },
    fileSelectText: {
        fontFamily: 'Lato',
        fontSize: '18px',
        fontWeight: '700'
    },
    itemboxcontainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: 'auto',
        border: '1px dashed #CCC',
        backgroundColor: 'transparent',
        borderRadius: '20px',
        overflowY: 'auto',
        overflowX: 'hidden',
        transition: 'border-color 0.3s ease-in-out',
        ':hover': {
            borderColor: '#3D5286',
        }
    },
    itemboxcontainerActive: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: 'auto',
        border: '1px dashed #3D5286',   // DragOver 효과 적용
        transition: 'border-color 0.3s ease-in-out',
        backgroundColor: 'transparent',
        borderRadius: '20px',
        overflowY: 'auto',
        overflowX: 'hidden',
    },
    filesContiner: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0 30px 25px 30px',
        ':hover': {
            cursor: 'pointer'
        },
    },
    filesContinerActive: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0 30px 25px 30px',
        ':hover': {
            cursor: 'pointer'
        },
        backgroundColor: '#F6F6F6'
    },
    filesGap: {
        display: 'flex',
        flexDirection: 'column',
        padding: '5px 0',
        ':hover': {
            cursor: 'pointer'
        },
    },
    fileNameButtonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '4px',
        paddingLeft: '15px',
        backgroundColor: '#FFFEFB',
        borderRadius: '5px',
        border: '1px solid #CACACA',
        fontSize: '14px',
        transition: 'background-color 0.3s ease-in',
        ':hover': {
            backgroundColor: 'rgba(189, 185, 185, 0.25)',
        }
    },
    fileInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px'
    },
    pdfIcons: {
        width: '29px',
    },
    fileName: {
        color: '#3D5286',
        fontFamily: 'Lato',
        fontSize: '14px',
        fontWeight: '700'
    },
    fileSize: {
        paddingTop: '2px',
        paddingLeft: '5px',
        opacity: '0.6',
        color: '#3D5286',
        fontFamily: 'Lato',
        fontSize: '12px',
        fontWeight: '600'
    },
    itemdeleteButton: {
        background: 'none',
        border: 'none',
        color: '#3D5286',
        cursor: 'pointer',
        fontFamily: 'Lato',
        fontSize: '20px',
        fontWeight: '800',
        padding: '2px 15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerSecond: {
        display: 'flex',
        width: '100%',
        height: 'auto',
        backgroundColor: 'transparent',
    },
});

export default UploadPdfComponents;
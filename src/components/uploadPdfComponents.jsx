import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import { RiExternalLinkLine } from "react-icons/ri";
import axios from 'axios';
import pdfIcon from '../assets/images/pdfIcon.svg';
import mockupDevice from '../assets/images/mockupDevice.png';
import pdfGuide1 from '../assets/images/pdfGuide1.gif';
import pdfGuide2 from '../assets/images/pdfGuide2.gif';
import pdfGuide3 from '../assets/images/pdfGuide3.gif';
import pdfGuide4 from '../assets/images/pdfGuide4.gif';
import LoadingComponents from "./loadingComponents";

function UploadPdfComponents() {
    const [fileNames, setFileNames] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]); // PDF Files state
    const [loading, setLoading] = useState();
    const [isDrag, setIsDrag] = useState();
    const [step, setStep] = useState(1);
    const [fadeIn, setFadeIn] = useState(false);
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
            const response = await axios.post('https://finishline-cku.com/graduation/upload_pdf/', formData);
            const successFiles = response.data.data;
            const duplicateFiles = response.data.duplicate_files;
            const errorFiles = response.data.error_files;
            const imageFiles = response.data.image_files;

            if (imageFiles.length > 0) {
                setLoading(false);
                alert(`PDF 파일 형식이 올바르지 않습니다.\n기이수과목 등록은 PC 환경에서 진행해주세요.\n\n파일명:\n${imageFiles.join('\n')}`);
                setSelectedFiles([]);
                setFileNames([]);
            }

            if (errorFiles.length > 0) {
                setLoading(false);
                alert(`PDF 파일 형식이 올바르지 않습니다.\n기이수과목 PDF 파일 저장 시 "인쇄 > PDF로 저장"을 확인하세요.\n\n파일명:\n${errorFiles.join('\n')}`);
                setSelectedFiles([]);
                setFileNames([]);
            }

            if (duplicateFiles.length > 0) {
                setLoading(false);
                alert(`중복된 파일이 포함되어 있습니다:\n기이수과목 관리 화면으로 넘어갑니다.\n\n파일명:\n${duplicateFiles.join('\n')}`);
                setSelectedFiles([]);
                setFileNames([]);
                localStorage.setItem('uploadPDF', true);
                navigate('/donelecture');
            }

            if (successFiles.length > 0){
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

    useEffect(() => {
        const timeout = setTimeout(() => {
            setFadeIn(true);
        }, 500);
        return () => clearTimeout(timeout);
    }, [step]);

    return (
        <>
            {localStorage.getItem('uploadPDF') || localStorage.getItem('oneClickTest') ? null :
            <div className={css(styles.uploadGuideContainer)}>
                <div className={css(styles.mockupContainer)}>
                    <img src={mockupDevice} className={css(styles.mockupDevice)}/>
                    <img src={step === 1 ? pdfGuide1 : step === 2 ? pdfGuide2 : step === 3 ? pdfGuide3 : step === 4 ? pdfGuide4 : null} className={css(styles.showGuideProcess)} alt="gif" />
                </div>
                <div className={css(styles.guideContainer)}>
                    <div className={css(styles.guideTitleContainer)}>
                        <span className={css(styles.guideTitle)}>기이수과목 PDF 등록 가이드</span>
                        <span className={css(styles.guideSubTitle)}>아래 절차에 따라 PDF를 등록해주세요.</span>
                    </div>
                    <div className={css(styles.guideContentsLayout)}>
                        <div className={css(styles.guideContentsContainer)} onClick={() => { if(!(step === 1 && fadeIn)){setFadeIn(false); setStep(1);} }}>
                            <div className={css(step === 1 ? styles.activateContainer : styles.numberingContainer)} />
                            <div className={css(styles.guideColumn)}>
                                <span className={css(step === 1 ? styles.activateGuideFont : styles.guideFont)}>1. 종합정보시스템 접속 및 로그인</span>
                                {step === 1 && fadeIn ?
                                <>
                                    <span className={css(styles.guideDescription)}>
                                        PC 환경에서 <a href="https://info.cku.ac.kr/haksa/common/loginForm2.jsp" target="_blank" className={css(styles.pointContent)}>CKU 종합정보시스템 <RiExternalLinkLine className={css(styles.link)}/></a> 으로 접속 후
                                    </span>
                                    <span className={css(styles.guideDescriptionSecond)}>
                                        아이디, 비밀번호를 입력하여 로그인 합니다.
                                    </span>
                                </> : null}
                            </div>
                        </div>
                        <div className={css(styles.guideContentsContainer)} onClick={() => { if(!(step === 2 && fadeIn)){setFadeIn(false); setStep(2);} }}>
                            <div className={css(step === 2 ? styles.activateContainer : styles.numberingContainer)} />
                            <div className={css(styles.guideColumn)}>
                                <span className={css(step === 2 ? styles.activateGuideFont :styles.guideFont)}>2. '학적관리'＞'학기별성적조회및출력' 선택</span>
                                {/* <span className={css(step === 2 ? styles.activateGuideFont :styles.guideFont)}>2. 학기별성적조회및출력 페이지 접속</span> */}
                                {step === 2 && fadeIn ?
                                <>
                                    <span className={css(styles.guideDescription)}>
                                        좌측 메뉴에서 '학적관리' 선택 후 
                                    </span>
                                    <span className={css(styles.guideDescriptionSecond)}>
                                        '학기별성적조회및출력' 을 클릭하여 페이지를 이동합니다.
                                    </span>
                                    {/* <span className={css(styles.guideDescription)}>
                                        로그인 완료 후 <a href="https://info.cku.ac.kr/haksa/undergraduate/sungjuk_hakki_view.jsp" target="_blank" className={css(styles.pointContent)}>링크 <RiExternalLinkLine className={css(styles.link)}/></a> 를 눌러
                                    </span>
                                    <span className={css(styles.guideDescriptionSecond)}>
                                        학기별성적조회및출력 페이지에 접속합니다.
                                    </span> */}
                                </> : null}
                            </div>
                        </div>
                        <div className={css(styles.guideContentsContainer)} onClick={() => { if(!(step === 3 && fadeIn)){setFadeIn(false); setStep(3);} }}>
                            <div className={css(step === 3 ? styles.activateLongContainer : styles.numberingContainer)} />
                            <div className={css(styles.guideColumn)}>
                                <span className={css(step === 3 ? styles.activateGuideFont : styles.guideFont)}>3. 이수년도 및 학기 설정 및 조회</span>
                                {step === 3 && fadeIn ?
                                <>
                                    <span className={css(styles.guideDescription)}>
                                        저장하려는 년도와 학기를 설정하고 검색 버튼을 눌러 검색합니다.
                                    </span>
                                    <span className={css(styles.guideDescriptionThird)}>
                                        단, 계절학기 PDF는 지원되지 않으니
                                    </span>
                                    <span className={css(styles.guideDescriptionSecondPoint)}>
                                        계절학기 검사 희망 시 원클릭 검사를 이용해주세요.
                                    </span>
                                </> : null}
                            </div>
                        </div>
                        <div className={css(styles.guideContentsContainer)} onClick={() => { if(!(step === 4 && fadeIn)){setFadeIn(false); setStep(4);} }}>
                            <div className={css(step === 4 ? styles.activateLongContainer : styles.numberingContainer)} />
                            <div className={css(styles.guideColumn)}>
                                <span className={css(step === 4 ? styles.activateGuideFont : styles.guideFont)}>4. 인쇄 및 PDF로 저장</span>
                                {step === 4 && fadeIn ?
                                <>
                                    <span className={css(styles.guideDescription)}>
                                        인쇄 버튼 클릭 후 'PDF로 저장'을 선택하여 저장합니다.
                                    </span>
                                    <span className={css(styles.guideDescriptionThird)}>
                                        한컴 PDF, Microsoft Print to PDF 등 다른 옵션은
                                    </span>
                                    <span className={css(styles.guideDescriptionSecondPoint)}>
                                        지원되지 않으니, 반드시 'PDF로 저장'을 확인 후 저장해주세요.
                                    </span>
                                </> : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
            {loading && <LoadingComponents />}
            <div className={css(styles.container)}>
                <div className={css(styles.donelistcontainer)}>
                    <div className={css(styles.titleContainer)}>
                        <span className={css(styles.title)}>기이수과목 등록</span>
                        <span className={css(styles.pcEnvWarn)}>* 원활한 등록을 위해 반드시 PC환경에서 진행해주세요.</span>
                    </div>
                    <hr className={css(styles.custom_hr)} />
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
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        paddingBottom: '100px',
        backgroundColor: '#FFFEFB'
    },
    donelistcontainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
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
        padding: '50px 0 5px 0',
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
    uploadGuideContainer: {
        padding: '50px 0 50px 0',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        gap: '50px',
        backgroundColor: '#FFFEFB'
    },
    mockupContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '30px 0 30px 0'
    },
    mockupDevice: {
        width: '500px',
    },
    showGuideProcess: {
        position: 'absolute',
        width: '385px',
        height: '260px',
        borderRadius: '2px',
        paddingBottom: '5px',
        resizing: ''
    },
    guideContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        minHeight: '284px',
        width: '450px',
        whiteSpace: 'nowrap'
    },
    guideTitleContainer: {
        display: 'flex',
        flexDirection: 'column',
        whiteSpace: 'nowrap',
        gap: '5px'
    },
    guideTitle: {
        fontFamily: 'Lato',
        fontSize: '25px',
        fontWeight: '700'
    },
    guideSubTitle: {
        fontSize: '15px',
        color: '#7A828A'
    },
    guideContentsLayout: {
        display: 'flex',
        flexDirection: 'column',
        gap: '25px'
    },
    guideContentsContainer: {
        display: 'flex',
        backgroundColor: '#FFFEFB',
        gap: '20px'
    },
    activateContainer: {
        display: 'flex',
        backgroundColor: '#3D5286',
        borderRadius: '10px',
        width: '3px',
        height: '80px',
        transition: 'all 0.3s ease-out'
    },
    activateLongContainer: {
        display: 'flex',
        backgroundColor: '#3D5286',
        borderRadius: '10px',
        width: '3px',
        height: '110px',
        transition: 'all 0.3s ease-out'
    },
    numberingContainer: {
        display: 'flex',
        backgroundColor: '#E4E8F0',
        borderRadius: '10px',
        width: '3px',
        height: '20px',
        transition: 'all 0.3s ease-out'
    },
    guideColumn: {
        display: 'flex',
        flexDirection: 'column'
    },
    activateGuideFont: {
        color: '#3D5286',
        fontFamily: 'Lato',
        fontSize: '19px',
        fontWeight: '700',
        whiteSpace: 'nowrap'
    },
    guideFont: {
        fontFamily: 'Lato',
        fontSize: '19px',
        fontWeight: '700',
        whiteSpace: 'nowrap'
    },
    guideDescription: {
        fontFamily: 'Lato',
        fontSize: '15px',
        paddingTop: '10px'
    },
    pointContent: {
        fontFamily: 'Lato',
        fontSize: '15px',
        textDecorationColor: 'none',
        color: '#3D5286'  // # 7A828A
    },
    link: {
        fontSize: '16px',
        marginBottom: '-1.5px'
    },
    guideDescriptionThird: {
        fontFamily: 'Lato',
        fontSize: '15px',
        paddingTop: '5px',
        color: '#7A828A'

    },
    guideDescriptionSecond: {
        fontFamily: 'Lato',
        fontSize: '15px'
    },
    guideDescriptionSecondPoint: {
        fontFamily: 'Lato',
        fontSize: '15px',
        color: '#7A828A'
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
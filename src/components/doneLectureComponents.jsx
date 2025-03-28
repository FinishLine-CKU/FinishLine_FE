import { useState, useContext } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";
import { ModalContext } from '../utils/hooks/modalContext';

//과목찾기 테이블 디자인 및 추가하기 버튼 컴포넌트
export function SubSearchComponents({ subjects, onAdd }) {
    const [filteredSubjects, setFilteredSubjects] = useState(subjects);
    const { addSubject, setAddSubject } = useContext(ModalContext);

    return (
        <div className={css(styles.resizeContainer)}>
            <table className={css(styles.addResizeTableContainer)}>
                <thead>
                    <tr>
                        <th className={css(styles.resizeHeaderCell)}>이수년도</th>
                        <th className={css(styles.resizeHeaderCell)}>학기</th>
                        <th className={css(styles.resizeHeaderCell)}>과목코드</th>
                        <th className={css(styles.resizeHeaderCell)}>교과목명</th>
                        <th className={css(styles.resizeHeaderCell)}>이수구분</th>
                        <th className={css(styles.resizeHeaderCell)}>주제</th>
                        <th className={css(styles.resizeHeaderCell)}>학점</th>
                        <th className={css(styles.resizeHeaderCell)}></th>
                    </tr>
                </thead>
                <tbody>
                    {subjects && subjects.length > 0 &&
                        subjects.map((subject, index) => (
                            <tr key={subject.lecture_code}>
                                <td className={css(styles.yearCell)}>{subject.year}</td>
                                <td className={css(styles.yearCell)}>{subject.semester}</td>
                                <td className={css(styles.yearCell)}>{subject.lecture_code}</td>
                                <td className={css(styles.subjectCell)} title={subject.lecture_name}>{subject.lecture_name}</td>
                                <td className={css(styles.yearCell)}>{subject.lecture_type}</td>
                                <td className={css(styles.yearCell)} title={subject.lecture_topic}>{subject.lecture_topic}</td>
                                <td className={css(styles.yearCell)}>{subject.credit}</td>
                                <td className={css(styles.lastCell)}>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className={css(styles.addContainer)}>
                <button className={css(styles.itemAddButton)} onClick={() => {onAdd(filteredSubjects); setAddSubject(addSubject + 1)}}>
                    추가하기
                </button>
            </div>
        </div>
    );
}

//내 기이수 과목 테이블 디자인 컴포넌트
export function DoneSubComponents({ subjects, onDelete, tableType = 'default' }) {
    const [Expanded, setExpanded] = useState(false);
    const { addSubject, setAddSubject } = useContext(ModalContext);

    //더보기 버튼을 위한 상태 저장
    const toggleExpansion = () => {
        setExpanded(!Expanded);
    };

    // 정렬된 과목들을 학기별로 그룹화
    const sortedSubjects = subjects ? [
        ...subjects.filter(subject => subject.subjectNew),
        ...subjects.filter(subject => !subject.subjectNew)
    ] : [];

    // 첫 번째 과목의 학기를 기준으로 같은 학기의 과목 수를 계산
    const firstSemesterCount = sortedSubjects.length > 0 ? 
        sortedSubjects.filter(subject => 
            subject.year === sortedSubjects[0].year && 
            subject.semester === sortedSubjects[0].semester
        ).length + 5 : 0;
    
    const lastSemesterCount = sortedSubjects.length > 0 ? 
        sortedSubjects.filter(subject => 
            subject.year === sortedSubjects[addSubject].year && 
            subject.semester === sortedSubjects[addSubject].semester
        ).length + 5 : 0;

    return (
        <div className={css(tableType === 'resize' ? styles.resizeContainer : styles.resizeContainer)}>
            {tableType === 'resize' && !Expanded ?
                <div className={css(styles.fadingEffect)}></div>
                : null}
            <table className={css(tableType === 'resize' ? Expanded ? styles.resizeTableExpend : styles.resizeTableContainer : styles.resizeTableContainer)}>
                <thead>
                    <tr>
                        <th className={css(tableType === 'resize' ? styles.resizeHeaderCell : styles.resizeHeaderCell)}>이수년도</th>
                        <th className={css(tableType === 'resize' ? styles.resizeHeaderCell : styles.resizeHeaderCell)}>학기</th>
                        <th className={css(tableType === 'resize' ? styles.resizeHeaderCell : styles.resizeHeaderCell)}>과목코드</th>
                        <th className={css(tableType === 'resize' ? styles.resizeHeaderCell : styles.resizeHeaderCell)}>교과목명</th>
                        <th className={css(tableType === 'resize' ? styles.resizeHeaderCell : styles.resizeHeaderCell)}>이수구분</th>
                        <th className={css(tableType === 'resize' ? styles.resizeHeaderCell : styles.resizeHeaderCell)}>주제</th>
                        <th className={css(tableType === 'resize' ? styles.resizeHeaderCell : styles.resizeHeaderCell)}>학점</th>
                        {tableType === 'resize' ? null
                            : <th className={css(styles.resizeHeaderCell)}></th>}
                    </tr>
                </thead>
                <tbody>
                    {/* 과목 목록이 1개 이상이라면, 5개만 보여준다 */}
                    {sortedSubjects && sortedSubjects.length > 0 &&
                        sortedSubjects.slice(0, addSubject === 0 ? firstSemesterCount : lastSemesterCount).map((subject) => (
                            <tr key={subject.lecture_code} className={css(subject.semester === '1' ? styles.rowColor1 : styles.rowColor2)}>
                                <td className={css(styles.yearCell, (subject.subjectNew || subject.can_delete) ? styles.resizeAddYearCell : tableType === 'resize' ? styles.resizeYearCell : styles.resizeYearCell)}>
                                    {subject.year}
                                </td>
                                <td className={css(styles.yearCell, (subject.subjectNew || subject.can_delete) ? styles.resizeAddYearCell : tableType === 'resize' ? styles.resizeYearCell : styles.resizeYearCell)}>
                                    {subject.semester}
                                </td>
                                <td className={css(styles.yearCell, (subject.subjectNew || subject.can_delete) ? styles.resizeAddYearCell : tableType === 'resize' ? styles.resizeYearCell : styles.resizeYearCell)}>
                                    {subject.lecture_code}
                                </td>
                                <td className={css(styles.subjectCell, (subject.subjectNew || subject.can_delete) ? styles.resizeSubjectAddCell : tableType === 'resize' ? styles.resizeSubjectCell : styles.subjectCell)} title={subject.lecture_name}>
                                    {subject.lecture_name}
                                </td>
                                <td className={css(styles.yearCell, (subject.subjectNew || subject.can_delete) ? styles.resizeAddYearCell : tableType === 'resize' ? styles.resizeYearCell : styles.resizeYearCell)}>
                                    {subject.lecture_type}
                                </td>
                                <td className={css(styles.topicAddCell, (subject.subjectNew || subject.can_delete) ? styles.resizeAddYearCell : tableType === 'resize' ? styles.topicAddCell : styles.topicAddCell)} title={subject.lecture_topic}>
                                    {subject.lecture_topic}
                                </td>
                                <td className={css(styles.yearCell, (subject.subjectNew || subject.can_delete) ? styles.resizeAddYearCell : tableType === 'resize' ? styles.resizeYearCell : styles.resizeYearCell)}>
                                    {subject.credit}
                                </td>
                                {tableType === 'resize' ? null :
                                    <td className={css(styles.lastCell)}>
                                        {(subject.subjectNew || subject.can_delete) && <button className={css(styles.itemDeleteButton)} onClick={() => onDelete(subject.lecture_code)}>제거</button>}
                                    </td>
                                }
                            </tr>
                        ))
                    }
                    {Expanded && sortedSubjects.slice(firstSemesterCount).map((subject, index) => ( 
                        <tr key={index + firstSemesterCount} 
                            className={css(subject.semester === '1' ? styles.rowColor1 : styles.rowColor2)}>
                            <td className={css(tableType === 'resize' ? styles.resizeYearCell : styles.yearCell)}>{subject.year}</td>
                            <td className={css(tableType === 'resize' ? styles.resizeYearCell : styles.yearCell)}>{subject.semester}</td>
                            <td className={css(tableType === 'resize' ? styles.resizeYearCell : styles.yearCell)}>{subject.lecture_code}</td>
                            <td className={css(tableType === 'resize' ? styles.resizeSubjectCell : styles.subjectCell)} title={subject.lecture_name}>{subject.lecture_name}</td>
                            <td className={css(tableType === 'resize' ? styles.resizeYearCell : styles.yearCell)}>{subject.lecture_type}</td>
                            <td className={css(tableType === 'resize' ? styles.topicAddCellToo : styles.topicAddCellToo)} title={subject.lecture_topic}>{subject.lecture_topic}</td>
                            <td className={css(tableType === 'resize' ? styles.resizeYearCell : styles.yearCell)}>{subject.credit}</td>
                            {tableType === 'resize' ? null :
                                    <td className={css(styles.lastCell)}>
                                        {(subject.subjectNew || subject.can_delete) && <button className={css(styles.itemDeleteButton)} onClick={() => onDelete(subject.lecture_code)}>제거</button>}
                                    </td>
                                }
                        </tr>
                    ))}
                </tbody>
            </table>

            {tableType === 'resize' ?
                <>
                    {sortedSubjects.length > 5 && !Expanded && (
                        <div className={css(styles.resizeExpandTrButton)} onClick={toggleExpansion}>
                            <span className={css(styles.resizeExpandButton)}>더보기</span>
                            <VscTriangleDown className={css(styles.toggleIcon)} />
                        </div>
                    )}

                    {Expanded && (
                        <div className={css(styles.resizeExpandTrButton)} onClick={toggleExpansion}>
                            <VscTriangleUp className={css(styles.toggleIcon)} />
                            <span className={css(styles.resizeExpandButton)}>접기</span>
                        </div>
                    )}
                </>
                :
                <>
                    {sortedSubjects.length > firstSemesterCount && !Expanded && (
                        <div className={css(styles.resizeExpandTrButton)} onClick={toggleExpansion}>
                            <span className={css(styles.resizeExpandButton)}>더보기</span>
                            <VscTriangleDown className={css(styles.toggleIcon)} />
                        </div>
                    )}
                    {Expanded && (
                        <tr>
                            {tableType === 'resize' ?
                                null :
                                <div className={css(styles.resizeExpandTrButton)} onClick={toggleExpansion}>
                                    <VscTriangleUp className={css(styles.toggleIcon)} />
                                    <span className={css(styles.resizeExpandButton)}>접기</span>
                                </div>
                            }
                        </tr>
                    )}
                </>}
        </div>
    );
}

const styles = StyleSheet.create({
    Container: {
        width: '100%',
    },
    addResizeTableContainer: {
        width: '100%',
        border: '1px solid #B9B9B9',
        borderRadius: '4px',
        borderSpacing: '0px',
        borderBottom: '1px solid #B9B9B9',
    },
    resizeTableContainer: {
        border: '1px solid #B9B9B9',
        borderRadius: '4px',
        borderSpacing: '0px',
        borderBottom: '1px solid #B9B9B9',
    },
    resizeTableExpend: {
        border: '1px solid #B9B9B9',
        borderRadius: '4px',
        borderSpacing: '0px',
    },
    addContainer: {
        width: '540px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    resizeHeaderCell: {
        width: 'auto',
        height: '33px',
        padding: '0 1.5px',
        fontFamily: 'Lato',
        fontSize: '10px',
        fontWeight: '700',
        backgroundColor: 'rgba(0, 0, 0, 0.06)',
        borderRight: '1px solid #B9B9B9',
        ':last-child': {
            borderRight: '0px'
        },
        wordWrap: 'break-word',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    rowColor1: {
        backgroundColor: '#F9F9F9',  // 1학기 배경색 F7F2EF
    },
    rowColor2: {
        backgroundColor: '#FFFFFF',  // 2학기 배경색
    },
    yearCell: {
        height: '34px',
        padding: '0 5px',
        fontFamily: 'Lato',
        fontSize: '11px',
        fontWeight: '500',
        textAlign: 'center',
        color: '#7F7E7D',
        borderTop: '1px solid #B9B9B9',
        borderRight: '1px solid #B9B9B9',
        borderBottom: 'none',
        borderLeft: 'none',
        ':last-child': {
            borderRight: '0px'
        },
        wordWrap: 'break-word',
        maxWidth: '180px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    resizeYearCell: {
        height: '34px',
        padding: '0 5px',
        fontFamily: 'Lato',
        fontSize: '11px',
        fontWeight: '500',
        textAlign: 'center',
        color: '#7F7E7D',
        borderTop: '1px solid #B9B9B9',
        borderRight: '1px solid #B9B9B9',
        borderBottom: 'none',
        borderLeft: 'none',
        ':last-child': {
            borderRight: '0px'
        },
        wordWrap: 'break-word',
        maxWidth: '180px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    resizeAddYearCell: {
        height: '34px',
        padding: '0 5px',
        fontFamily: 'Lato',
        fontSize: '11px',
        fontWeight: '500',
        textAlign: 'center',
        color: '#3D5286',
        borderTop: '1px solid #B9B9B9',
        borderRight: '1px solid #B9B9B9',
        borderBottom: 'none',
        borderLeft: 'none',
        ':last-child': {
            borderRight: '0px'
        },
        wordWrap: 'break-word',
        maxWidth: '180px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    subjectCell: {
        height: '34px',
        padding: '0 5px',
        fontFamily: 'Lato',
        fontSize: '11px',
        fontWeight: '500',
        textAlign: 'center',
        color: '#7F7E7D',
        borderTop: '1px solid #B9B9B9',
        borderRight: '1px solid #B9B9B9',
        borderBottom: 'none',
        borderLeft: 'none',
        ':last-child': {
            borderRight: '0px'
        },
        wordWrap: 'break-word',
        maxWidth: '180px',
        minWidth: '180px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    resizeSubjectCell: {
        height: '34px',
        padding: '0 5px',
        fontFamily: 'Lato',
        fontSize: '11px',
        fontWeight: '500',
        textAlign: 'center',
        color: '#7F7E7D',
        borderTop: '1px solid #B9B9B9',
        borderRight: '1px solid #B9B9B9',
        borderBottom: 'none',
        borderLeft: 'none',
        ':last-child': {
            borderRight: '0px'
        },
        wordWrap: 'break-word',
        maxWidth: '180px',
        minWidth: '180px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    resizeSubjectAddCell: {
        height: '34px',
        padding: '0 5px',
        fontFamily: 'Lato',
        fontSize: '11px',
        fontWeight: '500',
        textAlign: 'center',
        color: '#3D5286',
        borderTop: '1px solid #B9B9B9',
        borderRight: '1px solid #B9B9B9',
        borderBottom: 'none',
        borderLeft: 'none',
        ':last-child': {
            borderRight: '0px'
        },
        wordWrap: 'break-word',
        maxWidth: '180px',
        minWidth: '180px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    topicAddCellToo: {
        minWidth: '65px',
        height: '34px',
        padding: '0 5px',
        fontFamily: 'Lato',
        fontSize: '11px',
        fontWeight: '500',
        textAlign: 'center',
        color: '#7F7E7D',
        borderTop: '1px solid #B9B9B9',
        borderRight: '1px solid #B9B9B9',
        borderBottom: 'none',
        borderLeft: 'none',
        ':last-child': {
            borderRight: '0px'
        },
        wordWrap: 'break-word',
        maxWidth: '65px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    topicAddCell: {
        maxWidth: '65px',
        minWidth: '65px',
        height: '34px',
        padding: '0 5px',
        fontFamily: 'Lato',
        fontSize: '11px',
        fontWeight: '500',
        textAlign: 'center',
        color: '#7F7E7D',
        borderTop: '1px solid #B9B9B9',
        borderRight: '1px solid #B9B9B9',
        borderBottom: 'none',
        borderLeft: 'none',
        ':last-child': {
            borderRight: '0px'
        },
        wordWrap: 'break-word',
        maxWidth: '180px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    lastCell: {
        width: '40px',
        minHeight: '35px',
        height: '34px',
        padding: '0 5px',
        fontFamily: 'Lato',
        fontSize: '11px',
        fontWeight: '500',
        textAlign: 'center',
        color: '#7F7E7D',
        borderTop: '1px solid #B9B9B9',
        borderRight: '1px solid #B9B9B9',
        borderBottom: 'none',
        borderLeft: 'none',
        ':last-child': {
            borderRight: '0px'
        },
    },
    itemDeleteButton: {
        border: '1px solid #3D5286',
        borderRadius: '4px',
        backgroundColor: 'transparent',
        color: '#3D5286',
        width: '40px',
        height: '20px',
        fontFamily: 'Lato',
        fontSize: '10px',
        fontWeight: '600',
        cursor: 'pointer'
    },
    itemAddButton: {
        marginTop: '30px',
        marginBottom: '70px',
        width: '70px',
        height: '25px',
        borderRadius: '5px',
        border: '1px solid transparent',
        backgroundColor: '#2B2A28',
        color: '#FFFEFB',
        cursor: 'pointer',
        ':active': {
            backgroundColor: '#595650',
        },
        fontFamily: 'Lato',
        fontSize: '12px',
        fontWeight: '600',
    },
    resizeExpandTrButton: {
        marginTop: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        padding: '10px 0',
        textAlign: 'center',
        backgroundColor: 'transparent',
        ':hover': {
            cursor: 'pointer'
        },
        zIndex: '998'
    },
    resizeExpandButton: {
        width: '100%',
        color: '#2B2A28',
        border: 'none',
        fontFamily: 'Lato',
        fontSize: '12px',
        fontWeight: '500',
        textAlign: 'center',
        backgroundColor: 'transparent',
        ':hover': {
            cursor: 'pointer'
        }
    },
    toggleIcon: {
        width: '15px',
        color: '#7A828A'
    },
    resizeContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
    },
    fadingEffect: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(to bottom, rgba(255, 254, 251, 0), rgba(255, 254, 251, 0.8))',
        pointerEvents: 'none'
    },
});
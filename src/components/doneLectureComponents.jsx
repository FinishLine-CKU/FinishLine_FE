import { StyleSheet, css } from 'aphrodite';
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";
import { useState } from 'react';

export function SubSearchComponents({subjects, onAdd}) {
    const [filteredSubjects, setFilteredSubjects] = useState(subjects);

    return (
        <div className={css(styles.Container)}>
          <table className={css(styles.tableContainer)}>
            <thead>
              <tr>
                <th className={css(styles.headerCell)}>이수년도</th>
                <th className={css(styles.headerCell)}>학기</th>
                <th className={css(styles.headerCell)}>과목코드</th>
                <th className={css(styles.headerCell)}>교과목명</th>
                <th className={css(styles.headerCell)}>이수구분</th>
                <th className={css(styles.headerCell)}>주제</th>
                <th className={css(styles.headerCell)}>학점</th>
                <th className={css(styles.headerCell)}></th>
              </tr>
            </thead>
            <tbody>
              {subjects && subjects.length > 0 && 
                subjects.map((subject, index) => (
                  <tr key={subject.lecture_code}>
                      <td className={css(styles.yearCell)}>{subject.year}</td>
                      <td className={css(styles.semesterCell)}>{subject.semester}</td>
                      <td className={css(styles.codeCell)}>{subject.lecture_code}</td>
                      <td className={css(styles.nameCell)} title={subject.lecture_name}>{subject.lecture_name}</td>
                      <td className={css(styles.typeCell)}>{subject.lecture_type}</td>
                      <td className={css(styles.topicCell)} title={subject.lecture_topic}>{subject.lecture_topic}</td>
                      <td className={css(styles.creditCell)}>{subject.credit}</td>
                      <td className={css(styles.lastCell)}>
                      </td>
                  </tr>
                  ))
              }
            </tbody>
          </table>
          <div className={css(styles.addContainer)}>
              <button className={css(styles.itemAddButton)} onClick={() => onAdd(filteredSubjects)}>
                추가하기
              </button>
          </div>
        </div>
    );
}

export function DoneSubComponents({ subjects, onDelete, tableType = 'default' }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const sortedSubjects = subjects
    ? [
        ...subjects.filter(subject => subject.isNew),
        ...subjects.filter(subject => !subject.isNew)
      ]
    : [];

  return (
    <div className={css(tableType === 'resize' ? styles.resizeContainer : styles.Container)}>
      {tableType === 'resize' && !isExpanded ? 
      <div className={css(styles.fadingEffect)}></div> 
      : null }
      <table className={css(tableType === 'resize' ? isExpanded ? styles.resizeTableExpend : styles.resizeTableContainer : styles.tableContainer)}>
        <thead>
          <tr>
            <th className={css(tableType === 'resize' ? styles.resizeHeaderCell : styles.headerCell)}>이수년도</th>
            <th className={css(tableType === 'resize' ? styles.resizeHeaderCell : styles.headerCell)}>학기</th>
            <th className={css(tableType === 'resize' ? styles.resizeHeaderCell : styles.headerCell)}>과목코드</th>
            <th className={css(tableType === 'resize' ? styles.resizeHeaderCell : styles.headerCell)}>교과목명</th>
            <th className={css(tableType === 'resize' ? styles.resizeHeaderCell : styles.headerCell)}>이수구분</th>
            <th className={css(tableType === 'resize' ? styles.resizeHeaderCell : styles.headerCell)}>주제</th>
            <th className={css(tableType === 'resize' ? styles.resizeHeaderCell : styles.headerCell)}>학점</th>
            {tableType === 'resize' ? null
            : <th className={css(styles.headerCell)}></th> }
          </tr>
        </thead>
        <tbody>
          {sortedSubjects && sortedSubjects.length > 0 &&
            sortedSubjects.slice(0, 5).map((subject) => (
              <tr key={subject.lecture_code}>
                <td className={css(styles.yearCell, subject.isNew ? styles.yearAddCell : tableType === 'resize' ? styles.resizeYearCell : styles.yearCell)}>
                  {subject.year}
                </td>
                <td className={css(styles.semesterCell, subject.isNew ? styles.semesterAddCell : tableType === 'resize' ? styles.resizeYearCell : styles.semesterCell)}>
                  {subject.semester}
                </td>
                <td className={css(styles.codeCell, subject.isNew ? styles.codeAddCell : tableType === 'resize' ? styles.resizeYearCell : styles.codeCell)}>
                  {subject.lecture_code}
                </td>
                <td className={css(styles.nameCell, subject.isNew ? styles.nameAddCell : tableType === 'resize' ? styles.resizeYearCell : styles.nameCell)} title={subject.lecture_name}>
                  {subject.lecture_name}
                </td>
                <td className={css(styles.typeCell, subject.isNew ? styles.typeAddCell : tableType === 'resize' ? styles.resizeYearCell : styles.typeCell)}>
                  {subject.lecture_type}
                </td>
                <td className={css(styles.topicCell, subject.isNew ? styles.topicAddCell : tableType === 'resize' ? styles.resizeYearCell : styles.topicCell)} title={subject.lecture_topic}>
                  {subject.lecture_topic}
                </td>
                <td className={css(styles.creditCell, subject.isNew ? styles.creditAddCell : tableType === 'resize' ? styles.resizeYearCell : styles.creditCell)}>
                  {subject.credit}
                </td>
                {tableType === 'resize' ? null :
                <td className={css(styles.lastCell)}>
                  {subject.isNew && <button className={css(styles.itemDeleteButton)} onClick={() => onDelete(subject.lecture_code)}>삭제</button>}
                </td>
                }
              </tr>
            ))
          }
          {sortedSubjects.length > 5 && !isExpanded && (
            <tr>
              {tableType === 'resize' ?
              null :
              <td colSpan="8" className={css(styles.expandTrButton)}>
                <button className={css(styles.expandButton)} onClick={toggleExpansion}>더보기</button>
              </td>
              }
            </tr>
          )}

          {isExpanded && sortedSubjects.slice(5).map((subject, index) => (
            <tr key={index + 5}>
              <td className={css(tableType === 'resize' ? styles.resizeYearCell : styles.yearCell)}>{subject.year}</td>
              <td className={css(tableType === 'resize' ? styles.resizeYearCell : styles.semesterCell)}>{subject.semester}</td>
              <td className={css(tableType === 'resize' ? styles.resizeYearCell : styles.codeCell)}>{subject.lecture_code}</td>
              <td className={css(tableType === 'resize' ? styles.resizeYearCell : styles.nameCell)} title={subject.lecture_name}>{subject.lecture_name}</td>
              <td className={css(tableType === 'resize' ? styles.resizeYearCell : styles.typeCell)}>{subject.lecture_type}</td>
              <td className={css(tableType === 'resize' ? styles.resizeYearCell : styles.topicCell)} title={subject.lecture_topic}>{subject.lecture_topic}</td>
              <td className={css(tableType === 'resize' ? styles.resizeYearCell : styles.creditCell)}>{subject.credit}</td>
              {tableType === 'resize' ? null :
              <td className={css(styles.lastCell)}></td>
              }
            </tr>
          ))}

          {isExpanded && (
          <tr>
            {tableType === 'resize' ?
              null :
            <td colSpan="8" className={css(styles.expandTrButton)}>
              <button className={css(styles.expandButton)} onClick={toggleExpansion}> 닫기</button>
            </td>
            }
          </tr>
          )}
        </tbody>
      </table>
      {tableType === 'resize' ?
      <>
        {sortedSubjects.length > 5 && !isExpanded && (
          <div className={css(styles.resizeExpandTrButton)} onClick={toggleExpansion}>
            <span className={css(styles.resizeExpandButton)}>더보기</span>
            <VscTriangleDown className={css(styles.toggleIcon)}/>
          </div>
        )}

        {isExpanded && (
          <div className={css(styles.resizeExpandTrButton)} onClick={toggleExpansion}>
            <VscTriangleUp className={css(styles.toggleIcon)}/>
            <span className={css(styles.resizeExpandButton)}>접기</span>
          </div>
        )}
      </> 
      : null
      }
    </div>
  );
}

const styles = StyleSheet.create({
  Container: {
    width: '100%',
  },
  tableContainer: {
    width: '540px',
    borderCollapse: 'collapse',
    borderRadius: '4px',
    overflow: 'hidden',
    tableLayout: 'auto',
  },
  resizeTableContainer: {
    border: '1px solid #B9B9B9',
    borderRadius: '4px',
    borderSpacing: '0px',
    borderBottom: 'none',
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
  headerCell: {
    border: '2px solid #E0E0E0',
    color: '#333333',
    fontFamily: 'Lato',
    fontSize: '10px',
    height: '36px',
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
    fontWeight: '600',
    textAlign: 'center',
    wordWrap: 'break-word',
  },
  resizeHeaderCell: {
    width: 'auto',
    height: '33px',
    padding: '0',
    fontFamily: 'Lato',
    fontSize: '10px',
    fontWeight: '700',
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
        borderRight: '1px solid #B9B9B9',
        ':last-child': {
            borderRight: '0px'
        }
  },
  yearCell: {
    width: '40px',
    height: '35px',
    fontFamily: 'Lato',
    fontSize: '10px',
    fontWeight: '600',
    textAlign: 'center',
    border: '2px solid #E0E0E0',
    color: '#333333',
    backgroundColor: '#FFFEFB',
    whiteSpace: 'nowrap', 
    overflow: 'hidden',
    tableLayout: 'fixed',
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
  },
  semesterCell: {
    width: '20px',
    height: '35px',
    fontFamily: 'Lato',
    fontSize: '10px',
    fontWeight: '600',
    textAlign: 'center',
    border: '2px solid #E0E0E0',
    color: '#333333',
    backgroundColor: '#FFFEFB',
    whiteSpace: 'nowrap', 
    overflow: 'hidden',
    tableLayout: 'fixed',
  },
  codeCell: {
    width: '30px',
    minWidth: '40px',
    height: '35px',
    fontFamily: 'Lato',
    fontSize: '10px',
    fontWeight: '600',
    textAlign: 'center',
    border: '2px solid #E0E0E0',
    color: '#333333',
    backgroundColor: '#FFFEFB',
    whiteSpace: 'nowrap', 
    overflow: 'hidden',
    tableLayout: 'fixed',
  },

  nameCell: {
    width: '180px',
    maxWidth: '180px',
    height: '35px',
    fontFamily: 'Lato',
    fontSize: '10px',
    fontWeight: '600',
    textAlign: 'center',
    border: '2px solid #E0E0E0',
    color: '#333333',
    backgroundColor: '#FFFEFB',
    wordWrap: 'break-word',
    maxWidth: '180px', 
    whiteSpace: 'nowrap', 
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    tableLayout: 'fixed',
  },
  nameAddCell: {
    width: '180px',
    maxWidth: '180px',
    height: '35px',
    fontFamily: 'Lato',
    fontSize: '10px',
    fontWeight: '600',
    textAlign: 'center',
    border: '2px solid #E0E0E0',
    color: '#333333',
    backgroundColor: '#FFFEFB',
    wordWrap: 'break-word',
    maxWidth: '180px', 
    whiteSpace: 'nowrap', 
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    tableLayout: 'fixed',
  },
  typeCell: {
    width: '40px',
    maxWidth: '40px',
    height: '35px',
    fontFamily: 'Lato',
    fontSize: '10px',
    fontWeight: '600',
    textAlign: 'center',
    border: '2px solid #E0E0E0',
    color: '#333333',
    backgroundColor: '#FFFEFB',
    whiteSpace: 'nowrap', 
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    tableLayout: 'fixed',
  },
  topicCell: {
    width: '80px',
    maxWidth: '80px',
    height: '35px',
    fontFamily: 'Lato',
    fontSize: '10px',
    fontWeight: '600',
    textAlign: 'center',
    border: '2px solid #E0E0E0',
    color: '#333333',
    backgroundColor: '#FFFEFB',
    whiteSpace: 'nowrap', 
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    tableLayout: 'fixed',
  },
  topicAddCell: {
    maxWidth: '80px',
    height: '35px',
    fontFamily: 'Lato',
    fontSize: '10px',
    fontWeight: '600',
    textAlign: 'center',
    border: '2px solid #E0E0E0',
    color: '#333333',
    backgroundColor: '#FFFEFB',
    whiteSpace: 'nowrap', 
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    tableLayout: 'fixed',
  },
  creditCell: {
    width: '20px',
    height: '35px',
    fontFamily: 'Lato',
    fontSize: '10px',
    fontWeight: '600',
    textAlign: 'center',
    border: '2px solid #E0E0E0',
    color: '#333333',
    backgroundColor: '#FFFEFB',
    whiteSpace: 'nowrap', 
    overflow: 'hidden',
    tableLayout: 'fixed',
  },
  lastCell: {
    width: '40px',
    border: '2px solid #E0E0E0',
    color: '#333333',
    fontFamily: 'Lato',
    fontSize: '10px',
    fontWeight: '600',
    textAlign: 'center',
    minHeight: '35px',
    backgroundColor: '#FFFEFB',
    tableLayout: 'fixed',
  },
  itemDeleteButton: {
    border: '1px solid black',
    borderRadius: '4px',
    backgroundColor: 'transparent',
    color: 'black',
    width: '40px',
    height: '20px',
    fontFamily: 'Lato',
    fontSize: '10px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  itemSelectButton: {
    border: '1px solid black',
    borderRadius: '4px',
    backgroundColor: 'transparent',
    color: 'black',
    width: '40px',
    height: '20px',
    fontFamily: 'Lato',
    fontSize: '10px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  itemAddButton: {
    marginTop: '30px',
    marginBottom: '70px',
    width: '70px',
    height: '25px',
    borderRadius: '5px',
    border: '1px solid transparent',
    backgroundColor: 'black',
    color: '#FFFEFB',
    cursor: 'pointer',
    ':active': {
      backgroundColor: '#595650',
    },
    fontFamily: 'Lato',
    fontSize: '12px',
    fontWeight: '600',
  },
  expandButton: {
    width: '540px',
    height: '35px',
    fontFamily: 'Lato',
    fontSize: '10px',
    fontWeight: '600',
    cursor: 'pointer',
    border: '1px transparent',
    borderBottomRadius: '4px',
    backgroundColor: 'transparent',
    borderCollapse: 'collapse',
  },
  expandTrButton: {
    width: '540px',
    height: '35px',
    fontFamily: 'Lato',
    fontSize: '10px',
    fontWeight: '600',
    cursor: 'pointer',
    border: '2px solid #E0E0E0',
    borderBottomRadius: '4px',
    backgroundColor: 'transparent',
    borderCollapse: 'collapse',
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
    position: 'relative'
  },
  fadingEffect: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.8))',
    pointerEvents: 'none'
  },
});
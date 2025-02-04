import { StyleSheet, css } from 'aphrodite';
import { useState } from 'react';

export function SubSearchComponents({subjects, onAdd}) {
    const [filteredSubjects, setFilteredSubjects] = useState(subjects);

    const handleSelect = (selectedSubject) => {
      setFilteredSubjects([selectedSubject]);
    };
  

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
                      <td className={css(styles.typeCell)} title={subject.lecture_type}>{subject.lecture_type}</td>
                      <td className={css(styles.topicCell)}>{subject.lecture_topic}</td>
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

export function DoneSubComponents({ subjects, onDelete }) {
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
        {sortedSubjects && sortedSubjects.length > 0 &&
            sortedSubjects.slice(0, 5).map((subject) => (
              <tr key={subject.lecture_code}>
                <td className={css(styles.yearCell, subject.isNew ? styles.yearAddCell : styles.yearCell)}>
                  {subject.year}
                </td>
                <td className={css(styles.semesterCell, subject.isNew ? styles.semesterAddCell : styles.semesterCell)}>
                  {subject.semester}
                </td>
                <td className={css(styles.codeCell, subject.isNew ? styles.codeAddCell : styles.codeCell)}>
                  {subject.lecture_code}
                </td>
                <td className={css(styles.nameCell, subject.isNew ? styles.nameAddCell : styles.nameCell)} title={subject.lecture_name}>
                  {subject.lecture_name}
                </td>
                <td className={css(styles.typeCell, subject.isNew ? styles.typeAddCell : styles.typeCell)} title={subject.lecture_type}>
                  {subject.lecture_type}
                </td>
                <td className={css(styles.topicCell, subject.isNew ? styles.topicAddCell : styles.topicCell)}>
                  {subject.lecture_topic}
                </td>
                <td className={css(styles.creditCell, subject.isNew ? styles.creditAddCell : styles.creditCell)}>
                  {subject.credit}
                </td>
                <td className={css(styles.lastCell)}>
                  {subject.isNew && <button className={css(styles.itemDeleteButton)} onClick={() => onDelete(subject.lecture_code)}>삭제</button>}
                </td>
              </tr>
            ))
        }

          {sortedSubjects.length > 5 && !isExpanded && (
            <tr>
              <td colSpan="8" className={css(styles.expandTrButton)}>
                <button className={css(styles.expandButton)} onClick={toggleExpansion}>더보기</button>
              </td>
            </tr>
          )}

          {isExpanded && sortedSubjects.slice(5).map((subject, index) => (
            <tr key={index + 5}>
              <td className={css(styles.yearCell)}>{subject.year}</td>
              <td className={css(styles.semesterCell)}>{subject.semester}</td>
              <td className={css(styles.codeCell)}>{subject.lecture_code}</td>
              <td className={css(styles.nameCell)} title={subject.lecture_name}>{subject.lecture_name}</td>
              <td className={css(styles.typeCell)} title={subject.lecture_type}>{subject.lecture_type}</td>
              <td className={css(styles.topicCell)}>{subject.lecture_topic}</td>
              <td className={css(styles.creditCell)}>{subject.credit}</td>
              <td className={css(styles.lastCell)}></td>
            </tr>
          ))}

          {isExpanded && (
          <tr>
            <td colSpan="8" className={css(styles.expandTrButton)}>
              <button className={css(styles.expandButton)} onClick={toggleExpansion}> 닫기</button>
            </td>
          </tr>
          )}
        </tbody>
      </table>
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
    fontWeight: '600',
    height: '36px',
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
    fontWeight: '600',
    textAlign: 'center',
    wordWrap: 'break-word',
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
    backgroundColor: '#FFFFFF',
    whiteSpace: 'nowrap', 
    overflow: 'hidden',
    tableLayout: 'fixed',
  },
  yearAddCell: {
    width: '40px',
    height: '35px',
    border: '2px solid #E0E0E0',
    color: '#006696',
    fontFamily: 'Lato',
    fontSize: '10px',
    fontWeight: '600',
    textAlign: 'center',
    height: '35px',
    backgroundColor: '#FFFFFF',
    whiteSpace: 'nowrap', 
    overflow: 'hidden',
    tableLayout: 'fixed',
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
    backgroundColor: '#FFFFFF',
    whiteSpace: 'nowrap', 
    overflow: 'hidden',
    tableLayout: 'fixed',
  },
  semesterAddCell: {
    width: '20px',
    height: '35px',
    border: '2px solid #E0E0E0',
    color: '#006696',
    fontFamily: 'Lato',
    fontSize: '10px',
    fontWeight: '600',
    textAlign: 'center',
    height: '35px',
    backgroundColor: '#FFFFFF',
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
    backgroundColor: '#FFFFFF',
    whiteSpace: 'nowrap', 
    overflow: 'hidden',
    tableLayout: 'fixed',
  },
  codeAddCell: {
    width: '30px',
    height: '40px',
    border: '2px solid #E0E0E0',
    color: '#006696',
    fontFamily: 'Lato',
    fontSize: '10px',
    fontWeight: '600',
    textAlign: 'center',
    height: '35px',
    backgroundColor: '#FFFFFF',
    whiteSpace: 'nowrap', 
    overflow: 'hidden',
    tableLayout: 'fixed',
  },
  nameCell: {
    width: '180px',
    height: '35px',
    fontFamily: 'Lato',
    fontSize: '10px',
    fontWeight: '600',
    textAlign: 'center',
    border: '2px solid #E0E0E0',
    color: '#333333',
    backgroundColor: '#FFFFFF',
    wordWrap: 'break-word',
    maxWidth: '180px', 
    whiteSpace: 'nowrap', 
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    tableLayout: 'fixed',
  },
  nameAddCell: {
    width: '180px',
    height: '35px',
    border: '2px solid #E0E0E0',
    color: '#006696',
    fontFamily: 'Lato',
    fontSize: '10px',
    fontWeight: '600',
    textAlign: 'center',
    backgroundColor: '#FFFFFF',
    whiteSpace: 'nowrap', 
    wordWrap: 'break-word',
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
    backgroundColor: '#FFFFFF',
    whiteSpace: 'nowrap', 
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    tableLayout: 'fixed',
  },
  typeAddCell: {
    width: '40px',
    height: '35px',
    border: '2px solid #E0E0E0',
    color: '#006696',
    fontFamily: 'Lato',
    fontSize: '10px',
    fontWeight: '600',
    textAlign: 'center',
    backgroundColor: '#FFFFFF',
    whiteSpace: 'nowrap', 
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    tableLayout: 'fixed',
  },
  topicCell: {
    width: '80px',
    height: '35px',
    fontFamily: 'Lato',
    fontSize: '10px',
    fontWeight: '600',
    textAlign: 'center',
    border: '2px solid #E0E0E0',
    color: '#333333',
    backgroundColor: '#FFFFFF',
    whiteSpace: 'nowrap', 
    overflow: 'hidden',
    tableLayout: 'fixed',
  },
  topicAddCell: {
    width: '80px',
    height: '35px',
    border: '2px solid #E0E0E0',
    color: '#006696',
    fontFamily: 'Lato',
    fontSize: '10px',
    fontWeight: '600',
    textAlign: 'center',
    backgroundColor: '#FFFFFF',
    whiteSpace: 'nowrap', 
    overflow: 'hidden',
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
    backgroundColor: '#FFFFFF',
    whiteSpace: 'nowrap', 
    overflow: 'hidden',
    tableLayout: 'fixed',
  },
  creditAddCell: {
    width: '20px',
    height: '35px',
    border: '2px solid #E0E0E0',
    color: '#006696',
    fontFamily: 'Lato',
    fontSize: '10px',
    fontWeight: '600',
    textAlign: 'center',
    backgroundColor: '#FFFFFF',
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
    backgroundColor: '#FFFFFF',
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
    color: '#FFFFFF',
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
  }
});
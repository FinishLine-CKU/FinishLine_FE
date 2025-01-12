import { StyleSheet, css } from 'aphrodite';
import { useState } from 'react';

export function SubSearchComponents({subjects, onAdd}) {

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
                  <tr key={subject.sub_code}>
                      <td className={css(styles.cell)}>{subject.year}</td>
                      <td className={css(styles.cell)}>{subject.semester}</td>
                      <td className={css(styles.cell)}>{subject.sub_code}</td>
                      <td className={css(styles.cell)}  title={subject.sub_name && subject.sub_name.length > 16 ? subject.sub_name : undefined}>{subject.sub_name}</td>
                      <td className={css(styles.cell)}>{subject.sub_area}</td>
                      <td className={css(styles.cell)}>{subject.sub_sub}</td>
                      <td className={css(styles.cell)}>{subject.credit}</td>
                      <td className={css(styles.lastCell)}></td>
                  </tr>
                  ))
              }
            </tbody>
          </table>
          <div className={css(styles.addContainer)}>
              <button className={css(styles.itemAddButton)} onClick={() => onAdd(subjects)}>
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
              <tr key={subject.sub_code}>
                <td className={css(styles.cell, subject.isNew ? styles.AddCell : styles.cell)}>
                  {subject.year}
                </td>
                <td className={css(styles.cell, subject.isNew ? styles.AddCell : styles.cell)}>
                  {subject.semester}
                </td>
                <td className={css(styles.cell, subject.isNew ? styles.AddCell : styles.cell)}>
                  {subject.sub_code}
                </td>
                <td className={css(styles.cell, subject.isNew ? styles.AddCell : styles.cell)} title={subject.sub_name && subject.sub_name.length > 16 ? subject.sub_name : undefined}>
                  {subject.sub_name}
                </td>
                <td className={css(styles.cell, subject.isNew ? styles.AddCell : styles.cell)}>
                  {subject.sub_area}
                </td>
                <td className={css(styles.cell, subject.isNew ? styles.AddCell : styles.cell)}>
                  {subject.sub_sub}
                </td>
                <td className={css(styles.cell, subject.isNew ? styles.AddCell : styles.cell)}>
                  {subject.credit}
                </td>
                <td className={css(styles.lastCell)}>
                  {subject.isNew && <button className={css(styles.itemDeleteButton)} onClick={() => onDelete(subject.sub_code)}>삭제</button>}
                </td>
              </tr>
            ))
        }

          {sortedSubjects.length > 5 && !isExpanded && (
            <tr>
              <td colSpan="8" className={css(styles.expandTrButton)}>
                <button className={css(styles.expandButton)} onClick={toggleExpansion}> 더보기</button>
              </td>
            </tr>
          )}

          {isExpanded && sortedSubjects.slice(5).map((subject, index) => (
            <tr key={index + 5}>
              <td className={css(styles.cell)}>{subject.year}</td>
              <td className={css(styles.cell)}>{subject.semester}</td>
              <td className={css(styles.cell)}>{subject.sub_code}</td>
              <td className={css(styles.cell)}>{subject.sub_name}</td>
              <td className={css(styles.cell)}>{subject.sub_area}</td>
              <td className={css(styles.cell)}>{subject.sub_sub}</td>
              <td className={css(styles.cell)}>{subject.credit}</td>
              <td className={css(styles.lastCell)}>
              
              </td>
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
  cell: {
    border: '2px solid #E0E0E0',
    color: '#333333',
    fontFamily: 'Lato',
    fontSize: '10px',
    fontWeight: '600',
    textAlign: 'center',
    height: '35px',
    backgroundColor: '#FFFFFF',
    wordWrap: 'break-word',
    maxWidth: '120px', 
    whiteSpace: 'nowrap', 
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  AddCell: {
    border: '2px solid #E0E0E0',
    color: '#006696',
    fontFamily: 'Lato',
    fontSize: '10px',
    fontWeight: '600',
    textAlign: 'center',
    height: '35px',
    backgroundColor: '#FFFFFF',
  },
  lastCell: {
    border: '2px solid #E0E0E0',
    color: '#333333',
    fontFamily: 'Lato',
    fontSize: '10px',
    fontWeight: '600',
    textAlign: 'center',
    minHeight: '35px',
    backgroundColor: '#FFFFFF',
    minWidth: '20px',
  },
  itemDeleteButton: {
    border: '1px solid black',
    borderRadius: '4px',
    backgroundColor: 'transparent',
    color: 'black',
    width: '40px',
    height: '18px',
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

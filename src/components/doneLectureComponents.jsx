import { StyleSheet, css } from 'aphrodite';

function doneLectureComponents() {
    const subjects = [
        { year: 2022, semester: '1', sub_code: '1234-12',  sub_name: '프로그래밍 기초', sub_area: '전선', sub_sub: '기초', credit: 3 },
    ];

    const mySubjects = [
      { year: 2022, semester: '1', sub_code: '1234-12',  sub_name: '웹 프로그래밍', sub_area: '전선', sub_sub: '기초', credit: 3 },
      { year: 2024, semester: '1', sub_code: '1234-13',  sub_name: '고급 데이터 분석', sub_area: '전선', sub_sub: '기초', credit: 3 },
      { year: 2026, semester: '1', sub_code: '1234-14',  sub_name: '소프트웨어 설계', sub_area: '전선', sub_sub: '기초', credit: 3 },
  ];

    return (
        <div className={css(styles.Container)}>
          <table className={css(styles.tableContainer)}>
            <thead>
              <tr>
                <th className={css(styles.headerCell)}>이수년도</th>
                <th className={css(styles.headerCell)}>학기</th>
                <th className={css(styles.headerCell)}>교과목명</th>
                <th className={css(styles.headerCell)}>이수구분</th>
                <th className={css(styles.headerCell)}>주제</th>
                <th className={css(styles.headerCell)}>학점</th>
                <th className={css(styles.headerCell)}></th>
              </tr>
            </thead>
          </table>
        </div>
    );
}

const styles = StyleSheet.create({
  Container: {
    width: '100%',
  },
  tableContainer: {
    width: '728px',
    border: '2px solid #A9A9A9',
    backgroundColor: '#D3D3D3',
    borderRadius: '4px',
  },
});

export default doneLectureComponents;

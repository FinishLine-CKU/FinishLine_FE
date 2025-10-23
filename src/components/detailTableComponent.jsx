import { useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Books from '../assets/images/books.png';

export function EssentialGETable({ tableData, success }) {
    const [year, setYear] = useState(localStorage.getItem('idToken').substr(0, 4));

    return (
        <div className={css(styles.container)}>
            <div className={css(styles.titleContainer)}>
                <div className={css(styles.titleLeftContainer)}>
                    <span className={css(styles.mainTitle)}>교양 필수</span>
                    <div className={css(styles.creditContainer)}>
                        <span className={css(success ? styles.successTotalCredit : styles.lackTotalCredit)}>{tableData?.reduce((sum, data) => sum + (data.subject?.reduce((sum, subject) => sum + (subject.credit || 0), 0) || 0), 0) || 0}</span>
                        <span className={css(styles.totalStandard)}>/</span>
                        <span className={css(styles.totalStandard)}>{tableData?.reduce((sum, data) => sum + (data.standard || 0), 0)} 학점</span>
                    </div>
                </div>
                {success ?
                <div className={css(styles.successContainer)}>
                    <span className={css(styles.successText)}>완료</span>
                </div> :
                <div className={css(styles.lackContainer)}>
                    <span className={css(styles.lackText)}>미충족</span>
                </div>}
            </div>    
            <table className={css(styles.tableContainer)}>
                <thead>
                    <tr>
                        <th className={css(styles.tableHeader)}>구분</th>
                        <th className={css(styles.tableHeaderLeftAlign)}>주제 및 교과목</th>
                        <th className={css(styles.tableHeader)}>학점</th>
                    </tr>
                </thead>
                {tableData && tableData.length > 0 && (
                <tbody>
                    <tr>
                        <th rowSpan={year === 2018 ? '4' : '3'} className={css(styles.threeCellsHeader)}>인성</th>
                        <td className={css(styles.tableDataLectures)}>
                            <div className={css(styles.insteadTopicContainer)}>
                                <div className={css(styles.tableDataTopicContainer)}>
                                    <span className={css(styles.tableDataTopic)}>{tableData[0]?.topic}</span>
                                </div>
                                {Array.from(new Set(tableData[0].subject.map(subject => subject.lecture_topic))).map((topic, index) => (
                                <>
                                    {tableData[0].topic !== topic ?
                                    <div className={css(styles.insteadDataTopicContainer)}>
                                        <span className={css(styles.insteadDataTopic)}>{topic}</span>
                                    </div> : null} 
                                </>))}
                            </div>
                            {tableData[0].subject.map((subject, index) => (
                            <div className={css(styles.lectureContainer)}>
                                <div className={css(styles.lectureLeftside)}>
                                    <img src={Books} className={css(styles.lectureIcon)} />
                                    <span className={css(styles.lectureName)}>{subject?.lecture_name}</span>
                                </div>
                                <div className={css(styles.lectureRightside)}>
                                    <span className={css(styles.lectureInfo)}>{subject?.year}-{subject?.semester}</span>
                                    <span className={css(styles.lectureInfo)}>{subject?.lecture_topic}</span>
                                    <span className={css(styles.lectureCredit)}>{subject?.credit}학점</span>
                                </div>
                            </div>))}
                        </td>
                        <td className={css(styles.tableDataStandard)}>{tableData[0]?.standard}학점</td>
                    </tr>
                    <tr>
                        <td className={css(styles.tableDataLectures)}>
                            <div className={css(styles.insteadTopicContainer)}>
                                <div className={css(styles.tableDataTopicContainer)}>
                                    <span className={css(styles.tableDataTopic)}>{tableData[1]?.topic}</span>
                                </div>
                                {Array.from(new Set(tableData[1].subject.map(subject => subject.lecture_topic))).map((topic, index) => (
                                <>
                                    {tableData[1].topic !== topic ?
                                    <div className={css(styles.insteadDataTopicContainer)}>
                                        <span className={css(styles.insteadDataTopic)}>{topic}</span>
                                    </div> : null} 
                                </>))}
                            </div>
                            {tableData[1].subject.map((subject, index) => (
                            <div className={css(styles.lectureContainer)}>
                                <div className={css(styles.lectureLeftside)}>
                                    <img src={Books} className={css(styles.lectureIcon)} />
                                    <span className={css(styles.lectureName)}>{subject?.lecture_name}</span>
                                </div>
                                <div className={css(styles.lectureRightside)}>
                                    <span className={css(styles.lectureInfo)}>{subject?.year}-{subject?.semester}</span>
                                    <span className={css(styles.lectureInfo)}>{subject?.lecture_topic}</span>
                                    <span className={css(styles.lectureCredit)}>{subject?.credit}학점</span>
                                </div>
                            </div>))}
                        </td>
                        <td className={css(styles.tableDataStandard)}>{tableData[1]?.standard}학점</td>
                    </tr>
                    <tr>
                        <td className={css(styles.tableDataLectures)}>
                            <div className={css(styles.insteadTopicContainer)}>
                                <div className={css(styles.tableDataTopicContainer)}>
                                    <span className={css(styles.tableDataTopic)}>{tableData[2]?.topic}</span>
                                </div>
                                {Array.from(new Set(tableData[2].subject.map(subject => subject.lecture_topic))).map((topic, index) => (
                                <>
                                    {tableData[2].topic !== topic ?
                                    <div className={css(styles.insteadDataTopicContainer)}>
                                        <span className={css(styles.insteadDataTopic)}>{topic}</span>
                                    </div> : null} 
                                </>))}
                            </div>
                            {tableData[2].subject.map((subject, index) => (
                            <div className={css(styles.lectureContainer)}>
                                <div className={css(styles.lectureLeftside)}>
                                    <img src={Books} className={css(styles.lectureIcon)} />
                                    <span className={css(styles.lectureName)}>{subject?.lecture_name}</span>
                                </div>
                                <div className={css(styles.lectureRightside)}>
                                    <span className={css(styles.lectureInfo)}>{subject?.year}-{subject?.semester}</span>
                                    <span className={css(styles.lectureInfo)}>{subject?.lecture_topic}</span>
                                    <span className={css(styles.lectureCredit)}>{subject?.credit}학점</span>
                                </div>
                            </div>))}
                        </td>
                        <td className={css(styles.tableDataStandard)}>{tableData[2]?.standard}학점</td>
                    </tr>
                    {year === 2018 &&
                    <tr>
                        <td className={css(styles.tableDataLectures)}>
                            <div className={css(styles.insteadTopicContainer)}>
                                <div className={css(styles.tableDataTopicContainer)}>
                                    <span className={css(styles.tableDataTopic)}>{tableData[3]?.topic}</span>
                                </div>
                                {Array.from(new Set(tableData[3].subject.map(subject => subject.lecture_topic))).map((topic, index) => (
                                <>
                                    {tableData[3].topic !== topic ?
                                    <div className={css(styles.insteadDataTopicContainer)}>
                                        <span className={css(styles.insteadDataTopic)}>{topic}</span>
                                    </div> : null} 
                                </>))}
                            </div>
                            {tableData[3].subject.map((subject, index) => (
                            <div className={css(styles.lectureContainer)}>
                                <div className={css(styles.lectureLeftside)}>
                                    <img src={Books} className={css(styles.lectureIcon)} />
                                    <span className={css(styles.lectureName)}>{subject?.lecture_name}</span>
                                </div>
                                <div className={css(styles.lectureRightside)}>
                                    <span className={css(styles.lectureInfo)}>{subject?.year}-{subject?.semester}</span>
                                    <span className={css(styles.lectureInfo)}>{subject?.lecture_topic}</span>
                                    <span className={css(styles.lectureCredit)}>{subject?.credit}학점</span>
                                </div>
                            </div>))}
                        </td>
                        <td className={css(styles.tableDataStandard)}>{tableData[3]?.standard}학점</td>
                    </tr>}
                    <tr>
                        {year <= 2019 ?
                        <th rowSpan='3' className={css(styles.threeCellsHeader)}>학문<br />기초</th> :
                        <th rowSpan='3' className={css(styles.threeCellsHeader)}>학문<br />도구</th>}
                        <td className={css(styles.tableDataLectures)}>
                            <div className={css(styles.insteadTopicContainer)}>
                                <div className={css(styles.tableDataTopicContainer)}>
                                    <span className={css(styles.tableDataTopic)}>{tableData[tableData.length-4]?.topic}</span>
                                </div>
                                {Array.from(new Set(tableData[tableData.length-4].subject.map(subject => subject.lecture_topic))).map((topic, index) => (
                                <>
                                    {tableData[tableData.length-4].topic !== topic ?
                                    <div className={css(styles.insteadDataTopicContainer)}>
                                        <span className={css(styles.insteadDataTopic)}>{topic}</span>
                                    </div> : null} 
                                </>))}
                            </div>
                            {tableData[tableData.length-4].subject.map((subject, index) => (
                            <div className={css(styles.lectureContainer)}>
                                <div className={css(styles.lectureLeftside)}>
                                    <img src={Books} className={css(styles.lectureIcon)} />
                                    <span className={css(styles.lectureName)}>{subject?.lecture_name}</span>
                                </div>
                                <div className={css(styles.lectureRightside)}>
                                    <span className={css(styles.lectureInfo)}>{subject?.year}-{subject?.semester}</span>
                                    <span className={css(styles.lectureInfo)}>{subject?.lecture_topic}</span>
                                    <span className={css(styles.lectureCredit)}>{subject?.credit}학점</span>
                                </div>
                            </div>))}
                        </td>
                        <td className={css(styles.tableDataStandard)}>{tableData[tableData.length-4]?.standard}학점</td>
                    </tr>
                    <tr>
                        <td className={css(styles.tableDataLectures)}>
                            <div className={css(styles.insteadTopicContainer)}>
                                <div className={css(styles.tableDataTopicContainer)}>
                                    <span className={css(styles.tableDataTopic)}>{tableData[tableData.length-3]?.topic}</span>
                                </div>
                                {Array.from(new Set(tableData[tableData.length-3].subject.map(subject => subject.lecture_topic))).map((topic, index) => (
                                <>
                                    {tableData[tableData.length-3].topic !== topic ?
                                    <div className={css(styles.insteadDataTopicContainer)}>
                                        <span className={css(styles.insteadDataTopic)}>{topic}</span>
                                    </div> : null} 
                                </>))}
                            </div>
                            {tableData[tableData.length-3].subject.map((subject, index) => (
                            <div className={css(styles.lectureContainer)}>
                                <div className={css(styles.lectureLeftside)}>
                                    <img src={Books} className={css(styles.lectureIcon)} />
                                    <span className={css(styles.lectureName)}>{subject?.lecture_name}</span>
                                </div>
                                <div className={css(styles.lectureRightside)}>
                                    <span className={css(styles.lectureInfo)}>{subject?.year}-{subject?.semester}</span>
                                    <span className={css(styles.lectureInfo)}>{subject?.lecture_topic}</span>
                                    <span className={css(styles.lectureCredit)}>{subject?.credit}학점</span>
                                </div>
                            </div>))}
                        </td>
                        <td className={css(styles.tableDataStandard)}>{tableData[tableData.length-3]?.standard}학점</td>
                    </tr>
                    <tr>
                        <td className={css(styles.tableDataLectures)}>
                            <div className={css(styles.insteadTopicContainer)}>
                                <div className={css(styles.tableDataTopicContainer)}>
                                    <span className={css(styles.tableDataTopic)}>{tableData[tableData.length-2]?.topic}</span>
                                </div>
                                {Array.from(new Set(tableData[tableData.length-2].subject.map(subject => subject.lecture_topic))).map((topic, index) => (
                                <>
                                    {tableData[tableData.length-2].topic !== topic ?
                                    <div className={css(styles.insteadDataTopicContainer)}>
                                        <span className={css(styles.insteadDataTopic)}>{topic}</span>
                                    </div> : null} 
                                </>))}
                            </div>
                            {tableData[tableData.length-2].subject.map((subject, index) => (
                            <div className={css(styles.lectureContainer)}>
                                <div className={css(styles.lectureLeftside)}>
                                    <img src={Books} className={css(styles.lectureIcon)} />
                                    <span className={css(styles.lectureName)}>{subject?.lecture_name}</span>
                                </div>
                                <div className={css(styles.lectureRightside)}>
                                    <span className={css(styles.lectureInfo)}>{subject?.year}-{subject?.semester}</span>
                                    <span className={css(styles.lectureInfo)}>{subject?.lecture_topic}</span>
                                    <span className={css(styles.lectureCredit)}>{subject?.credit}학점</span>
                                </div>
                            </div>))}
                        </td>
                        <td className={css(styles.tableDataStandard)}>{tableData[tableData.length-2]?.standard}학점</td>
                    </tr>
                </tbody>)}
            </table>
        </div>

    )
};

export function ChoiceGETable({ tableData, success }) {
    const [year, setYear] = useState(localStorage.getItem('idToken').substr(0, 4));

    return (
        <div className={css(styles.container)}>
            <div className={css(styles.titleContainer)}>
                <div className={css(styles.titleLeftContainer)}>
                    <span className={css(styles.mainTitle)}>교양 선택</span>
                    <div className={css(styles.creditContainer)}>
                        <span className={css(success ? styles.successTotalCredit : styles.lackTotalCredit)}>{tableData?.reduce((sum, data) => sum + (data.subject?.reduce((sum, subject) => sum + (subject.credit || 0), 0) || 0), 0) || 0}</span>
                        <span className={css(styles.totalStandard)}>/</span>
                        <span className={css(styles.totalStandard)}>{tableData?.reduce((sum, data) => sum + (data.standard || 0), 0)} 학점</span>
                    </div>
                </div>
                {success ?
                <div className={css(styles.successContainer)}>
                    <span className={css(styles.successText)}>완료</span>
                </div> :
                <div className={css(styles.lackContainer)}>
                    <span className={css(styles.lackText)}>미충족</span>
                </div>}
            </div>    
            <div className={css(styles.twoTableContainer)}>
                {tableData && tableData.length > 0 && (
                <>
                    <table className={css(styles.tableContainer)}>
                        <thead>
                            <tr>
                                <th className={css(styles.tableHeader)}>구분</th>
                                <th className={css(styles.tableHeaderLeftAlign)}>주제 및 교과목</th>
                                <th className={css(styles.tableHeader)}>학점</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {year <= 2019 ?
                                <th rowSpan='4' className={css(styles.threeCellsHeader)}>인문<br />중점</th> :
                                <th rowSpan='1' className={css(styles.threeCellsHeader)}>계열<br />기초</th>}
                                <td className={css(styles.tableDataLectures)}>
                                    <div className={css(styles.insteadTopicContainer)}>
                                        <div className={css(styles.tableDataTopicContainer)}>
                                            <span className={css(styles.tableDataTopic)}>{tableData[0]?.topic}</span>
                                        </div>
                                        {Array.from(new Set(tableData[0].subject.map(subject => subject.lecture_topic))).map((topic, index) => (
                                        <>
                                            {tableData[0].topic !== topic ?
                                            <div className={css(styles.insteadDataTopicContainer)}>
                                                <span className={css(styles.insteadDataTopic)}>{topic}</span>
                                            </div> : null} 
                                        </>))}
                                    </div>
                                    {tableData[0].subject.map((subject, index) => (
                                    <div className={css(styles.lectureContainer)}>
                                        <div className={css(styles.lectureLeftside)}>
                                            <img src={Books} className={css(styles.lectureIcon)} />
                                            <span className={css(styles.lectureName)}>{subject?.lecture_name}</span>
                                        </div>
                                        <div className={css(styles.lectureRightside)}>
                                            <span className={css(styles.lectureInfo)}>{subject?.year}-{subject?.semester}</span>
                                            <span className={css(styles.lectureInfo)}>{subject?.lecture_topic}</span>
                                            <span className={css(styles.lectureCredit)}>{subject?.credit}학점</span>
                                        </div>
                                    </div>))}
                                </td>
                                <td className={css(styles.tableDataStandard)}>{tableData[0]?.standard}학점</td>
                            </tr>
                            {year <= 2019 &&
                            <>
                                <tr>
                                    <td className={css(styles.tableDataLectures)}>
                                        <div className={css(styles.insteadTopicContainer)}>
                                            <div className={css(styles.tableDataTopicContainer)}>
                                                <span className={css(styles.tableDataTopic)}>{tableData[1]?.topic}</span>
                                            </div>
                                            {Array.from(new Set(tableData[1].subject.map(subject => subject.lecture_topic))).map((topic, index) => (
                                            <>
                                                {tableData[1].topic !== topic ?
                                                <div className={css(styles.insteadDataTopicContainer)}>
                                                    <span className={css(styles.insteadDataTopic)}>{topic}</span>
                                                </div> : null} 
                                            </>))}
                                        </div>
                                        {tableData[1].subject.map((subject, index) => (
                                        <div className={css(styles.lectureContainer)}>
                                            <div className={css(styles.lectureLeftside)}>
                                                <img src={Books} className={css(styles.lectureIcon)} />
                                                <span className={css(styles.lectureName)}>{subject?.lecture_name}</span>
                                            </div>
                                            <div className={css(styles.lectureRightside)}>
                                                <span className={css(styles.lectureInfo)}>{subject?.year}-{subject?.semester}</span>
                                                <span className={css(styles.lectureInfo)}>{subject?.lecture_topic}</span>
                                                <span className={css(styles.lectureCredit)}>{subject?.credit}학점</span>
                                            </div>
                                        </div>))}
                                    </td>
                                    <td className={css(styles.tableDataStandard)}>{tableData[1]?.standard}학점</td>
                                </tr>
                                <tr>
                                    <td className={css(styles.tableDataLectures)}>
                                        <div className={css(styles.insteadTopicContainer)}>
                                            <div className={css(styles.tableDataTopicContainer)}>
                                                <span className={css(styles.tableDataTopic)}>{tableData[2]?.topic}</span>
                                            </div>
                                            {Array.from(new Set(tableData[2].subject.map(subject => subject.lecture_topic))).map((topic, index) => (
                                            <>
                                                {tableData[2].topic !== topic ?
                                                <div className={css(styles.insteadDataTopicContainer)}>
                                                    <span className={css(styles.insteadDataTopic)}>{topic}</span>
                                                </div> : null} 
                                            </>))}
                                        </div>
                                        {tableData[2].subject.map((subject, index) => (
                                        <div className={css(styles.lectureContainer)}>
                                            <div className={css(styles.lectureLeftside)}>
                                                <img src={Books} className={css(styles.lectureIcon)} />
                                                <span className={css(styles.lectureName)}>{subject?.lecture_name}</span>
                                            </div>
                                            <div className={css(styles.lectureRightside)}>
                                                <span className={css(styles.lectureInfo)}>{subject?.year}-{subject?.semester}</span>
                                                <span className={css(styles.lectureInfo)}>{subject?.lecture_topic}</span>
                                                <span className={css(styles.lectureCredit)}>{subject?.credit}학점</span>
                                            </div>
                                        </div>))}
                                    </td>
                                    <td className={css(styles.tableDataStandard)}>{tableData[2]?.standard}학점</td>
                                </tr>
                                <tr>
                                    <td className={css(styles.tableDataLectures)}>
                                        <div className={css(styles.insteadTopicContainer)}>
                                            <div className={css(styles.tableDataTopicContainer)}>
                                                <span className={css(styles.tableDataTopic)}>{tableData[3]?.topic}</span>
                                            </div>
                                            {Array.from(new Set(tableData[3].subject.map(subject => subject.lecture_topic))).map((topic, index) => (
                                            <>
                                                {tableData[3].topic !== topic ?
                                                <div className={css(styles.insteadDataTopicContainer)}>
                                                    <span className={css(styles.insteadDataTopic)}>{topic}</span>
                                                </div> : null} 
                                            </>))}
                                        </div>
                                        {tableData[3].subject.map((subject, index) => (
                                        <div className={css(styles.lectureContainer)}>
                                            <div className={css(styles.lectureLeftside)}>
                                                <img src={Books} className={css(styles.lectureIcon)} />
                                                <span className={css(styles.lectureName)}>{subject?.lecture_name}</span>
                                            </div>
                                            <div className={css(styles.lectureRightside)}>
                                                <span className={css(styles.lectureInfo)}>{subject?.year}-{subject?.semester}</span>
                                                <span className={css(styles.lectureInfo)}>{subject?.lecture_topic}</span>
                                                <span className={css(styles.lectureCredit)}>{subject?.credit}학점</span>
                                            </div>
                                        </div>))}
                                    </td>
                                    <td className={css(styles.tableDataStandard)}>{tableData[3]?.standard}학점</td>
                                </tr>
                            </>}
                            {year <= 2019 ?
                            <tr>
                                <th rowSpan='1' className={css(styles.threeCellsHeader)}>인문<br />중점</th>
                                <td className={css(styles.tableDataLectures)}>
                                    <div className={css(styles.insteadTopicContainer)}>
                                        <div className={css(styles.tableDataTopicContainer)}>
                                            <span className={css(styles.tableDataTopic)}>{tableData[4]?.topic}</span>
                                        </div>
                                        {Array.from(new Set(tableData[4].subject.map(subject => subject.lecture_topic))).map((topic, index) => (
                                        <>
                                            {tableData[4].topic !== topic ?
                                            <div className={css(styles.insteadDataTopicContainer)}>
                                                <span className={css(styles.insteadDataTopic)}>{topic}</span>
                                            </div> : null} 
                                        </>))}
                                    </div>
                                    {tableData[4].subject.map((subject, index) => (
                                    <div className={css(styles.lectureContainer)}>
                                        <div className={css(styles.lectureLeftside)}>
                                            <img src={Books} className={css(styles.lectureIcon)} />
                                            <span className={css(styles.lectureName)}>{subject?.lecture_name}</span>
                                        </div>
                                        <div className={css(styles.lectureRightside)}>
                                            <span className={css(styles.lectureInfo)}>{subject?.year}-{subject?.semester}</span>
                                            <span className={css(styles.lectureInfo)}>{subject?.lecture_topic}</span>
                                            <span className={css(styles.lectureCredit)}>{subject?.credit}학점</span>
                                        </div>
                                    </div>))}
                                </td>
                                <td className={css(styles.tableDataStandard)}>{tableData[4]?.standard}학점</td>
                            </tr> :
                            <tr>
                                <th rowSpan='4' className={css(styles.threeCellsHeader)}>학문<br />도구</th>
                                <td className={css(styles.tableDataLectures)}>
                                    <div className={css(styles.insteadTopicContainer)}>
                                        <div className={css(styles.tableDataTopicContainer)}>
                                            <span className={css(styles.tableDataTopic)}>{tableData[1]?.topic}</span>
                                        </div>
                                        {Array.from(new Set(tableData[1].subject.map(subject => subject.lecture_topic))).map((topic, index) => (
                                        <>
                                            {tableData[1].topic !== topic ?
                                            <div className={css(styles.insteadDataTopicContainer)}>
                                                <span className={css(styles.insteadDataTopic)}>{topic}</span>
                                            </div> : null} 
                                        </>))}
                                    </div>
                                    {tableData[1].subject.map((subject, index) => (
                                    <div className={css(styles.lectureContainer)}>
                                        <div className={css(styles.lectureLeftside)}>
                                            <img src={Books} className={css(styles.lectureIcon)} />
                                            <span className={css(styles.lectureName)}>{subject?.lecture_name}</span>
                                        </div>
                                        <div className={css(styles.lectureRightside)}>
                                            <span className={css(styles.lectureInfo)}>{subject?.year}-{subject?.semester}</span>
                                            <span className={css(styles.lectureInfo)}>{subject?.lecture_topic}</span>
                                            <span className={css(styles.lectureCredit)}>{subject?.credit}학점</span>
                                        </div>
                                    </div>))}
                                </td>
                                <td className={css(styles.tableDataStandard)}>{tableData[1]?.standard}학점</td>
                            </tr>}
                            {year > 2019 &&
                            <>
                                <tr>
                                    <td className={css(styles.tableDataLectures)}>
                                        <div className={css(styles.insteadTopicContainer)}>
                                            <div className={css(styles.tableDataTopicContainer)}>
                                                <span className={css(styles.tableDataTopic)}>{tableData[2]?.topic}</span>
                                            </div>
                                            {Array.from(new Set(tableData[2].subject.map(subject => subject.lecture_topic))).map((topic, index) => (
                                            <>
                                                {tableData[2].topic !== topic ?
                                                <div className={css(styles.insteadDataTopicContainer)}>
                                                    <span className={css(styles.insteadDataTopic)}>{topic}</span>
                                                </div> : null} 
                                            </>))}
                                        </div>
                                        {tableData[2].subject.map((subject, index) => (
                                        <div className={css(styles.lectureContainer)}>
                                            <div className={css(styles.lectureLeftside)}>
                                                <img src={Books} className={css(styles.lectureIcon)} />
                                                <span className={css(styles.lectureName)}>{subject?.lecture_name}</span>
                                            </div>
                                            <div className={css(styles.lectureRightside)}>
                                                <span className={css(styles.lectureInfo)}>{subject?.year}-{subject?.semester}</span>
                                                <span className={css(styles.lectureInfo)}>{subject?.lecture_topic}</span>
                                                <span className={css(styles.lectureCredit)}>{subject?.credit}학점</span>
                                            </div>
                                        </div>))}
                                    </td>
                                    <td className={css(styles.tableDataStandard)}>{tableData[2]?.standard}학점</td>
                                </tr>
                                <tr>
                                    <td className={css(styles.tableDataLectures)}>
                                        <div className={css(styles.insteadTopicContainer)}>
                                            <div className={css(styles.tableDataTopicContainer)}>
                                                <span className={css(styles.tableDataTopic)}>{tableData[3]?.topic}</span>
                                            </div>
                                            {Array.from(new Set(tableData[3].subject.map(subject => subject.lecture_topic))).map((topic, index) => (
                                            <>
                                                {tableData[3].topic !== topic ?
                                                <div className={css(styles.insteadDataTopicContainer)}>
                                                    <span className={css(styles.insteadDataTopic)}>{topic}</span>
                                                </div> : null} 
                                            </>))}
                                        </div>
                                        {tableData[3].subject.map((subject, index) => (
                                        <div className={css(styles.lectureContainer)}>
                                            <div className={css(styles.lectureLeftside)}>
                                                <img src={Books} className={css(styles.lectureIcon)} />
                                                <span className={css(styles.lectureName)}>{subject?.lecture_name}</span>
                                            </div>
                                            <div className={css(styles.lectureRightside)}>
                                                <span className={css(styles.lectureInfo)}>{subject?.year}-{subject?.semester}</span>
                                                <span className={css(styles.lectureInfo)}>{subject?.lecture_topic}</span>
                                                <span className={css(styles.lectureCredit)}>{subject?.credit}학점</span>
                                            </div>
                                        </div>))}
                                    </td>
                                    <td className={css(styles.tableDataStandard)}>{tableData[3]?.standard}학점</td>
                                </tr>
                                <tr>
                                    <td className={css(styles.tableDataLectures)}>
                                        <div className={css(styles.insteadTopicContainer)}>
                                            <div className={css(styles.tableDataTopicContainer)}>
                                                <span className={css(styles.tableDataTopic)}>{tableData[4]?.topic}</span>
                                            </div>
                                            {Array.from(new Set(tableData[4].subject.map(subject => subject.lecture_topic))).map((topic, index) => (
                                            <>
                                                {tableData[4].topic !== topic ?
                                                <div className={css(styles.insteadDataTopicContainer)}>
                                                    <span className={css(styles.insteadDataTopic)}>{topic}</span>
                                                </div> : null} 
                                            </>))}
                                        </div>
                                        {tableData[4].subject.map((subject, index) => (
                                        <div className={css(styles.lectureContainer)}>
                                            <div className={css(styles.lectureLeftside)}>
                                                <img src={Books} className={css(styles.lectureIcon)} />
                                                <span className={css(styles.lectureName)}>{subject?.lecture_name}</span>
                                            </div>
                                            <div className={css(styles.lectureRightside)}>
                                                <span className={css(styles.lectureInfo)}>{subject?.year}-{subject?.semester}</span>
                                                <span className={css(styles.lectureInfo)}>{subject?.lecture_topic}</span>
                                                <span className={css(styles.lectureCredit)}>{subject?.credit}학점</span>
                                            </div>
                                        </div>))}
                                    </td>
                                    <td className={css(styles.tableDataStandard)}>{tableData[4]?.standard}학점</td>
                                </tr>
                            </>}
                        </tbody>
                    </table>
                    <table className={css(styles.tableContainer)}>
                        <thead>
                            <tr>
                                <th className={css(styles.tableHeader)}>구분</th>
                                <th className={css(styles.tableHeaderLeftAlign)}>주제 및 교과목</th>
                                <th className={css(styles.tableHeader)}>학점</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th rowSpan='4' className={css(styles.threeCellsHeader)}>균형</th>
                                <td className={css(styles.tableDataLectures)}>
                                    <div className={css(styles.insteadTopicContainer)}>
                                        <div className={css(styles.tableDataTopicContainer)}>
                                            <span className={css(styles.tableDataTopic)}>{tableData[5]?.topic}</span>
                                        </div>
                                        {Array.from(new Set(tableData[5].subject.map(subject => subject.lecture_topic))).map((topic, index) => (
                                        <>
                                            {tableData[5].topic !== topic ?
                                            <div className={css(styles.insteadDataTopicContainer)}>
                                                <span className={css(styles.insteadDataTopic)}>{topic}</span>
                                            </div> : null} 
                                        </>))}
                                    </div>
                                    {tableData[5].subject.map((subject, index) => (
                                    <div className={css(styles.lectureContainer)}>
                                        <div className={css(styles.lectureLeftside)}>
                                            <img src={Books} className={css(styles.lectureIcon)} />
                                            <span className={css(styles.lectureName)}>{subject?.lecture_name}</span>
                                        </div>
                                        <div className={css(styles.lectureRightside)}>
                                            <span className={css(styles.lectureInfo)}>{subject?.year}-{subject?.semester}</span>
                                            <span className={css(styles.lectureInfo)}>{subject?.lecture_topic}</span>
                                            <span className={css(styles.lectureCredit)}>{subject?.credit}학점</span>
                                        </div>
                                    </div>))}
                                </td>
                                <td className={css(styles.tableDataStandard)}>{tableData[5]?.standard}학점</td>
                            </tr>
                            <tr>
                                <td className={css(styles.tableDataLectures)}>
                                    <div className={css(styles.insteadTopicContainer)}>
                                        <div className={css(styles.tableDataTopicContainer)}>
                                            <span className={css(styles.tableDataTopic)}>{tableData[6]?.topic}</span>
                                        </div>
                                        {Array.from(new Set(tableData[6].subject.map(subject => subject.lecture_topic))).map((topic, index) => (
                                        <>
                                            {tableData[6].topic !== topic ?
                                            <div className={css(styles.insteadDataTopicContainer)}>
                                                <span className={css(styles.insteadDataTopic)}>{topic}</span>
                                            </div> : null} 
                                        </>))}
                                    </div>    
                                    {tableData[6].subject.map((subject, index) => (
                                    <div className={css(styles.lectureContainer)}>
                                        <div className={css(styles.lectureLeftside)}>
                                            <img src={Books} className={css(styles.lectureIcon)} />
                                            <span className={css(styles.lectureName)}>{subject?.lecture_name}</span>
                                        </div>
                                        <div className={css(styles.lectureRightside)}>
                                            <span className={css(styles.lectureInfo)}>{subject?.year}-{subject?.semester}</span>
                                            <span className={css(styles.lectureInfo)}>{subject?.lecture_topic}</span>
                                            <span className={css(styles.lectureCredit)}>{subject?.credit}학점</span>
                                        </div>
                                    </div>))}
                                </td>
                                <td className={css(styles.tableDataStandard)}>{tableData[6]?.standard}학점</td>
                            </tr>
                            <tr>
                                <td className={css(styles.tableDataLectures)}>
                                    <div className={css(styles.insteadTopicContainer)}>
                                        <div className={css(styles.tableDataTopicContainer)}>
                                            <span className={css(styles.tableDataTopic)}>{tableData[7]?.topic}</span>
                                        </div>
                                        {Array.from(new Set(tableData[7].subject.map(subject => subject.lecture_topic))).map((topic, index) => (
                                        <>
                                            {tableData[7].topic !== topic ?
                                            <div className={css(styles.insteadDataTopicContainer)}>
                                                <span className={css(styles.insteadDataTopic)}>{topic}</span>
                                            </div> : null} 
                                        </>))}
                                    </div>
                                    {tableData[7].subject.map((subject, index) => (
                                    <div className={css(styles.lectureContainer)}>
                                        <div className={css(styles.lectureLeftside)}>
                                            <img src={Books} className={css(styles.lectureIcon)} />
                                            <span className={css(styles.lectureName)}>{subject?.lecture_name}</span>
                                        </div>
                                        <div className={css(styles.lectureRightside)}>
                                            <span className={css(styles.lectureInfo)}>{subject?.year}-{subject?.semester}</span>
                                            <span className={css(styles.lectureInfo)}>{subject?.lecture_topic}</span>
                                            <span className={css(styles.lectureCredit)}>{subject?.credit}학점</span>
                                        </div>
                                    </div>))}
                                </td>
                                <td className={css(styles.tableDataStandard)}>{tableData[7]?.standard}학점</td>
                            </tr>
                            <tr>
                                <td className={css(styles.tableDataLectures)}>
                                    <div className={css(styles.insteadTopicContainer)}>
                                        <div className={css(styles.tableDataTopicContainer)}>
                                            <span className={css(styles.tableDataTopic)}>{tableData[8]?.topic}</span>
                                        </div>
                                        {Array.from(new Set(tableData[8].subject.map(subject => subject.lecture_topic))).map((topic, index) => (
                                        <>
                                            {tableData[8].topic !== topic ?
                                            <div className={css(styles.insteadDataTopicContainer)}>
                                                <span className={css(styles.insteadDataTopic)}>{topic}</span>
                                            </div> : null} 
                                        </>))}
                                    </div>
                                    {tableData[8].subject.map((subject, index) => (
                                    <div className={css(styles.lectureContainer)}>
                                        <div className={css(styles.lectureLeftside)}>
                                            <img src={Books} className={css(styles.lectureIcon)} />
                                            <span className={css(styles.lectureName)}>{subject?.lecture_name}</span>
                                        </div>
                                        <div className={css(styles.lectureRightside)}>
                                            <span className={css(styles.lectureInfo)}>{subject?.year}-{subject?.semester}</span>
                                            <span className={css(styles.lectureInfo)}>{subject?.lecture_topic}</span>
                                            <span className={css(styles.lectureCredit)}>{subject?.credit}학점</span>
                                        </div>
                                    </div>))}
                                </td>
                                <td className={css(styles.tableDataStandard)}>{tableData[8]?.standard}학점</td>
                            </tr>
                        </tbody>
                    </table>
                </>)}
            </div>
        </div>

    )
};

export function HumanismGETable({ tableData }) {
    const [success, setSuccess] = useState(true);
    const [year, setYear] = useState(localStorage.getItem('idToken').substr(0, 4));
    const [trinity, setTrinity] = useState(false);

    return (
        <div className={css(styles.container)}>
            <div className={css(styles.titleContainer)}>
                <div className={css(styles.titleLeftContainer)}>
                    <span className={css(styles.mainTitle)}>교양 인성</span>
                    <div className={css(styles.creditContainer)}>
                        <span className={css(success ? styles.successTotalCredit : styles.lackTotalCredit)}>17</span>
                        <span className={css(styles.totalStandard)}>/</span>
                        <span className={css(styles.totalStandard)}>16 학점</span>
                    </div>
                </div>
                {success ?
                <div className={css(styles.successContainer)}>
                    <span className={css(styles.successText)}>완료</span>
                </div> :
                <div className={css(styles.lackContainer)}>
                    <span className={css(styles.lackText)}>미충족</span>
                </div>}
            </div>    
            <table className={css(styles.tableContainer)}>
                <thead>
                    <tr>
                        <th className={css(styles.tableHeader)}>구분</th>
                        <th className={css(styles.tableHeaderLeftAlign)}>주제 및 교과목</th>
                        <th className={css(styles.tableHeader)}>학점</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th rowSpan={year == 2023 && trinity ? '2' : '3'} className={css(styles.threeCellsHeader)}>공동체</th>
                        <td className={css(styles.tableDataLectures)}>
                            <div className={css(styles.tableDataTopicContainer)}>
                                <span className={css(styles.tableDataTopic)}>인간학</span>
                            </div>
                            <div className={css(styles.lectureContainer)}>
                                <div className={css(styles.lectureLeftside)}>
                                    <img src={Books} className={css(styles.lectureIcon)} />
                                    <span className={css(styles.lectureName)}>인간:지혜와사랑</span>
                                </div>
                                <div className={css(styles.lectureRightside)}>
                                    <span className={css(styles.lectureInfo)}>20-1</span>
                                    <span className={css(styles.lectureInfo)}>인간학</span>
                                    <span className={css(styles.lectureCredit)}>2학점</span>
                                </div>
                            </div>
                            <div className={css(styles.lectureContainer)}>
                                <div className={css(styles.lectureLeftside)}>
                                    <img src={Books} className={css(styles.lectureIcon)} />
                                    <span className={css(styles.lectureName)}>인간:과학기술과신학의만남</span>
                                </div>
                                <div className={css(styles.lectureRightside)}>
                                    <span className={css(styles.lectureInfo)}>20-2</span>
                                    <span className={css(styles.lectureInfo)}>인간학</span>
                                    <span className={css(styles.lectureCredit)}>2학점</span>
                                </div>
                            </div>
                        </td>
                        <td className={css(styles.tableDataStandard)}>4학점</td>
                    </tr>
                    {year == 2023 && trinity ? null :
                    <tr>
                        <td className={css(styles.tableDataLectures)}>
                            <div className={css(styles.tableDataTopicContainer)}>
                                <span className={css(styles.tableDataTopic)}>철학적인간학</span>
                            </div>
                        </td>
                        <td className={css(styles.tableDataStandard)}>2학점</td>
                    </tr>}
                    <tr>
                        <td className={css(styles.tableDataLectures)}>
                            <div className={css(styles.tableDataTopicContainer)}>
                                <span className={css(styles.tableDataTopic)}>봉사활동</span>
                            </div>
                        </td>
                        <td className={css(styles.tableDataStandard)}>2학점</td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
};

export function BasicGETable({ tableData }) {
    const [success, setSuccess] = useState(true);
    const [year, setYear] = useState(localStorage.getItem('idToken').substr(0, 4));
    const [trinity, setTrinity] = useState(true);

    return (
        <div className={css(styles.container)}>
            <div className={css(styles.titleContainer)}>
                <div className={css(styles.titleLeftContainer)}>
                    <span className={css(styles.mainTitle)}>교양 기초</span>
                    <div className={css(styles.creditContainer)}>
                        <span className={css(success ? styles.successTotalCredit : styles.lackTotalCredit)}>17</span>
                        <span className={css(styles.totalStandard)}>/</span>
                        <span className={css(styles.totalStandard)}>16 학점</span>
                    </div>
                </div>
                {success ?
                <div className={css(styles.successContainer)}>
                    <span className={css(styles.successText)}>완료</span>
                </div> :
                <div className={css(styles.lackContainer)}>
                    <span className={css(styles.lackText)}>미충족</span>
                </div>}
            </div>    
            <table className={css(styles.tableContainer)}>
                <thead>
                    <tr>
                        <th className={css(styles.tableHeader)}>구분</th>
                        <th className={css(styles.tableHeaderLeftAlign)}>주제 및 교과목</th>
                        <th className={css(styles.tableHeader)}>학점</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th rowSpan='2' className={css(styles.threeCellsHeader)}>소통</th>
                        <td className={css(styles.tableDataLectures)}>
                            <div className={css(styles.tableDataTopicContainer)}>
                                <span className={css(styles.tableDataTopic)}>인간학</span>
                            </div>
                            <div className={css(styles.lectureContainer)}>
                                <div className={css(styles.lectureLeftside)}>
                                    <img src={Books} className={css(styles.lectureIcon)} />
                                    <span className={css(styles.lectureName)}>인간:지혜와사랑</span>
                                </div>
                                <div className={css(styles.lectureRightside)}>
                                    <span className={css(styles.lectureInfo)}>20-1</span>
                                    <span className={css(styles.lectureInfo)}>인간학</span>
                                    <span className={css(styles.lectureCredit)}>2학점</span>
                                </div>
                            </div>
                            <div className={css(styles.lectureContainer)}>
                                <div className={css(styles.lectureLeftside)}>
                                    <img src={Books} className={css(styles.lectureIcon)} />
                                    <span className={css(styles.lectureName)}>인간:과학기술과신학의만남</span>
                                </div>
                                <div className={css(styles.lectureRightside)}>
                                    <span className={css(styles.lectureInfo)}>20-2</span>
                                    <span className={css(styles.lectureInfo)}>인간학</span>
                                    <span className={css(styles.lectureCredit)}>2학점</span>
                                </div>
                            </div>
                        </td>
                        <td className={css(styles.tableDataStandard)}>4학점</td>
                    </tr>
                    <tr>
                        <td className={css(styles.tableDataLectures)}>
                            <div className={css(styles.tableDataTopicContainer)}>
                                <span className={css(styles.tableDataTopic)}>철학적인간학</span>
                            </div>
                        </td>
                        <td className={css(styles.tableDataStandard)}>2학점</td>
                    </tr>
                    <tr>
                        <th rowSpan={year === 2023 && trinity ? '3': year === 2023 && !trinity ? '2' : '1'} className={css(styles.threeCellsHeader)}>자기<br/>관리</th>
                        <td className={css(year != 2023 ? styles.wideTableDataLectures : styles.tableDataLectures)}>
                            <div className={css(styles.tableDataTopicContainer)}>
                                <span className={css(styles.tableDataTopic)}>인간학</span>
                            </div>
                            <div className={css(styles.lectureContainer)}>
                                <div className={css(styles.lectureLeftside)}>
                                    <img src={Books} className={css(styles.lectureIcon)} />
                                    <span className={css(styles.lectureName)}>인간:지혜와사랑</span>
                                </div>
                                <div className={css(styles.lectureRightside)}>
                                    <span className={css(styles.lectureInfo)}>20-1</span>
                                    <span className={css(styles.lectureInfo)}>인간학</span>
                                    <span className={css(styles.lectureCredit)}>2학점</span>
                                </div>
                            </div>
                            <div className={css(styles.lectureContainer)}>
                                <div className={css(styles.lectureLeftside)}>
                                    <img src={Books} className={css(styles.lectureIcon)} />
                                    <span className={css(styles.lectureName)}>인간:과학기술과신학의만남</span>
                                </div>
                                <div className={css(styles.lectureRightside)}>
                                    <span className={css(styles.lectureInfo)}>20-2</span>
                                    <span className={css(styles.lectureInfo)}>인간학</span>
                                    <span className={css(styles.lectureCredit)}>2학점</span>
                                </div>
                            </div>
                        </td>
                        <td className={css(styles.tableDataStandard)}>4학점</td>
                    </tr>
                    {year === 2023 &&
                    <tr>
                        <td className={css(styles.tableDataLectures)}>
                            <div className={css(styles.tableDataTopicContainer)}>
                                <span className={css(styles.tableDataTopic)}>철학적인간학</span>
                            </div>
                        </td>
                        <td className={css(styles.tableDataStandard)}>2학점</td>
                    </tr>}
                    {year === 2023 && trinity &&
                    <tr>
                        <td className={css(styles.tableDataLectures)}>
                            <div className={css(styles.tableDataTopicContainer)}>
                                <span className={css(styles.tableDataTopic)}>철학적인간학</span>
                            </div>
                        </td>
                        <td className={css(styles.tableDataStandard)}>2학점</td>
                    </tr>}
                </tbody>
            </table>
        </div>

    )
};

export function FusionGETable({ tableData }) {
    const [success, setSuccess] = useState(true);
    const [year, setYear] = useState(localStorage.getItem('idToken').substr(0, 4));
    const [trinity, setTrinity] = useState(false);

    return (
        <div className={css(styles.container)}>
            <div className={css(styles.titleContainer)}>
                <div className={css(styles.titleLeftContainer)}>
                    <span className={css(styles.mainTitle)}>교양 융합</span>
                    <div className={css(styles.creditContainer)}>
                        <span className={css(success ? styles.successTotalCredit : styles.lackTotalCredit)}>17</span>
                        <span className={css(styles.totalStandard)}>/</span>
                        <span className={css(styles.totalStandard)}>16 학점</span>
                    </div>
                </div>
                {success ?
                <div className={css(styles.successContainer)}>
                    <span className={css(styles.successText)}>완료</span>
                </div> :
                <div className={css(styles.lackContainer)}>
                    <span className={css(styles.lackText)}>미충족</span>
                </div>}
            </div>    
            <table className={css(styles.tableContainer)}>
                <thead>
                    <tr>
                        <th className={css(styles.tableHeader)}>구분</th>
                        <th className={css(styles.tableHeaderLeftAlign)}>주제 및 교과목</th>
                        <th className={css(styles.tableHeader)}>학점</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th className={css(styles.threeCellsHeader)}>정보<br/>활용</th>
                        <td className={css(styles.wideTableDataLectures)}>
                            <div className={css(styles.tableDataTopicContainer)}>
                                <span className={css(styles.tableDataTopic)}>인간학</span>
                            </div>
                            <div className={css(styles.lectureContainer)}>
                                <div className={css(styles.lectureLeftside)}>
                                    <img src={Books} className={css(styles.lectureIcon)} />
                                    <span className={css(styles.lectureName)}>인간:지혜와사랑</span>
                                </div>
                                <div className={css(styles.lectureRightside)}>
                                    <span className={css(styles.lectureInfo)}>20-1</span>
                                    <span className={css(styles.lectureInfo)}>인간학</span>
                                    <span className={css(styles.lectureCredit)}>2학점</span>
                                </div>
                            </div>
                            <div className={css(styles.lectureContainer)}>
                                <div className={css(styles.lectureLeftside)}>
                                    <img src={Books} className={css(styles.lectureIcon)} />
                                    <span className={css(styles.lectureName)}>인간:과학기술과신학의만남</span>
                                </div>
                                <div className={css(styles.lectureRightside)}>
                                    <span className={css(styles.lectureInfo)}>20-2</span>
                                    <span className={css(styles.lectureInfo)}>인간학</span>
                                    <span className={css(styles.lectureCredit)}>2학점</span>
                                </div>
                            </div>
                        </td>
                        <td className={css(styles.tableDataStandard)}>4학점</td>
                    </tr>
                    <tr>
                        <th className={css(styles.threeCellsHeader)}>창의<br/>융합</th>
                        <td className={css(styles.wideTableDataLectures)}>
                            <div className={css(styles.tableDataTopicContainer)}>
                                <span className={css(styles.tableDataTopic)}>철학적인간학</span>
                            </div>
                        </td>
                        <td className={css(styles.tableDataStandard)}>2학점</td>
                    </tr>
                    <tr>
                        <th className={css(styles.threeCellsHeader)}>문제<br/>해결</th>
                        <td className={css(styles.wideTableDataLectures)}>
                            <div className={css(styles.tableDataTopicContainer)}>
                                <span className={css(styles.tableDataTopic)}>봉사활동</span>
                            </div>
                        </td>
                        <td className={css(styles.tableDataStandard)}>2학점</td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
};

export function RestTable({ tableData }){
    return (
        <div className={css(styles.container)}>
            <div className={css(styles.titleContainer)}>
                <div className={css(styles.titleLeftContainer)}>
                    <span className={css(styles.mainTitle)}>일반 선택</span>
                    <div className={css(styles.creditContainer)}>
                        <span className={css(styles.totalCredit)}>{tableData?.subject?.reduce((sum, subject) => sum + (subject.credit || 0), 0) || 0}</span>
                        <span className={css(styles.totalStandard)}>/</span>
                        <span className={css(styles.totalStandard)}>{tableData?.standard || 0} 학점</span>
                    </div>
                </div>
            </div>
            <table className={css(styles.tableContainer)}>
                <thead>
                    <tr>
                        <th className={css(styles.restTableHeader)}>구분</th>
                        <th className={css(styles.tableHeaderLeftAlign)}>주제 및 교과목</th>
                        <th className={css(styles.restTableHeader)}>학점</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData && (
                    <tr>
                        <th rowSpan='1' className={css(styles.threeCellsHeader)}></th>
                        <td className={css(styles.restTableDataLectures)}>
                            <div className={css(styles.insteadTopicContainer)}>
                                <div className={css(styles.tableDataTopicContainer)}>
                                    <span className={css(styles.tableDataTopic)}>{tableData.topic}</span>
                                </div>
                                {Array.from(new Set(tableData.subject.map(subject => subject.lecture_topic))).map((topic, index) =>
                                <div className={css(styles.insteadDataTopicContainer)}>
                                    <span className={css(styles.insteadDataTopic)}>{topic}</span>
                                </div>)}
                            </div>
                            <div className={css(styles.restContainer)}>
                                {tableData.subject.map((subject, index) => (
                                <div className={css(styles.restLectureContainer)}>
                                    <div className={css(styles.lectureLeftside)}>
                                        <img src={Books} className={css(styles.lectureIcon)} />
                                        <span className={css(styles.lectureName)}>{subject.lecture_name}</span>
                                    </div>
                                    <div className={css(styles.lectureRightside)}>
                                        <span className={css(styles.lectureInfo)}>{subject.year}-{subject.semester}</span>
                                        <span className={css(styles.lectureInfo)}>{subject.lecture_topic}</span>
                                        <span className={css(styles.lectureCredit)}>{subject.credit}학점</span>
                                    </div>
                                </div>
                                ))}
                            </div>
                        </td>
                        <td className={css(styles.tableDataStandard)}>{tableData?.standard}학점</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    )
};


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },
    titleContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: '18px'
    },
    titleLeftContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px'
    },
    mainTitle: {
        fontFamily: 'Lato',
        fontWeight: 'bold',
        fontSize: '20px',
        color: '#3D5286'
    },
    creditContainer: {
        display: 'flex',
        gap: '5px',
        alignItems: 'flex-end'
    },
    successTotalCredit: {
        fontFamily: 'Lato',
        fontWeight: 'bold',
        fontSize: '15px',
        color: '#86C46D'
    },
    lackTotalCredit: {
        fontFamily: 'Lato',
        fontWeight: 'bold',
        fontSize: '15px',
        color: '#FF4921'
    },
    totalCredit: {
        fontFamily: 'Lato',
        fontWeight: 'bold',
        fontSize: '15px',
        color: '#3D5286'
    },
    totalStandard: {
        fontFamily: 'Lato',
        fontWeight: 'bold',
        fontSize: '12px',
        color: '#7A828A'
    },
    successContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '20px',
        backgroundColor: '#E9FFE1',
        padding: '5px 13px'
    },
    successText: {
        fontFamily: 'Lato',
        fontWeight: 'bold',
        fontSize: '11px',
        color: '#86C46D'
    },
    lackContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '20px',
        backgroundColor: '#FCEDE9',
        padding: '5px 12px'
    },
    lackText: {
        fontFamily: 'Lato',
        fontWeight: 'bold',
        fontSize: '11px',
        color: '#DE3A16'
    },
    twoTableContainer: {
        display: 'flex',
        gap: '10px',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    tableContainer: {
        width: '100%',
        border: '1px solid #B9B9B9',
        borderRadius: '4px',
        borderSpacing: '0px',
        overflow: 'hidden'
    },
    tableHeader: {
        width: 'auto',
        minWith: 'fit-content',
        height: '36px',
        padding: '0 1.5px',
        fontFamily: 'Lato',
        fontSize: '12px',
        fontWeight: '600',
        backgroundColor: '#F8F9FA',
        borderRight: '1px solid #B9B9B9',
        ':last-child': {
            borderRight: '0px'
        },
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    tableHeaderLeftAlign: {
        width: 'auto',
        height: '36px',
        padding: '0 1.5px',
        fontFamily: 'Lato',
        fontSize: '12px',
        fontWeight: '600',
        backgroundColor: '#F8F9FA',
        borderRight: '1px solid #B9B9B9',
        ':last-child': {
            borderRight: '0px'
        },
        wordWrap: 'break-word',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        textAlign: 'left',
        paddingLeft: '12px'
    },
    threeCellsHeader: {
        fontFamily: 'Lato',
        fontSize: '10px',
        fontWeight: '500',
        color: '#81807F',
        backgroundColor: 'rgba(255,255,255,0.02)',
        borderTop: '1px solid #B9B9B9',
        borderRight: '1px solid #B9B9B9',
    },
    restTableHeader: {
        width: '10%',
        height: '36px',
        padding: '0 1.5px',
        fontFamily: 'Lato',
        fontSize: '12px',
        fontWeight: '600',
        backgroundColor: '#F8F9FA',
        borderRight: '1px solid #B9B9B9',
        ':last-child': {
            borderRight: '0px'
        },
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    tableDataLectures: {
        borderTop: '1px solid #B9B9B9',
        borderRight: '1px solid #B9B9B9',
        padding: '5px',
        height: '55px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
    },
    wideTableDataLectures: {
        borderTop: '1px solid #B9B9B9',
        borderRight: '1px solid #B9B9B9',
        padding: '5px',
        height: '77px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
    },
    restTableDataLectures: {
        borderTop: '1px solid #B9B9B9',
        borderRight: '1px solid #B9B9B9',
        padding: '5px',
        height: 'fit-content',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
    },
    insteadTopicContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '2px'
    },
    tableDataTopicContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid #CDD7FB',
        borderRadius: '20px',
        backgroundColor: '#EFF2FE',
        padding: '2px 6px',
        width: 'fit-content'
    },
    insteadDataTopicContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid rgba(202,202,202,0.5)',
        borderRadius: '20px',
        backgroundColor: 'rgba(228,228,228,0.3)',
        padding: '2px 6px',
        width: 'fit-content'
    },
    tableDataTopic: {
        fontFamily: 'Lato',
        fontSize: '8px',
        fontWeight: '700',
        color: '#3D5286',
        whiteSpace: 'nowrap'
    },
    insteadDataTopic: {
        fontFamily: 'Lato',
        fontSize: '8px',
        fontWeight: '700',
        color: 'rgba(122,130,138,0.5)',
        whiteSpace: 'nowrap'
    },
    lectureContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid #E6F2FC',
        borderRadius: '5px',
        backgroundColor: '#F8F9FA',
        padding: '2px 5px'
    },
    restContainer: {
        display: 'flex',
        width: '100%',
        gap: '5px 10px',
        flexWrap: 'wrap'
    },
    restLectureContainer: {
        width: '40%', // 180px
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid #E6F2FC',
        borderRadius: '5px',
        backgroundColor: '#F8F9FA',
        padding: '2px 5px'
    },
    lectureLeftside: {
        display: 'flex',
        gap: '3px',
        width: 'fit-content',
        maxWidth: '50%',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    },
    lectureIcon: {
        width: '7px'
    },
    lectureName: {
        fontFamily: 'Lato',
        fontWeight: 'bold',
        fontSize: '7px',
        color: '#2B2A28',
        textAlign: 'left',
        width: '20px'
    },
    lectureRightside: {
        display: 'flex',
        gap: '5px'
    },
    lectureInfo: {
        fontFamily: 'Lato',
        fontWeight: 'bold',
        fontSize: '7px',
        color: '#7A828A'
    },
    lectureCredit: {
        fontFamily: 'Lato',
        fontWeight: 'bold',
        fontSize: '7px',
        color: '#3D5286'
    },
    tableDataStandard: {
        minWith: 'fit-content',
        textAlign: 'center',
        fontFamily: 'Lato',
        fontSize: '10px',
        fontWeight: '700',
        color: '#3D5286',
        borderTop: '1px solid #B9B9B9',
        borderLeft: 'none',
        borderBottom: 'none',
        borderRight: 'none',
        ':last-child': {
            borderRight: '0px'
        },
        whiteSpace: 'nowrap'
    }

});
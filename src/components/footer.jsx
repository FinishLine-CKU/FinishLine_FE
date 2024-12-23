import { StyleSheet, css } from 'aphrodite';
import { MdLanguage } from 'react-icons/md';
import { RiArrowDropDownLine } from 'react-icons/ri';
import formLink from '../assets/images/formLink.png';

function Footer() {
    return (
        <footer className={css(styles.footerContainer)}>
            <div className={css(styles.footerLeftSection)}>
                <a href="" className={css(styles.surveyLink)} target="_blank" title="FinishLine 설문 링크">
                    <img src={formLink} className={css(styles.formImage)} alt="FinishLine Survey Form"/>
                    <span className={css(styles.formText)}>의 사용 후기를 알려주세요!</span>
                </a>
                <span className={css(styles.serviceText)}>더 나은 서비스로 보답하겠습니다.</span>
                <div className={css(styles.contactIndex)}>CONTACT</div>
                <a href="" target="_blank" className={css(styles.contactMail)} title="메일">finishline@cku.ac.kr</a>
                <a href="https://github.com/FinishLine-CKU" target="_blank" className={css(styles.contactGithub)} title="깃허브">https://github.com/FinishLine-CKU</a>
            </div>
            <div className={css(styles.footerRightSection)}>
                <div className={css(styles.buttonMenu)}>
                    <button className={css(styles.languageOption)}>
                        <MdLanguage />한국어<RiArrowDropDownLine className={css(styles.dropdownIcon)}/>
                    </button>
                    <button className={css(styles.footerNavigation)}>
                        사이트맵<RiArrowDropDownLine className={css(styles.dropdownIcon)}/>
                    </button>
                </div>
                <div className={css(styles.siteInfo)}>
                    <a href="" target="_blank" className={css(styles.privercyInfo)} title="개인정보처리방침">개인정보처리방침</a>
                    <a href="" target="_blank" className={css(styles.ruleInfo)} title="이용약관">이용약관</a>
                </div>
                <span className={css(styles.rightInfo)}>© 2024 CKU Software Engineering student All rights reserved.</span>
            </div>
        </footer>
    );
}

const styles = StyleSheet.create({
    footerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        height: '110px',
        marginTop: 'auto',
        padding : '30px',
        backgroundColor: '#2B2A28',
        color: '#FFFEFB',
    },
    footerLeftSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '210px',
        backgroundColor: '#2B2A28',
    },
    surveyLink: {
        textDecorationLine: 'none',
    },
    formImage: {
        width: '93px',
    },
    formText: {
        marginLeft: '3px',
        fontSize: '10px',
        color: '#FFFEFB',
    },
    serviceText: {
        marginTop: '7px',
        fontSize: '10px',
        color: '#FFFEFB',
    },
    contactIndex: {
        display: 'inline-block',
        margin: '25px 0 10px',
        padding: '2px 7px',
        borderRadius: '10px',
        fontSize: '7px',
        fontWeight: '900',
        backgroundColor: '#FFFEFB',
        color: '#2B2A28',
    },
    contactMail: {
        marginBottom: '3px',
        fontSize: '10px',
        color: '#FFFEFB',
        textDecorationLine: 'none',
    },
    contactGithub: {
        fontSize: '10px',
        color: '#FFFEFB',
        textDecorationLine: 'none',
    },
    footerRightSection: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        width: '310px',
        backgroundColor: '#2B2A28',
    },
    buttonMenu: {
        display: 'flex',
        marginBottom: '14px',
        gap: '11px',
    },
    languageOption: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '3.5px 10px',
        gap: '3px',
        border: '1px solid #FFFEFB',
        borderRadius: '15px',
        fontSize: '10px',
        backgroundColor: 'transparent',
        color: '#FFFEFB',
    },
    dropdownIcon: {
        marginRight: '-4px',
    },
    footerNavigation: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '3.5px 10px',
        gap : '3px',
        border: '1px solid #FFFEFB',
        borderRadius: '15px',
        fontSize: '10px',
        backgroundColor: 'transparent',
        color: '#FFFEFB',
    },
    siteInfo: {
        display: 'flex',
        marginBottom: '7px',
        gap: '20px',
    },
    privercyInfo: {
        fontSize: '10px',
        color: '#FFFEFB',
        textDecorationLine: 'none',
    },
    ruleInfo: {
        fontSize: '10px',
        color: '#FFFEFB',
        textDecorationLine: 'none',
    },
    rightInfo: {
        fontSize: '10px',
    }
});
export default Footer;
import { useState, useRef, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { MdLanguage } from 'react-icons/md';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import formLink from '../assets/images/formLink.png';
import blackFinishlineLogo from '../assets/images/blackFinishlineLogo.png';

function Footer({ footerType = 'default' }) {
    const languageButtonRef = useRef();
    const sitemapButtonRef = useRef();
    const [languageDropdown, setLanguageDropdown] = useState(false);
    const [sitemapDropdown, setSitemapDropdown] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('한국어');

    useEffect(() => {
        const clickOthers = (event) => {
            if (languageButtonRef.current && !languageButtonRef.current.contains(event.target)) {
                setLanguageDropdown(false);
            }
            if (sitemapButtonRef.current && !sitemapButtonRef.current.contains(event.target)) {
                setSitemapDropdown(false);
            }
        };
        document.addEventListener('mousedown', clickOthers);
        return () => {
            document.removeEventListener('mousedown', clickOthers);
        };
    }, []);

    return (
        <footer className={css(footerType === 'transparent' ? styles.transparentFooter : footerType === 'manage' ? styles.manageFooter : styles.footerContainer)}>
            <div className={css(footerType === 'transparent' ? styles.transparentLeftSection : footerType === 'manage' ? styles.manageLeftSection : styles.footerLeftSection)}>
                <a href="" className={css(styles.surveyLink)} target="_blank" title="FinishLine 설문 링크">
                    <img src={footerType === 'manage' ? blackFinishlineLogo : formLink} className={css(styles.formImage)} alt="FinishLine Survey Form"/>
                    <span className={css(footerType === 'manage' ? styles.manageFormText : styles.formText)}>의 사용 후기를 알려주세요!</span>
                </a>
                <span className={css(footerType === 'manage' ? styles.manageServiceText : styles.serviceText)}>더 나은 서비스로 보답하겠습니다.</span>
                <div className={css(footerType === 'manage' ? styles.manageContactIndex : styles.contactIndex)}>CONTACT</div>
                <a href="" target="_blank" className={css(footerType === 'manage' ? styles.manageContactMail : styles.contactMail)} title="메일">finishline@cku.ac.kr</a>
                <a href="https://github.com/FinishLine-CKU" target="_blank" className={css(footerType === 'manage' ? styles.manageContactGithub : styles.contactGithub)} title="깃허브">https://github.com/FinishLine-CKU</a>
            </div>
            <div className={css(footerType === 'transparent' ? styles.transparentRightSection : footerType === 'manage' ? styles.manageRightSection : styles.footerRightSection)}>
                <div className={css(styles.menuButtons)}>
                    <div className={css(styles.languageButtonContainer)} ref={languageButtonRef}>
                        <button className={css(footerType === 'manage' ? styles.manageLanguageButton : styles.languageButton)} onClick={() => {setLanguageDropdown(!languageDropdown); setSitemapDropdown(false);}}>
                            <MdLanguage />{selectedLanguage} { languageDropdown ? <RiArrowDropUpLine className={css(styles.dropdownIcon)}/> : <RiArrowDropDownLine className={css(styles.dropdownIcon)}/> }
                        </button>
                        { languageDropdown ? 
                            <ul className={css(footerType === 'manage' ? styles.manageDropdownOptions : styles.dropdownOptions)}>
                                <li className={css(footerType === 'manage' ? styles.manageOptions : styles.options)} onClick={() => {setSelectedLanguage('한국어'); setLanguageDropdown(false);}}><a>한국어</a></li>
                                <li className={css(footerType === 'manage' ? styles.manageOptions : styles.options)} onClick={() => {setSelectedLanguage('English'); setLanguageDropdown(false);}}><a>English</a></li>
                                <li className={css(footerType === 'manage' ? styles.manageOptions : styles.options)} onClick={() => {setSelectedLanguage('Tiếng Việt'); setLanguageDropdown(false);}}><a>Tiếng Việt</a></li>
                            </ul> : null
                        }
                    </div>
                    <div className={css(styles.languageButtonContainer)} ref={sitemapButtonRef}>
                        <button className={css(footerType === 'manage' ? styles.manageFooterNavigation : styles.footerNavigation)} onClick={()=>{setSitemapDropdown(!sitemapDropdown); setLanguageDropdown(false);}}>
                            사이트맵 { sitemapDropdown ? <RiArrowDropUpLine className={css(styles.dropdownIcon)}/> : <RiArrowDropDownLine className={css(styles.dropdownIcon)}/> }
                        </button>
                        { sitemapDropdown ?
                            <ul className={css(footerType === 'manage' ? styles.manageDropdownOptions : styles.dropdownOptions)}>
                                <a href="/userGuidePage" className={css(styles.links)}><li className={css(footerType === 'manage' ? styles.manageOptions : styles.options)}>이용가이드</li></a>
                                <a href="" className={css(styles.links)}><li className={css(footerType === 'manage' ? styles.manageOptions : styles.options)}>졸업요건검사</li></a>
                                <a href="" className={css(styles.links)}><li className={css(footerType === 'manage' ? styles.manageOptions : styles.options)}>기이수과목관리</li></a>
                                <a href="/myPage" className={css(styles.links)}><li className={css(footerType === 'manage' ? styles.manageOptions : styles.options)}>마이페이지</li></a>
                            </ul> : null
                        }
                    </div>
                </div>
                <div className={css(styles.siteInfo)}>
                    <a href="" target="_blank" className={css(footerType === 'manage' ? styles.managePrivercyInfo : styles.privercyInfo)} title="개인정보처리방침">개인정보처리방침</a>
                    <a href="" target="_blank" className={css(footerType === 'manage' ? styles.manageRuleInfo : styles.ruleInfo)} title="이용약관">이용약관</a>
                </div>
                <span className={css(footerType === 'manage' ? styles.manageRightInfo : styles.rightInfo)}>© 2024 CKU Software Engineering student All rights reserved.</span>
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
        fontFamily: 'Lato',
    },
    transparentFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        height: '110px',
        marginTop: 'auto',
        padding: '30px',
        fontFamily: 'Lato',
    },
    manageFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        height: '110px',
        marginTop: 'auto',
        padding : '30px',
        backgroundColor: '#FFFEFB',
        color: '#2B2A28',
        fontFamily: 'Lato',
    },
    footerLeftSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '250px',
        backgroundColor: '#2B2A28',
    },
    transparentLeftSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '250px',
    },
    manageLeftSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '250px',
        backgroundColor: '#FFFEFB',
    },
    surveyLink: {
        textDecorationLine: 'none',
    },
    formImage: {
        width: '93px',
    },
    formText: {
        marginLeft: '3px',
        fontSize: '11px',
        color: '#FFFEFB',
    },
    manageFormText: {
        marginLeft: '3px',
        fontSize: '11px',
        color: '#2B2A28',
    },
    serviceText: {
        marginTop: '7px',
        fontSize: '10px',
        color: '#FFFEFB',
    },
    manageServiceText: {
        marginTop: '7px',
        fontSize: '10px',
        color: '#2B2A28',
    },
    contactIndex: {
        display: 'inline-block',
        margin: '20px 0 10px',
        padding: '2px 7px',
        borderRadius: '10px',
        fontSize: '8px',
        fontWeight: '900',
        backgroundColor: '#FFFEFB',
        color: '#2B2A28',
    },
    manageContactIndex: {
        display: 'inline-block',
        margin: '20px 0 10px',
        padding: '2px 7px',
        borderRadius: '10px',
        fontSize: '8px',
        fontWeight: '900',
        backgroundColor: '#2B2A28',
        color: '#FFFEFB',
    },
    contactMail: {
        marginBottom: '3px',
        fontSize: '10px',
        color: '#FFFEFB',
        textDecorationLine: 'none',
    },
    manageContactMail: {
        marginBottom: '3px',
        fontSize: '10px',
        color: '#2B2A28',
        textDecorationLine: 'none',
    },
    contactGithub: {
        fontSize: '10px',
        color: '#FFFEFB',
        textDecorationLine: 'none',
    },
    manageContactGithub: {
        fontSize: '10px',
        color: '#2B2A28',
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
    transparentRightSection: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        width: '310px',
    },
    manageRightSection: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        width: '310px',
        backgroundColor: '#FFFEFB',
    },
    menuButtons: {
        display: 'flex',
        marginBottom: '50px',
        gap: '11px',
    },
    languageButtonContainer: {
        position: 'relative',
        flexDirection: 'column',
    },
    languageButton: {
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
        ':hover': {
            cursor: 'pointer',
        },
        ':active': {
            backgroundColor: '#201F1D',
            color: '#C6C6C6',
        },
    },
    manageLanguageButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '3.5px 10px',
        gap: '3px',
        border: '1px solid #2B2A28',
        borderRadius: '15px',
        fontSize: '10px',
        backgroundColor: 'transparent',
        color: '#2B2A28',
        ':hover': {
            cursor: 'pointer',
        },
        ':active': {
            backgroundColor: '#201F1D',
            color: '#C6C6C6',
        },
    },
    dropdownIcon: {
        marginRight: '-4px',
    },
    dropdownOptions: {
        position: 'absolute',
        top: '15px',
        left: '-5%',
        width: '110%',
        padding: '0px',
        border: '0.5px solid #FFFEFB',
        fontSize: '10px',
        textAlign: 'left',
        backgroundColor: '#2B2A28',
        listStyle: 'none',
    },
    manageDropdownOptions: {
        position: 'absolute',
        top: '15px',
        left: '-5%',
        width: '110%',
        padding: '0px',
        border: '0.5px solid #2B2A28',
        fontSize: '10px',
        textAlign: 'left',
        backgroundColor: '#FFFEFB',
        listStyle: 'none',
    },
    options: {
        padding: '5px 0 5px 6px',
        color: '#FFFEFB',
        ':hover': {
            backgroundColor: '#201F1D',
            color: '#42BCD6',
            cursor: 'pointer',
        },
    },
    manageOptions: {
        padding: '5px 0 5px 6px',
        color: '#2B2A28',
        ':hover': {
            backgroundColor: '#201F1D',
            color: '#42BCD6',
            cursor: 'pointer',
        },
    },
    links: {
        color: '#FFFEFB',
        textDecorationLine: 'none',
    },
    managelinks: {
        color: '#2B2A28',
        textDecorationLine: 'none',
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
        ':hover': {
            cursor: 'pointer',
        },
        ':active': {
            backgroundColor: '#201F1D',
            color: '#C6C6C6',
        },
    },
    manageFooterNavigation: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '3.5px 10px',
        gap : '3px',
        border: '1px solid #2B2A28',
        borderRadius: '15px',
        fontSize: '10px',
        backgroundColor: 'transparent',
        color: '#2B2A28',
        ':hover': {
            cursor: 'pointer',
        },
        ':active': {
            backgroundColor: '#201F1D',
            color: '#C6C6C6',
        },
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
    managePrivercyInfo: {
        fontSize: '10px',
        color: '#2B2A28',
        textDecorationLine: 'none',
    },
    ruleInfo: {
        fontSize: '10px',
        color: '#FFFEFB',
        textDecorationLine: 'none',
    },
    manageRuleInfo: {
        fontSize: '10px',
        color: '#2B2A28',
        textDecorationLine: 'none',
    },
    rightInfo: {
        fontSize: '10px',
    },
    manageRightInfo: {
        fontSize: '10px',
        color: '#2B2A28',
    }
});

export default Footer;
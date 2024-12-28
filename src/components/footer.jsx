import { useState, useRef, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { MdLanguage } from 'react-icons/md';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import formLink from '../assets/images/formLink.png';

function Footer() {
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
                <div className={css(styles.menuButtons)}>
                    <div className={css(styles.languageButtonContainer)} ref={languageButtonRef}>
                        <button className={css(styles.languageButton)} onClick={() => {setLanguageDropdown(!languageDropdown); setSitemapDropdown(false);}}>
                            <MdLanguage />{selectedLanguage} { languageDropdown ? <RiArrowDropUpLine className={css(styles.dropdownIcon)}/> : <RiArrowDropDownLine className={css(styles.dropdownIcon)}/> }
                        </button>
                        { languageDropdown ? 
                            <ul className={css(styles.dropdownOptions)}>
                                <li className={css(styles.options)} onClick={() => {setSelectedLanguage('한국어'); setLanguageDropdown(false);}}><a>🇰🇷 한국어</a></li>
                                <li className={css(styles.options)} onClick={() => {setSelectedLanguage('English'); setLanguageDropdown(false);}}><a>🇺🇸 English</a></li>
                                <li className={css(styles.options)} onClick={() => {setSelectedLanguage('Tiếng Việt'); setLanguageDropdown(false);}}><a>🇻🇳 Tiếng Việt</a></li>
                            </ul> : null
                        }
                    </div>
                    <div className={css(styles.languageButtonContainer)} ref={sitemapButtonRef}>
                        <button className={css(styles.footerNavigation)} onClick={()=>{setSitemapDropdown(!sitemapDropdown); setLanguageDropdown(false);}}>
                            사이트맵 { sitemapDropdown ? <RiArrowDropUpLine className={css(styles.dropdownIcon)}/> : <RiArrowDropDownLine className={css(styles.dropdownIcon)}/> }
                        </button>
                        { sitemapDropdown ?
                            <ul className={css(styles.dropdownOptions)}>
                                <a href="" className={css(styles.links)}><li className={css(styles.options)}>이용가이드</li></a>
                                <a href="" className={css(styles.links)}><li className={css(styles.options)}>졸업요건검사</li></a>
                                <a href="" className={css(styles.links)}><li className={css(styles.options)}>기이수과목관리</li></a>
                                <a href="" className={css(styles.links)}><li className={css(styles.options)}>마이페이지</li></a>
                            </ul> : null
                        }
                    </div>
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
        fontFamily: 'Lato',
    },
    footerLeftSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '250px',
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
        fontSize: '11px',
        color: '#FFFEFB',
    },
    serviceText: {
        marginTop: '7px',
        fontSize: '10px',
        color: '#FFFEFB',
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
    dropdownIcon: {
        marginRight: '-4px',
    },
    dropdownOptions: {
        position: 'absolute',
        top: '15px',
        width: '100%',
        padding: '0px',
        border: '0.5px solid #FFFEFB',
        fontSize: '10px',
        textAlign: 'left',
        backgroundColor: '#2B2A28',
        '::-webkit-scrollbar': {
            width: '2px',
        },
        '::-webkit-scrollbar-thumb': {
            backgroundColor: '#CACACA',
            borderRadius: '20px',
        },
        listStyle: 'none',
    },
    options: {
        padding: '6px 0 4px 3px',
        color: '#FFFEFB',
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
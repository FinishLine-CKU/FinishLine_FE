import React, { useState, useRef, useEffect } from 'react';
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
        <footer className={css(
            footerType === 'transparent' ? styles.transparentFooter :
                footerType === 'manage' ? styles.manageFooter :
                    styles.footerContainer
        )}>
            <div className={css(
                footerType === 'transparent' ? styles.transparentLeftSection :
                    footerType === 'manage' ? styles.manageLeftSection :
                        styles.footerLeftSection
            )}>
                <a href="" className={css(styles.surveyLink)} target="_blank">
                    <img
                        src={footerType === 'manage' ? blackFinishlineLogo : formLink}
                        className={css(footerType === 'manage' ? styles.manageformImage : styles.formImage)}
                        alt="FinishLine Logo"
                    />
                    <span className={css(footerType === 'manage' ? styles.manageFormText : styles.formText)}>
                        의 사용 후기를 알려주세요!
                    </span>
                </a>
                <span className={css(footerType === 'manage' ? styles.manageServiceText : styles.serviceText)}>
                    더 나은 서비스로 보답하겠습니다.
                </span>
                <div className={css(footerType === 'manage' ? styles.manageContactIndex : styles.contactIndex)}>
                    CONTACT
                </div>
                <a href="" className={css(footerType === 'manage' ? styles.manageContactMail : styles.contactMail)}>
                    finishline@cku.ac.kr
                </a>
                <a href="https://github.com/FinishLine-CKU"
                    className={css(footerType === 'manage' ? styles.manageContactGithub : styles.contactGithub)}>
                    https://github.com/FinishLine-CKU
                </a>
            </div>

            <div className={css(
                footerType === 'transparent' ? styles.transparentRightSection :
                    footerType === 'manage' ? styles.manageRightSection :
                        styles.footerRightSection
            )}>
                <div className={css(styles.menuButtons)}>
                    <div className={css(styles.languageButtonContainer)} ref={languageButtonRef}>
                        <button
                            className={css(footerType === 'manage' ? styles.manageLanguageButton : styles.languageButton)}
                            onClick={() => {
                                setLanguageDropdown(!languageDropdown);
                                setSitemapDropdown(false);
                            }}
                        >
                            <MdLanguage />
                            {selectedLanguage}
                            {languageDropdown ?
                                <RiArrowDropUpLine className={css(styles.dropdownIcon)} /> :
                                <RiArrowDropDownLine className={css(styles.dropdownIcon)} />
                            }
                        </button>
                        {languageDropdown && (
                            <ul className={css(footerType === 'manage' ? styles.manageDropdownOptions : styles.dropdownOptions)}>
                                {['한국어', 'English', 'Tiếng Việt'].map((lang) => (
                                    <li
                                        key={lang}
                                        className={css(footerType === 'manage' ? styles.manageOptions : styles.options)}
                                        onClick={() => {
                                            setSelectedLanguage(lang);
                                            setLanguageDropdown(false);
                                        }}
                                    >
                                        <a>{lang}</a>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className={css(styles.languageButtonContainer)} ref={sitemapButtonRef}>
                        <button
                            className={css(footerType === 'manage' ? styles.manageFooterNavigation : styles.footerNavigation)}
                            onClick={() => {
                                setSitemapDropdown(!sitemapDropdown);
                                setLanguageDropdown(false);
                            }}
                        >
                            사이트맵
                            {sitemapDropdown ?
                                <RiArrowDropUpLine className={css(styles.dropdownIcon)} /> :
                                <RiArrowDropDownLine className={css(styles.dropdownIcon)} />
                            }
                        </button>
                        {sitemapDropdown && (
                            <ul className={css(styles.dropdownOptions)}>
                                {[
                                    { href: '/userGuidePage', text: '이용가이드' },
                                    { href: '', text: '졸업요건검사' },
                                    { href: '', text: '기이수과목관리' },
                                    { href: '', text: '마이페이지' }
                                ].map((item) => (
                                    <a key={item.text} href={item.href} className={css(styles.links)}>
                                        <li className={css(styles.options)}>{item.text}</li>
                                    </a>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                <div className={css(styles.siteInfo)}>
                    <a href="" className={css(footerType === 'manage' ? styles.managePrivercyInfo : styles.privercyInfo)}>
                        개인정보처리방침
                    </a>
                    <a href="" className={css(footerType === 'manage' ? styles.manageRuleInfo : styles.ruleInfo)}>
                        이용약관
                    </a>
                </div>
                <span className={css(footerType === 'manage' ? styles.manageRightInfo : styles.rightInfo)}>
                    © 2024 CKU Software Engineering student All rights reserved.
                </span>
            </div>
        </footer>
    );
}

const styles = StyleSheet.create({
    // 기본 컨테이너 스타일
    footerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        height: '110px',
        marginTop: 'auto',
        padding: '30px',
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
    footerRightSection: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        width: '310px',
        backgroundColor: '#2B2A28',
    },
    // 투명 푸터 스타일
    transparentFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        height: '110px',
        marginTop: 'auto',
        padding: '30px',
        fontFamily: 'Lato',
    },
    transparentLeftSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '250px',
    },
    transparentRightSection: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        width: '310px',
    },
    // 관리자 푸터 스타일
    manageFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        height: '110px',
        marginTop: 'auto',
        padding: '30px',
        marginLeft: '256px',
        fontFamily: 'Lato'
    },
    manageLeftSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '250px',
    },
    manageRightSection: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        width: '310px',
    },
    manageformImage: {
        width: '93px',
    },
    manageFormText: {
        marginLeft: '3px',
        fontSize: '11px',
        color: '#000000',
    },
    manageServiceText: {
        marginTop: '7px',
        fontSize: '10px',
        color: '#000000',
    },
    manageContactIndex: {
        display: 'inline-block',
        margin: '20px 0 10px',
        padding: '2px 7px',
        borderRadius: '10px',
        fontSize: '8px',
        fontWeight: '900',
        backgroundColor: '#2B2A28',
        color: '#FFFFFF',
    },
    manageContactMail: {
        marginBottom: '3px',
        fontSize: '10px',
        color: '#000000',
        textDecorationLine: 'none',
    },
    manageContactGithub: {
        fontSize: '10px',
        color: '#000000',
        textDecorationLine: 'none',
    },
    manageLanguageButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '3.5px 10px',
        gap: '3px',
        border: '1px solid #000000',
        borderRadius: '15px',
        fontSize: '10px',
        backgroundColor: 'transparent',
        color: '#000000',
        ':hover': {
            cursor: 'pointer',
        },
        ':active': {
            backgroundColor: '#F5F5F5',
            color: '#404040',
        },
    },
    manageDropdownOptions: {
        position: 'absolute',
        top: '15px',
        left: '-5%',
        width: '110%',
        padding: '0px',
        border: '0.5px solid #000000',
        fontSize: '10px',
        textAlign: 'left',
        backgroundColor: '#FFFFFF',
        listStyle: 'none',
    },
    manageOptions: {
        padding: '5px 0 5px 6px',
        color: '#000000',
        ':hover': {
            backgroundColor: '#F5F5F5',
            color: '#404040',
            cursor: 'pointer',
        },
    },
    manageFooterNavigation: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '3.5px 10px',
        gap: '3px',
        border: '1px solid #000000',
        borderRadius: '15px',
        fontSize: '10px',
        backgroundColor: 'transparent',
        color: '#000000',
        ':hover': {
            cursor: 'pointer',
        },
        ':active': {
            backgroundColor: '#F5F5F5',
            color: '#404040',
        },
    },
    managePrivercyInfo: {
        fontSize: '10px',
        color: '#000000',
        textDecorationLine: 'none',
    },
    manageRuleInfo: {
        fontSize: '10px',
        color: '#000000',
        textDecorationLine: 'none',
    },
    manageRightInfo: {
        fontSize: '10px',
        color: '#000000',
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
    options: {
        padding: '5px 0 5px 6px',
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
import React, { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import { Mail, Github, Linkedin } from 'lucide-react';
import LanguageSwitcher from "./LanguageSwitcher"; 
import { useTranslation } from 'react-i18next';

const HeroAndHeader = ({ onLoadComplete }) => {
    const { t } = useTranslation();

    const [menuOpen, setMenuOpen] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const menuRef = useRef(null);
    const svgContainerRef = useRef(null);

    const socialLinks = [
        { icon: Mail, href: 'mailto:thales.o.ribeiro@gmail.com', label: 'Mail' },
        { icon: Linkedin, href: 'https://www.linkedin.com/in/ribeirothales/', label: 'Linkedin' },
        { icon: Github, href: 'https://github.com/ribeirothales', label: 'Github' },
    ];

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden";
            setMenuVisible(true);
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [menuOpen]);

    let [showContent, setShowContent] = useState(false);

    useGSAP(() => {
        if (!svgContainerRef.current) return;

        const tl = gsap.timeline();

        tl.to(".vi-mask-group", {
            rotate: 10,
            duration: 2,
            ease: "Power4.easeInOut",
            transformOrigin: "50% 50%",
        }).to(".vi-mask-group", {
            scale: 10,
            duration: 2,
            delay: -1.8,
            ease: "Expo.easeInOut",
            transformOrigin: "50% 50%",
            opacity: 0,
            onComplete: function () {
                if (this.progress() >= 0.9) {
                    onLoadComplete?.();
                    setShowContent(true);
                    this.kill();
                }
            },
        });
    }, { scope: svgContainerRef, dependencies: [onLoadComplete] });

    useGSAP(() => {
        if (!showContent) return;

        gsap.to(".main", {
            scale: 1,
            rotate: 0,
            duration: 1,
            delay: "-1",
            ease: "Expo.easeInOut",
        });

        gsap.to(".sky", {
            scale: 1.1,
            rotate: 0,
            duration: 2,
            delay: "-.8",
            ease: "Expo.easeInOut",
        });

        gsap.to(".bg", {
            scale: 1.1,
            rotate: 0,
            duration: 2,
            delay: "-.8",
            ease: "Expo.easeInOut",
        });

        gsap.to(".character", {
            scale: 1.4,
            x: "-50%",
            bottom: "-25%",
            rotate: 0,
            duration: 2,
            delay: "-.8",
            ease: "Expo.easeInOut",
        });

        gsap.to(".text", {
            scale: 1,
            rotate: 0,
            duration: 2,
            delay: "-.8",
            ease: "Expo.easeInOut",
        });

        const mainElement = document.querySelector(".main");

        const handleMouseMove = (e) => {
            const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
            gsap.to(".main .text", {
                x: `${xMove * 0.4}%`,
            });
            gsap.to(".sky", {
                x: xMove,
            });
            if (window.innerWidth > 768) {
                gsap.to(".bg", {
                    x: xMove * 1.7,
                });
            }
        };

        if (mainElement) {
            mainElement.addEventListener("mousemove", handleMouseMove);
        }

        return () => {
            if (mainElement) {
                mainElement.removeEventListener("mousemove", handleMouseMove);
            }
        };
    }, [showContent]);

    useGSAP(() => {
        if (!menuRef.current) return;

        if (menuOpen) {
            gsap.fromTo(menuRef.current, { x: "100%" }, { x: "0%", duration: 1, ease: "power3.out" });
        } else if (menuVisible) {
            gsap.to(menuRef.current, { x: "100%", duration: 0.5, ease: "power3.in", onComplete: () => setMenuVisible(false) });
        }
    }, [menuOpen, menuVisible]);

    return (
        <>
            {!showContent && (
                <div ref={svgContainerRef} className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
                    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <mask id="viMask">
                                <rect width="100%" height="100%" fill="black" />
                                <g className="vi-mask-group">
                                    <text
                                        x="50%"
                                        y="50%"
                                        fontSize="250"
                                        textAnchor="middle"
                                        fill="white"
                                        dominantBaseline="middle"
                                        fontFamily="Arial Black"
                                    >
                                        TR
                                    </text>
                                </g>
                            </mask>
                        </defs>
                        <image
                            href="./bg.png"
                            width="100%"
                            height="100%"
                            preserveAspectRatio="xMidYMid slice"
                            mask="url(#viMask)"
                            draggable={false}
                            onContextMenu={(e) => e.preventDefault()}
                        />
                    </svg>
                </div>
            )}

            {showContent && (
                <div className="navbar fixed top-0 left-0 z-50 w-full py-5 md:py-10 px-5 md:px-10 pointer-events-none">
                    <div className="logo flex gap-7 justify-between items-center">
                        <h3 className="text-xl md:text-4xl -mt-[8px] leading-none text-white pointer-events-auto">
                            <a href="#" className="cursor-pointer">FULLSTACK</a>
                        </h3>
                        <div
                            className="group flex h-10 w-10 md:h-13 md:w-13 cursor-pointer items-center justify-center rounded-3xl p-2 hover:bg-gray-600 transition-colors z-50 pointer-events-auto"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            <div className="relative">
                                <span
                                    className={`block h-1 w-6 md:w-8 origin-center rounded-full bg-white transition-transform duration-300 ease-in-out ${menuOpen ? "translate-y-1.5 rotate-45" : ""
                                        }`}
                                ></span>
                                <span
                                    className={`block h-1 w-4 md:w-6 mt-2 origin-center rounded-full bg-white transition-all duration-300 ease-in-out ${menuOpen ? "w-6 md:w-8 -translate-y-1.5 -rotate-45" : ""
                                        }`}
                                ></span>
                            </div>
                        </div>

                        {menuVisible && (
                            <>
                                <div
                                    className={`fixed top-0 left-0 w-full h-full z-30 bg-black/50 backdrop-blur-3xl pointer-events-auto ${menuOpen ? "opacity-100" : "opacity-0"}`}
                                    onClick={() => setMenuOpen(false)}
                                    style={{ transition: "opacity 0.5s ease" }}
                                />
                                <div
                                    ref={menuRef}
                                    className="fixed top-0 right-0 z-40 h-full w-4/5 md:w-2/4 bg-gray-800 shadow-lg p-4 pointer-events-auto"
                                    style={{ transform: "translateX(100%)" }}
                                >
                                    <ul className="space-y-4 mt-20 ml-10 text-[40px] text-white">
                                        <li><a href="#" className="block hover:text-purple-400" onClick={() => setMenuOpen(false)}>{t('menu1')}</a></li>
                                        <li><a href="#about" className="block hover:text-purple-400" onClick={() => setMenuOpen(false)} >{t('menu2')}</a></li>
                                        <li><a href="#curriculum" className="block hover:text-purple-400" onClick={() => setMenuOpen(false)} >{t('menu3')}</a></li>
                                        <li><a href="#work" className="block hover:text-purple-400" onClick={() => setMenuOpen(false)}>{t('menu4')}</a></li>
                                        <li><a href="#contact" className="block hover:text-purple-400" onClick={() => setMenuOpen(false)}>{t('menu5')}</a></li>
                                    </ul>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            {showContent && (
                <div className="main w-full rotate-[-10deg] scale-[1.7]">
                    <div className="landing overflow-hidden relative w-full h-screen bg-black">
                        <div className="imagesdiv relative overflow-hidden w-full h-screen">
                            <img className="absolute sky scale-[1.5] rotate-[-20deg] top-0 left-0 w-full h-full object-cover" src="./sky.png" alt="" draggable={false}
                                onContextMenu={(e) => e.preventDefault()} />
                            <img className="absolute scale-[1.8] rotate-[-3deg] bg top-0 left-0 w-full h-full object-cover" src="./bg.png" alt="" draggable={false}
                                onContextMenu={(e) => e.preventDefault()} />
                            <img className="absolute hidden justify-center items-center sm:flex text left-[25%] xl:left-[40%] bottom-[45%] xl:bottom-[42%] w-[50%] xl:w-[19.5%] rotate-[-20deg]" src="./logo-name.png" alt="" draggable={false}
                                onContextMenu={(e) => e.preventDefault()} />
                            <div className="absolute hidden w-full sm:flex justify-center items-center bottom-10">
                                <img className="character w-[50%] xl:w-[17.5%] sticky left-[50%] scale-[10] rotate-[-20deg]" src="./man3.png" alt="" draggable={false}
                                    onContextMenu={(e) => e.preventDefault()} />
                            </div>
                            <div className="flex w-[190%] justify-center top-40 sm:hidden absolute left-1/2 -translate-x-1/2">
                                <img src="./man-mob.png" alt="Imagem Mobile" className="w-[70%]" draggable={false}
                                    onContextMenu={(e) => e.preventDefault()} />
                            </div>
                        </div>
                        <div className="btmbar text-white absolute bottom-0 left-0 w-full py-10 md:py-15 px-10 bg-gradient-to-t from-[#061329] to-transparent">
                            <div className="flex gap-6 items-center flex-row xl:flex-row justify-center md:justify-start xl:items-center mt-25 md:mt-10 sm:mt-0">
                                {socialLinks.map(social => (
                                    <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="hover:text-brand transition-colors">
                                        <social.icon size={28} />
                                    </a>
                                ))}
                            </div>
                            <img className="absolute h-[30px] md:h-[35px] xl:h-[55px] top-[50%] md:top-[35%] xl:top-[60%] left-[49.6%] md:left-1/2 -translate-x-1/2 -translate-y-1/2" src="./stacks.png" alt="" draggable={false}
                                onContextMenu={(e) => e.preventDefault()} />

                            
                            <LanguageSwitcher />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default HeroAndHeader;

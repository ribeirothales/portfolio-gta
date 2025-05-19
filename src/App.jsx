import React, { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef(null);

  // Definir o fundo do body como preto para evitar o frame branco
  useEffect(() => {
    // Definir o fundo como preto
    document.body.style.backgroundColor = "#000";
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      setMenuVisible(true); // Torna o menu visível quando aberto
    } else {
      document.body.style.overflow = "auto";
      // O menu permanecerá visível até que a animação de fechamento termine
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  let [showContent, setShowContent] = useState(false);
  useGSAP(() => {
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
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          document.querySelector(".svg").remove();
          setShowContent(true);
          this.kill();
        }
      },
    });
  });

  useGSAP(() => {
    if (!showContent) return;

    gsap.to(".main", {
      scale: 1,
      rotate: 0,
      duration: 2,
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

    const main = document.querySelector(".main");

    main?.addEventListener("mousemove", function (e) {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
      gsap.to(".main .text", {
        x: `${xMove * 0.4}%`,
      });
      gsap.to(".sky", {
        x: xMove,
      });
      gsap.to(".bg", {
        x: xMove * 1.7,
      });
    });
  }, [showContent]);

  // Animação do menu lateral com GSAP
  useGSAP(() => {
    if (!menuRef.current) return;
    
    if (menuOpen) {
      // Animação para abrir o menu (da direita para a esquerda)
      gsap.fromTo(
        menuRef.current,
        { x: "100%" },
        { 
          x: "0%", 
          duration: 1, 
          ease: "power3.out"
        }
      );
    } else if (menuVisible) {
      // Animação para fechar o menu (da esquerda para a direita)
      gsap.to(
        menuRef.current, 
        { 
          x: "100%", 
          duration: 0.5, 
          ease: "power3.in",
          onComplete: () => {
            // Oculta o menu após a animação de fechamento
            setMenuVisible(false);
          }
        }
      );
    }
  }, [menuOpen, menuVisible]);

  return (
    <>
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
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
          />
        </svg>
      </div>
      {showContent && (
        <div className="main w-full rotate-[-10deg] scale-[1.7]">
          <div className="landing overflow-hidden relative w-full h-screen bg-black">
            <div className="navbar absolute top-0 left-0 z-[10] w-full py-5 md:py-10 px-5 md:px-10">
              <div className="logo flex gap-7 justify-between items-center p-4">
                <h3 className="text-xl md:text-4xl -mt-[8px] leading-none text-white">
                  FULLSTACK DEVELOPER
                </h3>
                <div
                  className="group flex h-10 w-10 md:h-13 md:w-13 cursor-pointer items-center justify-center rounded-3xl p-2 hover:bg-gray-600 transition-colors z-50"
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

                {/* Menu Overlay - só aparece quando menuVisible é true */}
                {menuVisible && (
                  <>
                    <div
                      className={`fixed top-0 left-0 w-full h-full z-30 bg-black/50 backdrop-blur-3xl ${menuOpen ? "opacity-100" : "opacity-0"}`}
                      onClick={() => setMenuOpen(false)}
                      style={{ transition: "opacity 0.5s ease" }}
                    />
                    <div
                      ref={menuRef}
                      className="fixed top-0 right-0 z-40 h-full w-2/4 bg-gray-800 shadow-lg p-4"
                      style={{ transform: "translateX(100%)" }}
                    >
                      <ul className="space-y-4 mt-20 ml-10 text-[40px] text-white">
                        <li>
                          <a href="#" className="block hover:text-purple-400">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#" className="block hover:text-purple-400">
                            Sobre Mim
                          </a>
                        </li>
                        <li>
                          <a href="#" className="block hover:text-purple-400">
                            Projetos
                          </a>
                        </li>
                        <li>
                          <a href="#" className="block hover:text-purple-400">
                            Contato
                          </a>
                        </li>
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="imagesdiv relative overflow-hidden w-full h-screen">
              <img
                className="absolute sky scale-[1.5] rotate-[-20deg] top-0 left-0 w-full h-full object-cover"
                src="./sky.png"
                alt=""
              />
              <img
                className="absolute scale-[1.8] rotate-[-3deg] bg top-0 left-0 w-full h-full object-cover"
                src="./bg.png"
                alt=""
              />
              <div className="text text-white flex flex-col gap-3 absolute top-20 left-1/2 -translate-x-1/2 scale-[1.4] rotate-[-10deg]">
                <h1 className="text-[4rem] sm:text-[8rem] md:text-[10rem] leading-none -ml-10 sm:-ml-20 md:-ml-40">
                  Thales
                </h1>
                <h1 className="text-[4rem] sm:text-[8rem] md:text-[10rem] leading-none ml-5 sm:ml-10 md:ml-20">
                  Ribeiro
                </h1>
              </div>
              <img
                className="absolute character left-[100%] sm:left-[62.5%] w-[100%] sm:w-[40%] md:w-[25%] -bottom-[150%] -translate-x-1/2 scale-[2] rotate-[-20deg]"
                src="./man.png"
                alt=""
              />

            </div>
            <div className="btmbar text-white absolute bottom-0 left-0 w-full py-15 px-10 bg-gradient-to-t from-black to-transparent">
              <div className="flex gap-4 items-center flex-col-reverse sm:flex-row sm:items-center mt-40 sm:mt-0">
                <h3 className="text-xl font-[Helvetica_Now_Display]">
                  Role para baixo
                </h3>
                <i className="text-4xl ri-arrow-down-line"></i>
              </div>
              <img
                className="absolute h-[55px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                src="./stacks.png"
                alt=""
              />
            </div>


          </div>
          <div className="w-full h-screen flex items-center justify-center bg-black">
            <div className="cntnr flex flex-col md:flex-row text-white w-full h-[80%] px-5 md:px-0">
              <div className="limg relative w-full md:w-1/2 h-1/2 md:h-full">
                <img
                  className="absolute scale-[1.1] md:scale-[1.3] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  src="./imag.png"
                  alt=""
                />
              </div>
              <div className="rg w-full md:w-[30%] py-10 md:py-30">
                <h1 className="text-4xl md:text-8xl">Saiba mais</h1>
                <h1 className="text-4xl md:text-8xl">sobre mim</h1>
                <p className="mt-5 md:mt-10 text-base md:text-xl font-[Helvetica_Now_Display]">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Distinctio possimus, asperiores nam, omnis inventore nesciunt
                  a architecto eveniet saepe, ducimus necessitatibus at
                  voluptate.
                </p>
                <p className="mt-3 text-base md:text-xl font-[Helvetica_Now_Display]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                  eius illum fugit eligendi nesciunt quia similique velit
                  excepturi soluta tenetur illo repellat consectetur laborum
                  eveniet eaque, dicta, hic quisquam? Ex cupiditate ipsa nostrum
                  autem sapiente.
                </p>
                <p className="mt-5 md:mt-10 text-base md:text-xl font-[Helvetica_Now_Display]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                  eius illum fugit eligendi nesciunt quia similique velit
                  excepturi soluta tenetur illo repellat consectetur laborum
                  eveniet eaque, dicta, hic quisquam? Ex cupiditate ipsa nostrum
                  autem sapiente.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;

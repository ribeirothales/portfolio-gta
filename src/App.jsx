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

    const main = document.querySelector(".main");

    main?.addEventListener("mousemove", function (e) {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
      gsap.to(".main .text", {
        x: `${xMove * 0.4}%`,
      });
      // gsap.to(".text", {
      //   x: `${xMove * 0.3}%`,
      // });

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
                  FULLSTACK
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
                      className="fixed top-0 right-0 z-40 h-full w-4/5 md:w-2/4 bg-gray-800 shadow-lg p-4"
                      style={{ transform: "translateX(100%)" }}
                    >
                      <ul className="space-y-4 mt-20 ml-10 text-[40px] text-white">
                        <li>
                          <a href="#" className="block hover:text-purple-400">
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#cntnr" className="block hover:text-purple-400">
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
              {/* <div className="absolute text text-white flex flex-col gap-3 md:top-20 sm:top-32 top-30 left-[55%] md:left-[50%] -translate-x-1/2 scale-[1.4] rotate-[-10deg]">
                <h1 className="text-[3rem] sm:text-[8rem] md:text-[6rem] leading-none -ml-10 sm:-ml-20 md:-ml-10">
                  Thales
                </h1>
                <h1 className="text-[3rem] sm:text-[8rem] md:text-[6rem] leading-none ml-5 sm:ml-10 md:ml-20">
                  Ribeiro
                </h1>
                <h1 className="text-[3rem] sm:text-[8rem] md:text-[6rem] leading-none -ml-10 sm:-ml-20 md:-ml-10">
                  Developer
                </h1>
              </div> */}
              <img
                className="absolute hidden justify-center items-center sm:flex text left-[25%] xl:left-[40%] bottom-[45%] xl:bottom-[42%] w-[50%] xl:w-[19.5%]  rotate-[-20deg]"
                src="./logo-name.png"
                alt=""
              />
              
              <div className="absolute hidden w-full sm:flex justify-center items-center bottom-10">
                <img
                  className="character 
                    w-[50%] xl:w-[17.5%] sticky left-[50%] 
                    scale-[10] rotate-[-20deg]"
                  src="./man3.png"
                  alt=""
                />
              </div>
              <div className="flex w-[190%] justify-center top-40 sm:hidden absolute left-1/2 -translate-x-1/2">
                <img
                  src="./man-mob.png"
                  alt="Imagem Mobile"
                  className="w-[70%]"
                />
              </div>

            </div>
            <div className="btmbar text-white absolute bottom-0 left-0 w-full py-10 md:py-15 px-10 bg-gradient-to-t from-black to-transparent">
              <div className="flex gap-2 items-center flex-col-reverse  xl:flex-row xl:items-center mt-25 md:mt-10 sm:mt-0">
                <h3 className="text-20 md:text-[15px] xl:text-xl font-[Helvetica_Now_Display]">
                  Passe para baixo
                </h3>
                <i className="text-xl md:text-[25px] xl:text-4xl ri-arrow-down-line"></i>
              </div>
              <img
                className="absolute h-[30px] md:h-[35px] xl:h-[55px] top-[50%] md:top-[35%] xl:top-[60%] left-[49.6%] md:left-1/2 -translate-x-1/2 -translate-y-1/2"
                src="./stacks.png"
                alt=""
              />
            </div>

          </div>

          <div className="w-full about-me h-screen flex items-center justify-center bg-black">
            <div className="cntnr flex flex-col md:flex-row text-white w-full h-[90%] px-5 md:px-0">
              <div className="limg relative w-full md:w-1/2 h-1/2 md:h-full">
                <img
                  className="relative md:absolut justify-center md:scale-[1] top-[18%] xl:top-[18%] md:top-[38%] "
                  src="./imag.png"
                  alt=""
                />
              </div>
              <div className="rg text-justify w-full xl:w-[32%] md:w-[35%] py-10 xl:py-20 md:py-40">
                <div className="justify-center items-center text-center xl:text-start md:text-center ">
                  <h1 className="text-4xl xl:text-8xl md:text-6xl">Saiba mais</h1>
                <h1 className="text-4xl xl:text-8xl md:text-6xl ml-10 xl:ml-30 md:ml-0 ">sobre mim</h1>
                </div>
                
                <p className="mt-5 md:mt-10 text-base text-justify md:text-xl font-[Helvetica_Now_Display]">
                  Meu nome é Thales, tenho 29 anos e sou do Rio de Janeiro.
                   Sou um Desenvolvedor FullStack e tenho atuado como freelancer e em projetos pessoais, 
                  sempre buscando entregar soluções funcionais, bem estruturadas e com um bom design.
                </p>
                <p className="mt-5 md:mt-6 text-base md:text-xl font-[Helvetica_Now_Display]">

                  Minha trajetória na tecnologia começou cedo: ainda no colégio aprendi HTML,
                   CSS e Photoshop, desenvolvendo pequenos sites por conta própria. Desde então, segui 
                   me aprofundando na área, passando por linguagens como C (minha primeira linguagem de fato), 
                   Java e Python. Agora, com foco em JavaScript, utilizo principalmente Node.js no back-end e React com Tailwind no front-end.
                 
                </p>
                <p className="mt-5 md:mt-6 text-base md:text-xl font-[Helvetica_Now_Display]">
                  Cursei parte de Ciência da Computação na UFRJ, mas decidi fazer uma pausa para seguir
                   outro caminho acadêmico — me formei em Filosofia, o que contribuiu bastante para meu 
                   raciocínio lógico e capacidade de análise. Agora, estou de volta ao universo da tecnologia,
                    mais focado do que nunca em consolidar minha carreira como desenvolvedor.
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

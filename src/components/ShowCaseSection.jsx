import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const rydeRef = useRef(null);
  const libraryRef = useRef(null);
  const ycDirectoryRef = useRef(null);

  // Estado para controlar qual modal está aberto (null = nenhum aberto)
  const [openModalId, setOpenModalId] = useState(null);

  useEffect(() => {
    if (openModalId !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [openModalId]);

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    const cards = [rydeRef.current, libraryRef.current, ycDirectoryRef.current];

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3 * (index + 1),
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
          },
        }
      );
    });
  }, []);

  const openModal = (id) => setOpenModalId(id);
  const closeModal = () => setOpenModalId(null);

  return (
    <section id="work" ref={sectionRef} className="app-showcase font-[Poppins]">
      <div className="w-full ">
        <div className="showcaselayout">
          {/* Primeiro projeto */}
          <div ref={rydeRef} className="first-project-wrapper">
            <div
              className="image-wrapper cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
              onClick={() => openModal("hermeticChat")}
            >
              <img src="./project.png" alt="Hermetic Chat" />
            </div>
            <div className="text-content">
              <h2>Hermetic Chat</h2>
              <p className="text-white-50 md:text-xl text-justify">
                Uma aplicação de chat em tempo real, onde os usuários podem interagir
                instantaneamente com amigos e colegas. A aplicação inclui recursos como
                mensagens privadas, alternância entre temas Dark e Light, lista de usuários
                online, autenticação de usuários e muito mais!
              </p>
            </div>
          </div>

          {/* Outros projetos */}
          <div className="project-list-wrapper overflow-hidden">
            <div className="project" ref={libraryRef}>
              <div
                className="image-wrapper bg-[#dbe6ff] cursor-pointer"
                onClick={() => openModal("eleicoes2014")}
              >
                <img
                  src="./project2.png"
                  alt="Library Management Platform"
                  className="transition-transform duration-300 ease-in-out hover:scale-105"
                />
              </div>
              <h2>Eleições Presidencias 2014</h2>
            </div>

            <div className="project" ref={ycDirectoryRef}>
              <div
                className="image-wrapper bg-[#ffe7ff] cursor-pointer"
                onClick={() => openModal("pitagoras")}
              >
                <img
                  src="./project3.png"
                  alt="YC Directory App"
                  className="transition-transform duration-300 ease-in-out hover:scale-105"
                />
              </div>
              <h2>Pitágoras</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Modais separados */}
      {openModalId === "hermeticChat" && (
        <ModalWrapper onClose={closeModal}>
          <h3 className="text-2xl font-bold mb-6 text-center">Hermetic Chat</h3>
          <div className="flex flex-col gap-4">
            <a
              href="https://github.com/ribeirothales/hermetic-chat"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-center py-3 px-6 rounded-xl font-semibold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 shadow-lg hover:brightness-110 transition"
            >
              Ver no GitHub
            </a>
            <a
              href="https://hermetic-chat.onrender.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-center py-3 px-6 rounded-xl font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg hover:brightness-110 transition"
            >
              Ver Projeto Online
            </a>
          </div>
        </ModalWrapper>
      )}

      {openModalId === "eleicoes2014" && (
        <ModalWrapper onClose={closeModal}>
          <h3 className="text-2xl font-bold mb-6 text-center">Eleições Presidenciais 2014</h3>
          <div className="flex flex-col gap-4">
            <a
              href="https://github.com/ribeirothales/eleicao-2014"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-center py-3 px-6 rounded-xl font-semibold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 shadow-lg hover:brightness-110 transition"
            >
              Ver no GitHub
            </a>
            {/* <a
              href="https://link-eleicoes-online.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-center py-3 px-6 rounded-xl font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg hover:brightness-110 transition"
            >
              Ver Projeto Online
            </a> */}
          </div>
        </ModalWrapper>
      )}

      {openModalId === "pitagoras" && (
        <ModalWrapper onClose={closeModal}>
          <h3 className="text-2xl font-bold mb-6 text-center">Pitágoras</h3>
          <div className="flex flex-col gap-4">
            <a
              href="https://github.com/ribeirothales/pythagoras-website"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-center py-3 px-6 rounded-xl font-semibold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 shadow-lg hover:brightness-110 transition"
            >
              Ver no GitHub
            </a>
            <a
              href="https://pythagoras-website.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-center py-3 px-6 rounded-xl font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg hover:brightness-110 transition"
            >
              Ver Projeto Online
            </a>
          </div>
        </ModalWrapper>
      )}
    </section>
  );
};

const ModalWrapper = ({ children, onClose }) => (
  <div
    className="fixed inset-0 flex items-center justify-center z-50"
    style={{
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
    }}
  >
    <div className="bg-[#0a1e3f] rounded-2xl p-8 max-w-md w-full relative shadow-2xl text-white">
      <button
        onClick={onClose}
        className="absolute top-3 right-4 text-white hover:text-gray-300 text-3xl cursor-pointer"
        aria-label="Fechar modal"
      >
        &times;
      </button>
      {children}
    </div>
  </div>
);

export default AppShowcase;

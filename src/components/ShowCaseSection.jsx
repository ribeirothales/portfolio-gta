import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const rydeRef = useRef(null);
  const libraryRef = useRef(null);
  const ycDirectoryRef = useRef(null);

  const [openModalId, setOpenModalId] = useState(null);
  const recentlyClosedRef = useRef(false);
  const closingTimeout = useRef(null);

  const openModal = (id) => {
    if (recentlyClosedRef.current || openModalId !== null) return;
    setOpenModalId(id);
  };

  const closeModal = () => {
    if (closingTimeout.current) {
      clearTimeout(closingTimeout.current);
    }
    setOpenModalId(null);
    recentlyClosedRef.current = true;
    closingTimeout.current = setTimeout(() => {
      recentlyClosedRef.current = false;
    }, 500); // tempo aumentado
  };

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
        { y: 50, opacity: 0 },
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

  return (
    <section id="work" ref={sectionRef} className="app-showcase font-[Poppins] mt-[0px] sm:mt-[0px]">
      <div className="w-full">
        <div className="showcaselayout">
          <div ref={rydeRef} className="first-project-wrapper">
            <div
              className="image-wrapper cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
              onClick={() => openModal("hermeticChat")}
            >
              <img src="./project.png" alt="Hermetic Chat" />
            </div>
            <div className="text-content">
              <h2 className="flex justify-center items-center xl:justify-start xl:items-start">Hermetic Chat</h2>
              <p className="text-white-50 md:text-xl text-justify">
                {t('project1resume')}
              </p>
            </div>
          </div>

          <div className="project-list-wrapper overflow-hidden">
            <div className="project" ref={libraryRef}>
              <div
                className="image-wrapper bg-[#dbe6ff] cursor-pointer"
                onClick={() => openModal("eleicoes2014")}
              >
                <img
                  src="./project2.png"
                  alt="Eleição"
                  className="transition-transform duration-300 ease-in-out hover:scale-105"
                />
              </div>
              <h2 className="flex justify-center items-center xl:justify-start xl:items-start">{t('project2')}</h2>
            </div>

            <div className="project" ref={ycDirectoryRef}>
              <div
                className="image-wrapper bg-[#ffe7ff] cursor-pointer"
                onClick={() => openModal("pitagoras")}
              >
                <img
                  src="./project3.png"
                  alt="Pitágoras"
                  className="transition-transform duration-300 ease-in-out hover:scale-105 "
                />
              </div>
              <h2 className="flex justify-center items-center xl:justify-start xl:items-start">{t('project3')}</h2>
            </div>
          </div>
        </div>
      </div>

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
              {t('github')}
            </a>
            <a
              href="https://hermetic-chat.onrender.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-center py-3 px-6 rounded-xl font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg hover:brightness-110 transition"
            >
              {t('online')}
            </a>
          </div>
        </ModalWrapper>
      )}

      {openModalId === "eleicoes2014" && (
        <ModalWrapper onClose={closeModal}>
          <h3 className="text-2xl font-bold mb-6 text-center">{t('project2')}</h3>
          <div className="flex flex-col gap-4">
            <a
              href="https://github.com/ribeirothales/eleicao-2014"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-center py-3 px-6 rounded-xl font-semibold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 shadow-lg hover:brightness-110 transition"
            >
              {t('github')}
            </a>
            <a
              href="https://eleicao-2014.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-center py-3 px-6 rounded-xl font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg hover:brightness-110 transition"
            >
              {t('online')}
            </a>
          </div>
        </ModalWrapper>
      )}

      {openModalId === "pitagoras" && (
        <ModalWrapper onClose={closeModal}>
          <h3 className="text-2xl font-bold mb-6 text-center">{t('project3')}</h3>
          <div className="flex flex-col gap-4">
            <a
              href="https://github.com/ribeirothales/pythagoras-website"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-center py-3 px-6 rounded-xl font-semibold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 shadow-lg hover:brightness-110 transition"
            >
              {t('github')}
            </a>
            <a
              href="https://pythagoras-website.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-center py-3 px-6 rounded-xl font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg hover:brightness-110 transition"
            >
              {t('online')}
            </a>
          </div>
        </ModalWrapper>
      )}
    </section>
  );
};

const ModalWrapper = ({ children, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        e.stopPropagation();
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside, true);
    document.addEventListener("touchstart", handleClickOutside, { passive: false });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <div
        ref={modalRef}
        className="bg-[#0a1e3f] rounded-2xl p-8 max-w-md w-full relative shadow-2xl text-white"
      >
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
};

export default AppShowcase;

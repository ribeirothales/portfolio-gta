import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const rydeRef = useRef(null);
  const libraryRef = useRef(null);
  const ycDirectoryRef = useRef(null);

  useGSAP(() => {
    // Animation for the main section
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    // Animations for each app showcase
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

  return (
      <section id="work" ref={sectionRef} className="app-showcase">
            <div className="w-full">
              <div className="showcaselayout font-[Mona_Sans]">
                <div ref={rydeRef} className="first-project-wrapper">
                  <div className="image-wrapper">
                    <img src="./project.png" alt="Hermetic Chat" />
                  </div>
                  <div className="text-content">
                    <h2>
                      Hermetic Chat
                    </h2>
                    <p className="text-white-50 md:text-xl">
                      Uma aplicação de chat em tempo real, onde os usuários podem interagir
                       instantaneamente com amigos e colegas. A aplicação inclui recursos como
                        mensagens privadas, alternânica entre temas Dark e Light, lista de usuários
                         online, autenticação de usuários e muito mais!
                    </p>
                  </div>
                </div>

                <div className="project-list-wrapper overflow-hidden">
                  <div className="project" ref={libraryRef}>
                    <div className="image-wrapper bg-[#dbe6ff]">
                      <img
                        src="./project2.png"
                        alt="Library Management Platform"
                      />
                    </div>
                    <h2>Eleições Presidencias 2014</h2>
                  </div>

                  <div className="project" ref={ycDirectoryRef}>
                    <div className="image-wrapper bg-[#ffe7ff]">
                      <img src="./project3.png" alt="YC Directory App" />
                    </div>
                    <h2>Pitágoras</h2>
                  </div>
                </div>
              </div>
            </div>
          </section>

  );
};

export default AppShowcase;
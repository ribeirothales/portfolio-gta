import "remixicon/fonts/remixicon.css";

const AboutSection = () => {

    return (
        <div id="about" className="w-full mt-[3%] mb-[3%] about-me h-[100%] md:h-[100%] xl:h-screen sm:h-screen flex items-center justify-center bg-#061329" >
            <div className="cntnr flex flex-col md:flex-row text-white w-full h-[100%] px-5 md:px-0">
              <div className="limg relative w-full md:w-1/2 h-1/2 md:h-full">
                <img
                  className="relative md:absolute justify-center mt-[0%] xl:mt-[0%] lg:mt[%] md:mt-[100%] sm:mt-[0%]  top-[18%] xl:top-[18%] md:top-[38%]"
                  src="./imag.png"
                  alt=""
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
              <div className="rg text-justify ml-[0px] xl:ml-[100px] md:ml-[0px] sm:ml-[0px]  w-full xl:w-[32%] md:w-[45%] py-10 xl:py-20 md:py-30">
                <div className="justify-center items-center text-center xl:text-start md:text-center">
                  <h1 className="text-4xl xl:text-8xl md:text-6xl [@media(min-width:2560px)]:text-[150px] [@media(min-width:3840px)]:text-[150px]">Saiba mais</h1>
                  <h1 className="text-4xl xl:text-8xl md:text-6xl ml-10 xl:ml-30 md:ml-0 [@media(min-width:2560px)]:text-[150px] [@media(min-width:3840px)]:text-[150px]">sobre mim</h1>
                </div>

                <p className="mt-5 font-[Poppins] md:mt-10 text-justify text-[15px] sm:text-4xl md:text-xl lg:text-xl [@media(min-width:2560px)]:text-3xl [@media(min-width:3840px)]:text-[50px] ">
                  Meu nome é Thales, tenho 29 anos e sou do Rio de Janeiro.
                  Sou um Desenvolvedor FullStack e tenho atuado como freelancer e em projetos pessoais,
                  sempre buscando entregar soluções funcionais, bem estruturadas e com um bom design.
                </p>
                <p className="mt-5 md:mt-6 text-justify text-[15px] sm:text-4xl md:text-xl lg:text-xl [@media(min-width:2560px)]:text-3xl [@media(min-width:3840px)]:text-[50px] font-[Poppins] ">

                  Minha trajetória na tecnologia começou cedo: ainda no colégio aprendi HTML,
                  CSS e Photoshop, desenvolvendo pequenos sites por conta própria. Desde então, segui
                  me aprofundando na área, passando por linguagens como C (minha primeira linguagem de fato),
                  Java e Python. Agora, com foco em JavaScript, utilizo principalmente Node.js no back-end e React com Tailwind no front-end.

                </p>
                <p className="mt-5 md:mt-6 text-justify text-[15px] sm:text-4xl md:text-xl lg:text-xl [@media(min-width:2560px)]:text-3xl [@media(min-width:3840px)]:text-[50px] font-[Poppins] ">
                  Cursei parte de Ciência da Computação na UFRJ, mas decidi fazer uma pausa para seguir
                  outro caminho acadêmico — me formei em Filosofia, o que contribuiu bastante para meu
                  raciocínio lógico e capacidade de análise. Agora, estou de volta ao universo da tecnologia,
                  mais focado do que nunca em consolidar minha carreira como desenvolvedor.
                </p>
              </div>
            </div>
          </div>

    );
};

export default AboutSection;
import "remixicon/fonts/remixicon.css";

const AboutSection = () => {

    return (
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

    );
};

export default AboutSection;
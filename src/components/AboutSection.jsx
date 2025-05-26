import "remixicon/fonts/remixicon.css";
import { useTranslation } from 'react-i18next';

const AboutSection = () => {
  const { t } = useTranslation();

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
            <h1 className="text-4xl xl:text-8xl md:text-6xl [@media(min-width:2560px)]:text-[150px] [@media(min-width:3840px)]:text-[150px]">{t('abouttitle1')}</h1>
            <h1 className="text-4xl xl:text-8xl md:text-6xl ml-10 xl:ml-30 md:ml-0 [@media(min-width:2560px)]:text-[150px] [@media(min-width:3840px)]:text-[150px]">{t('abouttitle2')}</h1>
          </div>

          <p className="mt-5 font-[Poppins] md:mt-10 text-justify text-[15px] sm:text-4xl md:text-xl lg:text-xl [@media(min-width:2560px)]:text-3xl [@media(min-width:3840px)]:text-[50px] ">
            {t('about1')}
          </p>
          <p className="mt-5 md:mt-6 text-justify text-[15px] sm:text-4xl md:text-xl lg:text-xl [@media(min-width:2560px)]:text-3xl [@media(min-width:3840px)]:text-[50px] font-[Poppins] ">

            {t('about2')}

          </p>
          <p className="mt-5 md:mt-6 text-justify text-[15px] sm:text-4xl md:text-xl lg:text-xl [@media(min-width:2560px)]:text-3xl [@media(min-width:3840px)]:text-[50px] font-[Poppins] ">
            {t('about3')}
          </p>
        </div>
      </div>
    </div>

  );
};

export default AboutSection;
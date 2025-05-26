import { Mail, Github, Linkedin } from 'lucide-react';

const Footer = () => {

    const socialLinks = [
        { icon: Mail, href: 'mailto:thales.o.ribeiro@gmail.com', label: 'Mail' },
        { icon: Linkedin, href: 'https://www.linkedin.com/in/ribeirothales/', label: 'Linkedin' },
        { icon: Github, href: 'https://github.com/ribeirothales', label: 'Github' },
    ];
    return (
        <footer className="footer font-[Poppins] pb-[30px]">
            <div className="footer-container">
                <div className="flex flex-col justify-center">
                    <p className='cursor-default'>© {new Date().getFullYear()} Thales Ribeiro. All rights reserved.</p>
                </div>
                <div className="socials text-end md:text-end">
                    {socialLinks.map(social => (
                        <a key={social.label} href={social.href} target="_blank" aria-label={social.label} className="hover:text-brand transition-colors">
                            <social.icon size={28} />
                        </a>
                    ))}
                </div>
                <div className="flex flex-col justify-center text-[12px}">
                    <p className="text-center md:text-end cursor-default">
                        τί ἐστι τὸ καλόν;
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
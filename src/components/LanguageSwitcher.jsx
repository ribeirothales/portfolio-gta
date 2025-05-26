// LanguageSwitcher.jsx atualizado para React 19
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import './LanguageSwitcher.css';

function LanguageSwitcher() {
    // Use o hook dentro do componente funcional
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Lista de idiomas disponíveis
    const languages = [
        { code: 'pt', name: 'Português' },
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Español' },
    ];

    // Função para mudar o idioma
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setIsOpen(false);
    };

    // Fechar o dropdown quando clicar fora dele
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Encontrar o nome do idioma atual
    const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

    return (
        <div className="language-switcher-container font-[Poppins]" ref={dropdownRef}>
            <button
                className="language-switcher-button"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                <Globe size={18} />
                <span>{currentLanguage.name}</span>
            </button>

            {isOpen && (
                <div className="language-dropdown">
                    {languages.map((language) => (
                        <button
                            key={language.code}
                            className={`language-option ${language.code === i18n.language ? 'active' : ''}`}
                            onClick={() => changeLanguage(language.code)}
                            aria-selected={language.code === i18n.language}
                        >
                            <span className="language-radio">
                                {language.code === i18n.language && <span className="radio-selected"></span>}
                            </span>
                            {language.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default LanguageSwitcher;

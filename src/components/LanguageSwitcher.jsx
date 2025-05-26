import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import './LanguageSwitcher.css';

function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const languages = [
        { code: 'pt', name: 'Português' },
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Español' },
    ];

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setIsOpen(false);
    };

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

    // --- AJUSTE AQUI --- 
    // Normaliza o código do idioma atual (ex: 'pt-BR' -> 'pt') para comparação
    const currentLanguageCode = i18n.language.split('-')[0]; // Pega apenas a parte base do idioma (ex: 'pt' de 'pt-BR')

    // Encontra o nome do idioma atual usando o código normalizado
    const currentLanguage = languages.find(lang => lang.code === currentLanguageCode) || languages[0];

    return (
        <div className="language-switcher-container font-[Poppins]" ref={dropdownRef}>
            <button
                className="language-switcher-button"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                <Globe size={18} />
                {/* Exibe o nome do idioma encontrado */} 
                <span>{currentLanguage.name}</span> 
            </button>

            {isOpen && (
                <div className="language-dropdown">
                    {languages.map((language) => (
                        <button
                            key={language.code}
                            // --- AJUSTE AQUI --- 
                            // Compara o código da opção com o código normalizado para definir a classe 'active'
                            className={`language-option ${language.code === currentLanguageCode ? 'active' : ''}`}
                            onClick={() => changeLanguage(language.code)}
                            // --- AJUSTE AQUI --- 
                            // Compara o código da opção com o código normalizado para definir aria-selected
                            aria-selected={language.code === currentLanguageCode}
                        >
                            <span className="language-radio">
                                {/* --- AJUSTE AQUI --- */}
                                {/* Compara o código da opção com o código normalizado para mostrar o radio selecionado */} 
                                {language.code === currentLanguageCode && <span className="radio-selected"></span>}
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


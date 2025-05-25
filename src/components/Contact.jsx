import { useState } from "react";

import TitleHeader from "./TitleHeader";
import ContactExperience from "./ContactExperience";

const Contact = () => {
    const [formStatus, setFormStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);

        try {
            const response = await fetch("https://formspree.io/f/meogbeyp", {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json",
                },
            });

            if (response.ok) {
                setFormStatus("success");
                e.target.reset();
            } else {
                setFormStatus("error");
            }
        } catch (err) {
            setFormStatus("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="flex-center section-padding font-[Poppins]">
            <div className="w-full h-full md:px-10 px-5">
                <TitleHeader
                    title="Entre em contato!"
                    sub="💬 Possui ideias ou dúvidas? Vamos conversar."
                />
                <div className="grid-12-cols mt-16">
                    <div className="xl:col-span-5">
                        <div className="flex-center card-border rounded-xl p-10">
                            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-7">
                                <div>
                                    <label htmlFor="name">Nome</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Digite seu nome"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email">E-mail</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Digite seu e-mail"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message">Mensagem</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        placeholder="Como posso ajudar?"
                                        rows="5"
                                        required
                                    />
                                </div>

                                <input type="text" name="_gotcha" style={{ display: "none" }} />

                                <button type="submit">
                                    <div className="text-white mb-7 cursor-pointer text-center py-3 px-6 rounded-xl font-semibold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 shadow-lg hover:brightness-110 transition">
                                        <div className="bg-circle" />
                                        <p className="text">{loading ? "Enviando..." : "Enviar"}</p>
                                    </div>
                                </button>

                                {formStatus === "success" && (
                                    <p className="text-green-500 text-center">E-mail enviado com sucesso!</p>
                                )}
                                {formStatus === "error" && (
                                    <p className="text-red-500 text-center">Ocorreu um erro. Tente novamente.</p>
                                )}
                            </form>
                        </div>
                    </div>
                    <div className="xl:col-span-7 min-h-96">
                        <div className="bg-[#52044b] color-black w-full h-full hover:cursor-grab rounded-3xl overflow-hidden">
                            <ContactExperience />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;

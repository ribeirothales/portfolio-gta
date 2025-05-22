import { useRef, useState } from "react";
// import emailjs from "@emailjs/browser";

import TitleHeader from "./TitleHeader";
import ContactExperience from "./ContactExperience";

const Contact = () => {
    const formRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Show loading state

        try {
            await emailjs.sendForm(
                import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
                formRef.current,
                import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
            );

            // Reset form and stop loading
            setForm({ name: "", email: "", message: "" });
        } catch (error) {
            console.error("EmailJS Error:", error); // Optional: show toast
        } finally {
            setLoading(false); // Always stop loading, even on error
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
                            <form
                                ref={formRef}
                                onSubmit={handleSubmit}
                                className="w-full flex flex-col gap-7"
                            >
                                <div>
                                    <label htmlFor="name">Nome</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
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
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="Digite seu e-mail"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message">Mensagem</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        placeholder="Como posso ajudar?"
                                        rows="5"
                                        required
                                    />
                                </div>

                                <button type="submit ">
                                    <div className="text-white cursor-pointer text-center py-3 px-6 rounded-xl font-semibold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 shadow-lg hover:brightness-110 transition">
                                        <div className="bg-circle" />
                                        <p className="text">
                                            {loading ? "Enviando..." : "Enviar"}
                                        </p>
                                    </div>
                                </button>
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
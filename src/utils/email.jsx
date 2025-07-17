import emailjs from '@emailjs/browser';

// Configurações do EmailJS
const EMAIL_CONFIG = {
    serviceId: 'service_0rbaiji', // Substitua pelo seu Service ID
    publicKey: 'utjNP4FwYfSEdvHyE' // Substitua pela sua Public Key
};

// Inicializar EmailJS
emailjs.init(EMAIL_CONFIG.publicKey);


export const sendEmail = async (templateParams, templateId) => {
    try {
        const result = await emailjs.send(
            EMAIL_CONFIG.serviceId,
            templateId,
            templateParams
        );

        console.log('Email enviado com sucesso:', result.text);
        return { success: true, message: 'Email enviado com sucesso!' };
    } catch (error) {
        console.error('Erro ao enviar email:', error);
        return { success: false, message: 'Erro ao enviar email', error };
    }
};


export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export default {
    sendEmail,
    validateEmail
};
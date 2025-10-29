import emailjs from '@emailjs/browser';

const EMAIL_CONFIG = {
    serviceId: 'service_0rbaiji',
    publicKey: 'utjNP4FwYfSEdvHyE'
};


emailjs.init(EMAIL_CONFIG.publicKey);


export const sendEmail = async (templateParams, templateId) => {
    try {
        const result = await emailjs.send(
            EMAIL_CONFIG.serviceId,
            templateId,
            templateParams
        );

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
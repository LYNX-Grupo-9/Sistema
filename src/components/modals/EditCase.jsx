import api from "../../services/api";
import React, { useState, useEffect } from "react";
import CloseIcon from "../../assets/icons/close.svg";
import { Stepper } from "../Stepper";
import { LgButton } from "../Buttons/LgButton";
import { StepOne } from "../Steps/Case/StepOne";
import { StepTwo } from "../Steps/Case/StepTwo";
import { StepThree } from "../Steps/Case/StepThree";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { CustomerRegister } from "./CustomerRegister";

export function EditCase({ isOpen, onClose, selectedCaseData, idProcesso }) {
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const [step, setStep] = useState(1);
    const idAdvogado = localStorage.getItem("idAdvogado");
    const [caseData, setCaseData] = useState({});

    useEffect(() => {
        if (selectedCaseData) {
            setCaseData({
                titulo: selectedCaseData.titulo || "",
                numeroProcesso: selectedCaseData.numeroProcesso || "",
                idCliente: selectedCaseData.idCliente  || "",
                status: selectedCaseData.status || "",
                classeProcessual: selectedCaseData.classeProcessual || "",
                assunto: selectedCaseData.assunto || "",
                tribunal: selectedCaseData.tribunal || "",
                valor: selectedCaseData.valor || "",
                autor: selectedCaseData.autor || "",
                nomeAdvogado: selectedCaseData.nomeAdvogado || "",
                reu: selectedCaseData.reu || "",
                advReu: selectedCaseData.advReu || "",
                idAdvogado: selectedCaseData.idAdvogado || "",
            });
        }
    }, [selectedCaseData]);

    const closeBothModals = () => {
        setModalOpen(false);
        onClose();
    };

    const closeOnlyCustomerModal = () => {
        setModalOpen(false);
    }

    const errorMessage = (message) => toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
    });

    const handleNextStep = () => {
        if (step === 1) {
            if (!caseData.titulo.trim()) return errorMessage("Preencha o título do caso");
            if (!caseData.numeroProcesso.trim()) return errorMessage("Preencha o número do caso");
            if (!caseData.status.trim()) return errorMessage("Selecione o status do caso")
            if (!caseData.classeProcessual.trim()) return errorMessage("Preencha a classe do caso");
            setStep(2);
        }
        else if (step === 2) {
            if (!caseData.assunto.trim()) return errorMessage("Preencha o assunto do caso");
            if (!caseData.tribunal.trim()) return errorMessage("Preencha o tribunal responsável");
            setStep(3);
        }
        else if (step === 3) {
            if (!caseData.autor.trim()) return errorMessage("Preencha o nome do autor");
            if (!caseData.advRequerente.trim()) return errorMessage("Preencha o nome do advogado requerente");
            if (!caseData.reu.trim()) return errorMessage("Preencha o nome do réu");
            if (!caseData.advReu.trim()) return errorMessage("Preencha o nome do advogado do réu");
            handleRegister();
        }
    };



    const handleRegister = () => {
        console.log("Registering case with data:", caseData);
        api.editCase(idProcesso,caseData)
            .then((response) => {
                console.log("Case registered successfully", response.data);
                closeBothModals();

                location.reload();

            })
            .catch((error) => {
                console.error("Error registering user", error);
            });
    }
    return isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--bgTransparentDark)] bg-opacity-50">
            <div className="bg-[var(--color-light)] p-4 md:p-10 shadow-xl w-full md:w-[45%] h-full md:h-[80%] flex flex-col rounded-none md:rounded-[40px]">
                <div className="w-full flex justify-end ">
                    <img src={CloseIcon} className="w-[5%] mb-6 cursor-pointer" onClick={onClose} />
                </div>

                {
                    <>
                        <Stepper currentStep={step} />

                        <div className="w-full flex-1 overflow-y-auto">
                            {
                                (step === 1 ? (
                                    <StepOne caseData={caseData} setCaseData={setCaseData} />
                                ) : step === 2 ? (
                                    <StepTwo caseData={caseData} setCaseData={setCaseData} />
                                ) : (
                                    <StepThree caseData={caseData} setCaseData={setCaseData} />
                                ))}
                        </div>

                        <div className="w-full flex justify-evenly mt-[5px]">
                            {step > 1 && (
                                <LgButton title="Voltar" click={() => setStep(step - 1)} type="alternative" />
                            )}
                            {step === 3 ? (
                                <LgButton title="Editar" click={handleNextStep} />
                            ) : (
                                <LgButton title="Proximo" click={handleNextStep} />
                            )}
                        </div>

                    </>
                }
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
            />
            <CustomerRegister
                isOpen={modalOpen}
                onClose={closeBothModals}
                caseFlow={true}
                closeModal={closeOnlyCustomerModal}
            />

        </div>

    ) : null

}
import api from "../../services/api";
import React, { useState } from "react";
import CloseIcon from "../../assets/icons/close.svg";
import { Stepper } from "../Stepper";
import { LgButton } from "../Buttons/LgButton";
import { StepOne } from "../Steps/Case/StepOne";
import { StepTwo } from "../Steps/Case/StepTwo";
import { StepThree } from "../Steps/Case/StepThree";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { ClientTypeSelection } from "../Steps/Case/ClientTypeSelection";
import { CustomerSelection } from "../Steps/Case/CustomerSelection";
import { CustomerRegister } from "./CustomerRegister";

export function CaseRegister({ isOpen, onClose }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [caseModalOpen, setCaseModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const [clientSelectStep, setClientSelectStep] = useState(1);
  const [step, setStep] = useState(1);
  const idAdvogado = localStorage.getItem("idAdvogado");
  const [newCustomer, setNewCustomer] = useState(false);
  const [caseData, setCaseData] = useState({
    titulo: "",
    numeroProcesso: "",
    idCliente: 0,
    status: "",
    classeProcessual: "",
    assunto: "",
    tribunal: "",
    valor: "",
    autor: "",
    nomeAdvogado: "",
    reu: "",
    advReu: "",
    idAdvogado: Number(idAdvogado),
  });
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

  const handleClientSelectionType = (selection) => {
    if (selection === "existing") {
      setNewCustomer(false);
      setClientSelectStep(2);
    } else if (selection === "new") {
      setNewCustomer(true);
      openModal();
      setClientSelectStep(3);
    } else if (selection === "selected") {
      setClientSelectStep(3);
    }
  }

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
      if (!caseData.valor.trim() || isNaN(caseData.valor)) return errorMessage("Preencha um valor válido para o caso");
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
    api.newCase(caseData)
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
          clientSelectStep === 1 ? <ClientTypeSelection handleClientSelectionType={handleClientSelectionType} /> :
            clientSelectStep === 2 ? <CustomerSelection caseData={caseData} setCaseData={setCaseData} type={handleClientSelectionType} /> :
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
                    <LgButton title="Cadastrar" click={handleNextStep} />
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
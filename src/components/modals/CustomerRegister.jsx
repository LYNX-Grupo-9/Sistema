import api from "../../services/api";
import React, { useEffect, useState } from "react";
import CloseIcon from "../../assets/icons/close.svg";
import { Stepper } from "../Stepper";
import { LgButton } from "../Buttons/LgButton";
import { CustomerStep1 } from "../Steps/CustomerStep1";
import { CustomerStep2 } from "../Steps/CustomerStep2";
import { CustomerStep3 } from "../Steps/CustomerStep3";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { format } from 'date-fns';

export function CustomerRegister({ isOpen, onClose, caseFlow, closeModal, CustomerData, editMode, idCliente }) {

 const handleClose = () => {
    onClose();
  }
  const [step, setStep] = useState(1);
  const idAdvogado = localStorage.getItem("idAdvogado");
  const [user, setUser] = useState({});

  useEffect(() => {
    if (CustomerData) {
      setUser({
        nome: CustomerData.nome || "",
        documento: CustomerData.documento || "",
        tipoDocumento: CustomerData.tipoDocumento || "",
        email: CustomerData.email || "",
        telefone: CustomerData.telefone || "",
        endereco: CustomerData.endereco || "",
        genero: CustomerData.genero || "",
        dataNascimento: CustomerData.dataNascimento ? format(new Date(CustomerData.dataNascimento), 'dd-MM-yyyy') : "",
        estadoCivil: CustomerData.estadoCivil || "",
        profissao: CustomerData.profissao || "",
        passaporte: CustomerData.passaporte || "",
        cnh: CustomerData.cnh || "",
        naturalidade: CustomerData.naturalidade || "",
        idAdvogado,
      });
    }
  }, [CustomerData]);

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
        if (!user.nome.trim()) return errorMessage("Preencha o nome do cliente");
        if (!user.dataNascimento) return errorMessage("Preencha a data de nascimento");
        if (!user.genero) return errorMessage("Selecione o gênero");
        if (!user.estadoCivil) return errorMessage("Selecione o estado civil");
        if (!user.naturalidade.trim()) return errorMessage("Preencha a naturalidade");
    
        converterParaISO(user.dataNascimento);
        setStep(2);
      }
    
      else if (step === 2) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!user.email.trim()) return errorMessage("Preencha o e-mail");
        if (!emailRegex.test(user.email)) return errorMessage("E-mail inválido");
        if (!user.telefone.trim()) return errorMessage("Preencha o telefone");
        if (!user.endereco.trim()) return errorMessage("Preencha o endereço");
        if (!user.profissao.trim()) return errorMessage("Preencha a profissão");
        
        
        setStep(3);
      }
      
      else if (step === 3) {
        if (!user.tipoDocumento) return errorMessage("Selecione o tipo de documento");
        if (!user.documento.trim() || user.documento.length < 5) return errorMessage("Preencha um número de documento válido");
        handleRegister()
      }
    
    };
    

  const converterParaISO = (data) => {
    const partes = data.split("-");
    if (partes.length !== 3) return null;
    const [dia, mes, ano] = partes;
    setUser({ ...user, dataNascimento: `${ano}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}` });
  };

  const handleRegister = () => {
    if (editMode) {
      api.updateCustomer(idCliente, user)
        .then((response) => {
          console.log("User updated successfully", response.data);
          handleClose();
          if(!caseFlow) {
            location.reload();
          }
        })
        .catch((error) => {
          console.error("Error updating user", error);
        });
      return;
    }

    const payload = { ...user, idAdvogado };
    api.newCustomer(payload)
      .then((response) => {
        console.log("User registered successfully", response.data);
        handleClose();
        if(!caseFlow) {
          location.reload();
        }
      })
      .catch((error) => {
        console.error("Error registering user", error);
      });


  }
  return isOpen ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--bgTransparentDark)] bg-opacity-50">
      <div className="bg-[var(--color-light)] p-4 md:p-10 shadow-xl w-full md:w-[45%] h-full md:h-[80%] flex flex-col rounded-none md:rounded-[40px]">
        <div className="w-full flex justify-end ">
          <img src={CloseIcon} className="w-[5%] mb-6 cursor-pointer" onClick={handleClose} />
        </div>

        <Stepper currentStep={step} />

        <div className="w-full flex-1 overflow-y-auto">
          {step === 1 ? (
            <CustomerStep1 user={user} setUser={setUser} />
          ) : step === 2 ? (
            <CustomerStep2 user={user} setUser={setUser} />
          ) : (
            <CustomerStep3 user={user} setUser={setUser} />
          )}
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
    </div>
  ) : null

}
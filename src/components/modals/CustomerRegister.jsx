import api from "../../services/api";
import React, { useState } from "react";
import CloseIcon from "../../assets/icons/close.svg";
import { Stepper } from "../Stepper";
import { LgButton } from "../Buttons/LgButton";
import { CustomerStep1 } from "../Steps/CustomerStep1";
import { CustomerStep2 } from "../Steps/CustomerStep2";
import { CustomerStep3 } from "../Steps/CustomerStep3";


export function CustomerRegister({ isOpen, onClose }) {
  const [step, setStep] = useState(1);

  const [user, setUser] = useState({
    nome: "",
    documento: "",
    tipoDocumento: "",
    email: "",
    telefone: "",
    endereco: "",
    genero: "",
    dataNascimento: "",
    estadoCivil: "",
    profissao: "",
    passaporte: "",
    cnh: "",
    naturalidade: "",
    idAdvogado: 1
  });


  const handleNextStep = () => {
    console.log(user)
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {

      console.log("Final Step", user);
    }
  }

  const handleRegister = () => {
    api.newCustomer(user)
      .then((response) => {
        console.log("User registered successfully", response.data);
        onClose();
        location.reload();
      })
      .catch((error) => {
        console.error("Error registering user", error);
      });


  }
  return isOpen ? (
    <div className="absolute w-screen h-screen z-50 flex items-center justify-center bg-[var(--bgTransparentDark)] bg-opacity-50">
      <div className="bg-[var(--color-light)] p-10 rounded-[40px] shadow-xl  w-[45%] h-[80%] flex flex-col ">
        <div className="w-full flex justify-end ">
          <img src={CloseIcon} className="w-[5%] mb-6" onClick={onClose} />
        </div>

        <Stepper currentStep={step} />
        <div className="w-full h-[100%]  overflow-y-auto">
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
            <LgButton
              title="Voltar"
              click={() => setStep(step - 1)}
              type="alternative"
            />
          )}
          {step === 3 ? (
            <LgButton title="Cadastrar" click={handleRegister} />
          ) : (
            <LgButton title="Proximo" click={handleNextStep} />
          )}
        </div>
      </div>
    </div>
  ) : null;
}
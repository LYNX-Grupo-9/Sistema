import React, { useState } from "react";
import CloseIcon from "../../assets/icons/close.svg"
import { Stepper } from "../Stepper";
import { LgButton } from "../Buttons/LgButton"
import { CustomerStep1 } from "../Steps/CustomerStep1";
import { CustomerStep2 } from "../Steps/CustomerStep2";
import { CustomerStep3 } from "../Steps/CustomerStep3";
export function CustomerRegister({ isOpen, onClose }) {

  const [step, setStep] = useState(1)
  if (!isOpen) return null;

  return (
    <div className="absolute w-screen h-screen z-50 flex items-center justify-center bg-[var(--bgTransparentDark)] bg-opacity-50">
      <div className="bg-[var(--color-light)] p-10 rounded-[40px] shadow-xl  w-[45%] h-[80%] flex flex-col ">
        <div className="w-full flex justify-end ">
          <img src={CloseIcon} className="w-8 mb-6" onClick={onClose} />
        </div>

        <Stepper currentStep={step} />
        {
          step === 1 ? <CustomerStep1 /> : step === 2 ? <CustomerStep2 /> : <CustomerStep3/>
        }


        <div className="w-full flex justify-evenly">
          {
            step > 1 && (
              <LgButton title="Voltar" click={() => setStep(step - 1)} type="alternative" />
            )
          }
          {
            step === 3 ? <LgButton title="Cadastrar" /> : <LgButton title="Proximo" click={() => setStep(step + 1)} />
          }

        </div>

      </div>
    </div>
  );
}

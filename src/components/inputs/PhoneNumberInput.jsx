import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export function PhoneNumberInput(props) {
    return (
        <div className="flex flex-col items-center justify-center h-[14%] w-full gap-2">
            <span className="w-[65%] h-[30%] text-[16px] typography-semibold text-[var(--color-blueDark)]">
                {props.label}
            </span>

            <PhoneInput
                country={'br'}
                value={props.inputValue} // Vincula o valor ao estado do componente pai
                onChange={props.change} 
                inputStyle={{
                    height: '50px',
                    borderRadius: '10px',
                    border: '2px solid var(--color-blueLight)',
                    padding: '15px 60px',
                    backgroundColor: 'var(--color-light)',
                    fontSize: '16px',
                    color: 'var(--color-blueDark)',
                    width: '65.5%',
                    positionr: 'relative',
                    left: '17.5%',
                }}
                buttonStyle={{
                    backgroundColor: 'var(--color-light)',
                    border: '2px solid var(--color-blueLight)',
                    borderRadius: '10px',
                    left: '17.5%',
                }}
            />
        </div>
    );
}

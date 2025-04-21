import Select from "react-select";

export function SelectInput({ label, options, value, onChange, placeholder }) {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-2">
      <span className="w-[65%] h-[30%] text-[16px] typography-semibold text-[var(--color-blueDark)]">
        {label}
      </span>
      <div className="w-[65%]">
        <Select
          options={options}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          isSearchable
          className="react-select-container"
          classNamePrefix="react-select"
          styles={{
            control: (base) => ({
              ...base,
              height: 50,
              borderRadius: 10,
              borderColor: "var(--color-blueLight)",
              paddingLeft: 5,
              backgroundColor: "var(--color-light)",
              fontSize: 16,
              borderWidth: 2
            }),
            singleValue: (base) => ({
              ...base,
              color: "#013451",
            }),
          }}
        />
      </div>
    </div>
  );
}

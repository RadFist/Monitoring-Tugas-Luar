import PropTypes from "prop-types";
export default function InputComp({
  id,
  className,
  valueF,
  onChange,
  type = "text",
  placeholder,
  classlabel,
  labelText,
}) {
  return (
    <>
      <label htmlFor={id} className={classlabel}>
        {labelText}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={className}
        value={valueF}
        onChange={onChange}
        required
      />
    </>
  );
}

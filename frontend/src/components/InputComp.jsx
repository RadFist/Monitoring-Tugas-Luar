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
export function SelectedComp({
  id,
  className,
  valueF,
  onChange,
  classlabel,
  labelText,
  optionValue,
}) {
  return (
    <>
      <label htmlFor={id} className={classlabel}>
        {labelText}
      </label>
      <select
        id={id}
        className={className}
        value={valueF}
        onChange={onChange}
        required
      >
        {/* refactor */}
        <option value="">-- Pilih Level --</option>
        {optionValue
          .filter((item) => item.jabatan.toLowerCase() !== "super admin")
          .map((item) => (
            <option key={item.id_jabatan} value={item.id_jabatan}>
              {item.jabatan}
            </option>
          ))}
      </select>
    </>
  );
}

import PropTypes from "prop-types";
export default function ButtonComp({
  className = "",
  text = "button",
  onClick,
  disabled = false,
  children,
}) {
  return (
    <button onClick={onClick} className={className} disabled={disabled}>
      {children || text}
    </button>
  );
}

ButtonComp.prototype = {
  onClick: PropTypes.func,
};

import PropTypes from "prop-types";
const ButtonComp = ({
  className = "",
  text = "button",
  onClick,
  disabled = false,
  children,
}) => {
  return (
    <button onClick={onClick} className={className} disabled={disabled}>
      {children || text}
    </button>
  );
};

ButtonComp.prototype = {
  onClick: PropTypes.func,
};

export default ButtonComp;

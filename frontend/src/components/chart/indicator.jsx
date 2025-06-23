export const IndicatorDahboard = ({ text, data, children }) => {
  return (
    <div className="cardIndicator">
      {children || <span>icon</span>}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <span className="value-indicator">{data}</span>
        <span className="title-indicator">{text}</span>
      </div>
    </div>
  );
};

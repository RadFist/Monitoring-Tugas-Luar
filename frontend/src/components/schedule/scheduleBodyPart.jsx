const scheduleBodyPart = ({ title, data }) => {
  return (
    <div className="flex-column">
      <span style={{ fontSize: "larger", marginBottom: "5px" }}>{title}</span>
      <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
        {data.slice(0, 3).map((dataItem, index) => (
          <span style={{ margin: "0 10px" }} key={index}>
            {Array.isArray(dataItem) ? (
              dataItem.map((item, subIndex) => <div key={subIndex}>{item}</div>)
            ) : (
              <div>{dataItem}</div>
            )}
          </span>
        ))}
        {data.length > 3 && <span style={{ margin: "0 10px" }}>...</span>}
      </div>
    </div>
  );
};

export default scheduleBodyPart;

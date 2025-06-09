import { Typography } from "@mui/material";

export const HeaderSecond = ({ text = "Dashboard", children }) => {
  return (
    <div className="header-cont-second">
      <Typography variant="h6" className="header-title">
        {text}
      </Typography>
      <div className="header-second-actions">{children}</div>
    </div>
  );
};

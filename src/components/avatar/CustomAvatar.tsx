import {Avatar} from "@mui/material";
import theme from "../../Theme";

export default function CustomAvatar({ children }: { children?: React.ReactNode }) {
  return (
      <Avatar sx={{bgcolor: theme.palette.primary.main}}> {children}</Avatar>
  );
}
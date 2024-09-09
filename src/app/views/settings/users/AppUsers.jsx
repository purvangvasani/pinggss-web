import { styled } from "@mui/material";
import { Breadcrumb } from "app/components";

// STYLED COMPONENT
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

const AppUsers = () => {
  return (
    <Container>
      <div className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Settings", path: "/settings", redirect: false }, { name: "Users" }]}
        />
      </div>
      Users
    </Container>
  )
};

export default AppUsers;

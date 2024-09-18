import {
  Checkbox,
  FormControlLabel,
  Grid,
  styled
} from "@mui/material";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px"
}));

const AppUserForm = (props) => {
  const [state, setState] = useState({
    username: props?.edit && props.edit?.username || "",
    email: props?.edit && props.edit?.email || "",
    role: props?.edit && props.edit?.role || null,
    isActive: props?.edit && props.edit?.isActive || false,
    isDeletable: props?.edit && props.edit?.isDeletable || false
  });

  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== state.password) return false;

      return true;
    });
    return () => ValidatorForm.removeValidationRule("isPasswordMatch");
  }, [state.password]);

  const handleChange = (event) => {
    event.persist();
    if (event.target.name === 'isActive' || event.target.name === 'isDeletable') {
      setState({ ...state, [event.target.name]: event.target.checked });
      props.data({ ...state, [event.target.name]: event.target.checked })
    } else {
      setState({ ...state, [event.target.name]: event.target.value });
      props.data({ ...state, [event.target.name]: event.target.value })
    }
  };

  const {
    username,
    email,
    role,
    isActive,
    isDeletable
  } = state;

  return (
    <div>
      <ValidatorForm onError={() => null}>
        <Grid container spacing={6} >
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="username"
              id="standard-basic"
              value={username || ""}
              onChange={handleChange}
              errorMessages={["this field is required", "Min. 4 characters required.", "Max. 12 characters only."]}
              label="Username"
              validators={["required", "minStringLength: 4", "maxStringLength: 12"]}
            />

            <FormControlLabel
              control={<Checkbox label="Is Active"
                name="isActive"
                onChange={handleChange}
                checked={isActive} />}
              label="Is Active"
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="email"
              name="email"
              label="Email"
              value={email || ""}
              onChange={handleChange}
              validators={["required", "isEmail"]}
              errorMessages={["this field is required", "email is not valid"]}
            />

            <FormControlLabel
              control={<Checkbox label="Is Deletable"
                name="isDeletable"
                onChange={handleChange}
                checked={isDeletable} />}
              label="Is Deletable"
            />
          </Grid>
        </Grid>

      </ValidatorForm>
    </div>
  );
};

export default AppUserForm;

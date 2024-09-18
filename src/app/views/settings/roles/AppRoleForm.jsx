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

const AppRoleForm = (props) => {
    const [state, setState] = useState({
        role: props?.edit && props.edit?.role || null,
        roleLevel: props?.edit && props.edit?.roleLevel || null,
        isActive: props?.edit && props.edit?.isActive || false,
        isDeletable: props?.edit && props.edit?.isDeletable || false
    });

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
        role,
        roleLevel,
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
                            name="role"
                            id="standard-basic"
                            value={role || ""}
                            onChange={handleChange}
                            errorMessages={["this field is required"]}
                            label="Role"
                            validators={["required"]}
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
                            type="number"
                            name="roleLevel"
                            label="Role Level"
                            value={roleLevel || ""}
                            onChange={handleChange}
                            validators={["required", "isNumber"]}
                            errorMessages={["this field is required", "Only numericals are allowed."]}
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

export default AppRoleForm;

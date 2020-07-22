import * as React from "react";
import { useForm, NestedValue } from "./src";
import {
    createMuiTheme,
    ThemeProvider,
    TextField,
    FormControl,
    Select,
    MenuItem,
    FormHelperText,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import "./styles.css";

const theme = createMuiTheme({
    palette: {
        type: "dark",
    },
});

type Option = {
    label: string;
    value: string;
};

const options = [
    { label: "Chocolate", value: "chocolate" },
    { label: "Strawberry", value: "strawberry" },
    { label: "Vanilla", value: "vanilla" },
];

export default function App() {
    const { register, handleSubmit, watch, setValue, errors } = useForm<{
        autocomplete: NestedValue<Option[]>;
        select: NestedValue<number[]>;
    }>({
        defaultValues: { autocomplete: [], select: [] },
    });
    const select = watch("select");

    const onSubmit = handleSubmit((data) => alert(JSON.stringify(data, null)));

    React.useEffect(() => {
        register("autocomplete", {
            validate: (value) => value.length || "This is required.",
        });
        register("select", {
            validate: (value) => value.length || "This is required.",
        });
    }, [register]);

    return (
        <ThemeProvider theme={theme}>
            <h1>React Hook Form - NestedValue</h1>
            <form className="form" onSubmit={onSubmit}>
                <section>
                    <label>MUI Autocomplete</label>
                    <Autocomplete
                        multiple
                        options={options}
                        getOptionLabel={(option: Option) => option.label}
                        onChange={(e, options) => setValue("autocomplete", options)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                error={Boolean(errors?.autocomplete)}
                                helperText={errors?.autocomplete?.message}
                            />
                        )}
                    />
                </section>

                <section>
                    <label>MUI Select</label>
                    <FormControl>
                        <Select
                            multiple
                            value={select}
                            onChange={(e) => setValue("muiSelect", e.target.value as number[])}
                            error={Boolean(errors?.select)}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        <FormHelperText error={Boolean(errors?.select)}>{errors?.select?.message}</FormHelperText>
                    </FormControl>
                </section>

                <input type="submit" className="button" />
            </form>
        </ThemeProvider>
    );
}

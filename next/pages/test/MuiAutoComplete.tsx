import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Controller } from "react-hook-form";
import { Team } from "../../generated/graphql";

export default function CountrySelect({ control, options }: { control: any; options: Pick<Team, "name" | "_id">[] }) {
    return (
        <Controller
            as={
                <Autocomplete
                    options={options}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Choose a team" variant="outlined" />}
                />
            }
            onChange={([, data]) => data}
            name="team"
            control={control}
            defaultValue={options[0]}
        />
    );
}

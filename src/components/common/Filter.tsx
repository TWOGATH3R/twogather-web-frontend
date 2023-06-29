import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface infoType {
  filterList: any;
  setSort: any;
}
const Filter = ({ filterList, setSort }: infoType) => {
  const [targetFilter, setTargetFilter] = React.useState("");

  const filterOnChange = (event: SelectChangeEvent) => {
    setTargetFilter(event.target.value);
    setSort(event.target.value);
  };

  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-standard-label">filter</InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={targetFilter}
        onChange={filterOnChange}
        label="Age"
      >
        {filterList.map((value: any, index: number) => (
          <MenuItem value={value.sort} key={index}>
            {value.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Filter;

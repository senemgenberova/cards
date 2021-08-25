import { FormControlLabel, Checkbox } from "@material-ui/core";

export default function CheckBox({ onChange, value, label, ...rest }) {
  return (
    <FormControlLabel
      control={<Checkbox color="primary" value={value} {...rest} />}
      label={label}
    />
  );
}

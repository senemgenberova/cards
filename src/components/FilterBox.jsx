import React from "react";
import { Grid, TextField, FormGroup, Paper, Box } from "@material-ui/core";

const FilterBox = ({ filters }) => {
  return (
    <Box component={Paper} elevation={3} padding={2}>
      <Grid container spacing={5}>
        {filters.map(({ type, value, label, ...rest }, index) => {
          let Component;
          switch (type) {
            case "text":
              Component = (
                <TextField
                  value={value}
                  label={label}
                  fullWidth
                  onChange={operations.handleChange("cardID")}
                />
              );
              break;
            case "number":
              Component = (
                <TextField
                  type="number"
                  value={value}
                  label={label}
                  fullWidth
                  onChange={operations.handleChange("cardID")}
                />
              );
              break;
            case "checkbox":
              Component = (
                <FormGroup row>
                  {rest.data &&
                    Array.isArray(rest.data) &&
                    rest.data.map((item) => (
                      <CheckBox
                        key={curr}
                        onClick={operations.handleCurrencyChange}
                        value={curr}
                        label={curr}
                        checked={currencies.includes(curr)}
                      />
                    ))}
                </FormGroup>
              );
              break;
          }
        })}
        <Grid item md={2}>
          <TextField
            value={cardID}
            label="cardID"
            fullWidth
            onChange={operations.handleChange("cardID")}
          />
        </Grid>

        <Grid item md={2}>
          <TextField
            value={cardAccount}
            label="cardAccount"
            fullWidth
            onChange={operations.handleChange("cardAccount")}
          />
        </Grid>

        <Grid item container md={3} justifyContent="space-between">
          <TextField
            value={minAmount}
            label="Min amount"
            type="number"
            fullWidth
            onChange={operations.handleChange("minAmount")}
          />
          <TextField
            value={maxAmount}
            label="Max amount"
            type="number"
            fullWidth
            onChange={operations.handleChange("maxAmount")}
          />
        </Grid>

        <Grid item md={3}>
          <FormGroup row>
            {currencyListMock.map((curr) => (
              <CheckBox
                key={curr}
                onClick={operations.handleCurrencyChange}
                value={curr}
                label={curr}
                checked={currencies.includes(curr)}
              />
            ))}
          </FormGroup>
        </Grid>

        <Grid item md={2}>
          <TextField
            value={date}
            label="date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            onChange={operations.handleChange("date")}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FilterBox;

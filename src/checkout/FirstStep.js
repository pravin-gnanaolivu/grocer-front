import React from "react"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Box from "@material-ui/core/Box"

// Destructuring props
const FirstStep = ({ handleNext, handleChange, values: { firstName, address1, phone, city, state, country, isZip }, formErrors }) => {
  // Check if all values are not empty or if there are some error
  const isValid = firstName && firstName.length > 0 && !formErrors.firstName && address1 && address1.length > 0 && !formErrors.address1 && city && city.length > 0 && !formErrors.city && state && state.length > 0 && !formErrors.state && country && country.length > 0 && !formErrors.country && phone && phone.length > 0 && !formErrors.phone
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField required id="firstName" onChange={handleChange} value={firstName || ""} name="firstName" label="Name" fullWidth error={!!formErrors.firstName} helperText={formErrors.firstName} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Phone number" name="phone" placeholder="i.e: xxx-xxx-xxxx" value={phone || ""} onChange={handleChange} error={!!formErrors.phone} helperText={formErrors.phone} required />
        </Grid>
        <Grid item xs={12}>
          <TextField id="address1" onChange={handleChange} name="address1" value={address1 || ""} label="Address line 1" fullWidth autoComplete="shipping address-line1" error={!!formErrors.address1} helperText={formErrors.address1} required />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField required id="city" name="city" label="City" value={city || ""} fullWidth autoComplete="shipping address-level2" onChange={handleChange} error={!!formErrors.city} helperText={formErrors.city} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="state" name="state" label="State/Province/Region" value={state || ""} fullWidth onChange={handleChange} error={!!formErrors.state} helperText={formErrors.state} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required id="isZip" name="isZip" value={isZip || ""} label="Zip / Postal code" fullWidth autoComplete="shipping postal-code" onChange={handleChange} error={!!formErrors.isZip} helperText={formErrors.isZip} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required id="country" name="country" value={country || ""} label="Country" fullWidth autoComplete="shipping country" onChange={handleChange} error={!!formErrors.country} helperText={formErrors.country} />
        </Grid>
      </Grid>
      <div style={{ display: "flex", marginTop: 50, justifyContent: "flex-end" }}>
        <Button variant="contained" disabled={!isValid} color="primary" onClick={isValid ? handleNext : null}>
          Procced to payment
        </Button>
      </div>
    </Box>
  )
}

export default FirstStep

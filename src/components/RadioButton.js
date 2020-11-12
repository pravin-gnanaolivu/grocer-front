import React, { useEffect } from "react"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import ListItem from "@material-ui/core/ListItem"

export default function RadioButton({ price, handleFilters }) {
  const [value, setValue] = React.useState("")

  const handleChange = (event, range) => {
    handleFilters(range)
    setValue(event.target.value)
  }

  useEffect(() => {}, [])

  return price.map(price => {
    return (
      <ListItem key={price._id}>
        <RadioGroup aria-label={price.name} name={price.name} value={value} onChange={e => handleChange(e, price.array)}>
          <FormControlLabel value={price.name} control={<Radio style={{ color: "green" }} />} label={price.name} />
        </RadioGroup>
      </ListItem>
    )
  })
}

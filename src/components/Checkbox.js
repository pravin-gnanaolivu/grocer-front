import React, { useState } from "react"
import FormGroup from "@material-ui/core/FormGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import { withStyles } from "@material-ui/core/styles"
import { green } from "@material-ui/core/colors"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600]
    }
  }
})(props => <Checkbox color="default" {...props} />)
const Checkboxes = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([])

  const handleChange = (event, id) => {
    const currentId = checked.indexOf(id)
    const newCurrentId = [...checked]

    if (currentId === -1) {
      newCurrentId.push(id)
    } else {
      newCurrentId.splice(currentId, 1)
    }
    setChecked(newCurrentId)
    handleFilters(newCurrentId)
  }

  return categories.map(category => {
    return (
      <ListItem key={category._id}>
        <FormGroup>
          <FormControlLabel control={<GreenCheckbox onChange={e => handleChange(e, category._id)} name={category.name} />} label={category.name} />
        </FormGroup>
      </ListItem>
    )
  })
}

export default Checkboxes

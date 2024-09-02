import React from "react";
import { Button } from "react-bootstrap";

const GoalButton = (props) => {

    const {name, handleClick} = props

    return (
<div>
<Button
onClick={handleClick}
name={name}
>
    {name}
</Button>
</div>

    )
}

export default GoalButton
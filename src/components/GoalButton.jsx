import React from "react";
import { Button } from "react-bootstrap";

const GoalButton = (props) => {

    const {name} = props

    return (
<div>
<Button>
    {name}
</Button>
</div>

    )
}

export default GoalButton
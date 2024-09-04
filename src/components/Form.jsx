import React from "react";

export const Form = (props) => {

    

    return (
        <form id="goalForm" 
        //onSubmit={onNewQuote}
        >
      <h3>New Goal Form</h3>
      <label><span>Goal Name:</span>
        <input
          type='text'
          name='goalName'
          placeholder='type goal name'
          //onChange={onChange}
          //value={state.values.authorName}
        />
      </label>
      <label><span>Tasks:</span>
        <textarea
          type='text'
          name='quoteText'
          placeholder='type quote'
          //onChange={onChange}
          //value={state.values.quoteText}
        />
      </label>
      <label><span>Create Goal:</span>
        <button
          // eslint-disable-next-line jsx-a11y/aria-role
          role='submit'
        >Create Goal</button>
      </label>
    </form>
    )
}


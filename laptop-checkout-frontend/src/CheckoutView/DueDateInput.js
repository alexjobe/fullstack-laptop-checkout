import React from 'react';

const DueDateInput = ({dueDate, handleChange, handleFocus, handleBlur, hasFocus}) => (
  <input 
    name='dueDate'
    type={hasFocus? 'date' : 'text'}
    value={dueDate}
    onChange={handleChange}
    placeholder='Due Date'
    onFocus = {handleFocus}
    onBlur= {handleBlur}
  />
)

export default DueDateInput;
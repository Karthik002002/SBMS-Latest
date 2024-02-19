import { useState } from 'react';

const useDatePicker = initialState => {
  const [open, setOpen] = useState(initialState);

  const handleToggle = () => {
    setOpen(!open);
  };

  return [open, handleToggle];
};

export default useDatePicker;

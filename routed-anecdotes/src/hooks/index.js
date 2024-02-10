import { useState } from "react";

export const useField = () => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onChangeReset = () => {
    setValue("");
  };

  return {
    value,
    onChange,
    onChangeReset,
  };
};

import { memo } from "react";
import { useSelector } from "react-redux";
import { getCounterValue } from "../models/selectors/getCounterValue/getCounterValue";

function Counter() {
  const value = useSelector(getCounterValue);

  return (
    <div>
      <h1>Value: {value}</h1>
    </div>
  );
}

export default memo(Counter);

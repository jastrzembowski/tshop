import { FormControlLabel, Checkbox } from "@mui/material";
import { useAppDispatch } from "../../api/configureStore";
import { setProductParams } from "../../api/catalogSlice";
import { useState } from "react";

export default function AppCheckbox() {
  const [promoChecked, setPromoChecked] = useState(false);
  const [activeChecked, setActiveChecked] = useState(false);

  const dispatch = useAppDispatch();

  const handlePromoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPromoChecked(event.target.checked);
    dispatch(setProductParams({ promo: event.target.checked }));
  };

  const handleActiveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setActiveChecked(event.target.checked);
    dispatch(setProductParams({ active: event.target.checked }));
  };
  return (
    <>
      <FormControlLabel
        control={
          <Checkbox checked={activeChecked} onChange={handleActiveChange} />
        }
        label="Active"
      />
      <FormControlLabel
        control={
          <Checkbox checked={promoChecked} onChange={handlePromoChange} />
        }
        label="Promo"
      />
    </>
  );
}

import { useAppDispatch } from "../../../api/configureStore";
import { setProductParams } from "../../../api/catalogSlice";
import { useState } from "react";
import "./checkbox.scss";


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
      <label className="checkbox-container">
        <input
          type="checkbox"
          checked={activeChecked}
          onChange={handleActiveChange}
        />
        <span className="checkmark"></span>
        Active
      </label>
      <label className="checkbox-container">
        <input
          type="checkbox"
          checked={promoChecked}
          onChange={handlePromoChange}
        />
        <span className="checkmark"></span>
        Promo
      </label>
    </>
  );
}

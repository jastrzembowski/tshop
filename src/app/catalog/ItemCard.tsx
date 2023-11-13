import { useState } from "react";
import { Item } from "../../models/item";
import Dialog from "@mui/material/Dialog";
import { Backdrop, Rating } from "@mui/material";
import close from "../../assets/close.svg";

interface Props {
  product: Item;
}

export default function ItemCard({ product }: Props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="item-card">
        {product.promo && <h2>Promo</h2>}
        <img src={product.image} alt={product.name}></img>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <Rating
          name="read-only"
          value={product.rating}
          readOnly
          sx={{
            paddingLeft: "16px",
            fontSize:"16px",
            position: "absolute",
            bottom:"78px",
            "& .MuiRating-icon": {
              width: '22px'
          }
          }}
        />
        <button
          onClick={handleClickOpen}
          disabled={!product.active}
          className={product.active ? "" : "btn-disabled"}
        >
          Show details
        </button>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: { borderRadius: "8px" } }}
        slots={{
          backdrop: (props) => (
            <Backdrop
              {...props}
              style={{ backgroundColor: "rgba(26, 27, 29, 0.9)" }}
            />
          ),
        }}
      >
        <div className="item-info">
          <img src={close} className="close" alt="close but" onClick={handleClose}/>
          <img src={product.image} alt={product.name}></img>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
        </div>
      </Dialog>
    </>
  );
}

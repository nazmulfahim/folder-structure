import React from "react";
import style from "./styles/modal.module.css";

const Modal = ({ folder, img, alt, ModalContent, action, actionName }) => {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(false);

  const toggleModal = () => setOpen((v) => !v);
  const onActionClick = async () => {
    let res = await action();
    if (res.data) {
      setOpen(false);
      return;
    }
    setError(res.errors[0].message);
  };
  return (
    <>
      <div id={folder._id} onClick={toggleModal}>
        <img src={img} alt={alt} />
      </div>
      <div
        id={folder._id}
        className={`${style.modal} ${open && style.openModal}`}
      >
        <div className={style.modalContent}>
          <span className={style.close} onClick={toggleModal}>
            &times;
          </span>
          <p className={style.error}>{error && `Error: ${error}`}</p>
          {ModalContent}
          <button onClick={onActionClick} className={style.actionButton}>
            {actionName}
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;

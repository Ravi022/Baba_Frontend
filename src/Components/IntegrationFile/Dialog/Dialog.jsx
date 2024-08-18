import React, { useState, useEffect } from "react";

const Dialog = ({ open: openProp, message, onClose }) => {
  const [open, setOpen] = useState(openProp);

  useEffect(() => {
    setOpen(openProp);
  }, [openProp]);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleDialogClick = (e) => {
    e.stopPropagation();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex flex-row justify-center items-center bg-opacity-50  bg-black backdrop-blur-xs">
      <div className="w-[400px]  rounded-xl p-5 z-10" onClick={handleClose}>
        <div
          className="p-4 rounded-lg shadow-md text-center bg-[#f2f3f5]"
          onClick={handleDialogClick}
        >
          <p className="p-3">
            <span className="text-wrap font-semibold text-black">
              {message}
            </span>
          </p>
          <button
            className="mt-4 px-7 py-2 bg-orange-500 text-white rounded-3xl hover:bg-orange-700 transition duration-300 ease-in-out "
            onClick={handleClose}
          >
            <span className="text-center">Close</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;

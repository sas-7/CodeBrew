import { toast } from "react-toastify";

const msgg = (msg) => {
    toast.success(msg || `Something went wrong! Please try again.`,{
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
};

export  {msgg};
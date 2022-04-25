import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function success(msg, autoClose = 1500) {
  toast.success(msg, {
    autoClose: autoClose,
    position: toast.POSITION.TOP_CENTER,
  });
}

function fail(msg, autoClose = 1500) {
  toast.fail(msg, {
    autoClose: autoClose,
    position: toast.POSITION.TOP_CENTER,
  });
}
function info(msg, autoClose = 1500) {
  toast.info(msg, {
    autoClose: autoClose,
    position: toast.POSITION.TOP_CENTER,
  });
}
export { success,fail,info };

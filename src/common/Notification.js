import { notification } from "antd";

/**
 *
 * @param {*} type Kiểu thông báo: gồm success, infor, warning và error
 * @param {*} description Nội dung của thông báo
 */
const Notification = (type, description) => {
  let message = "";
  // eslint-disable-next-line default-case
  switch (type) {
    case "success": {
      message = "Thành công";
      break;
    }
    case "info": {
      message = "Thông tin";
      break;
    }
    case "warning": {
      message = "Cảnh báo";
      break;
    }
    default: {
      message = "Lỗi!";
      break;
    }
  }

  notification[type ? type : "error"]({
    message: message,
    description: description,
    placement: "bottomRight",
    duration: 2,
  });
};

export { Notification };

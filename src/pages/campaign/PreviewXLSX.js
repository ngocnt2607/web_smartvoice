import React, { useEffect, useState } from "react";
import { Table, Modal, Button } from "antd";

export default function PreviewXLSX(data) {
  const [visible, setVisible] = useState(false);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (data) {
      setTableData(data);
    }
  }, [data]);

  const closeModal = () => {
    setVisible(false);
  };

  const openModal = () => {
    setVisible(true);
  };

  const columns = [
    {
      key: "stt",
      dataIndex: "stt",
      title: "STT",
    },
    {
      key: "sdt",
      dataIndex: "sdt",
      title: "Số điện thoại",
    },
  ];

  return (
    <>
      <Button onClick={() => openModal()} type="link">
        Preview
      </Button>
      <Modal
        visible={visible}
        footer={<Button onClick={() => closeModal()}>Đóng</Button>}
      >
        <Table columns={columns} dataIndex={tableData} />
      </Modal>
    </>
  );
}

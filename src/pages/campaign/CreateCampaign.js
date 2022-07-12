import { PlusCircleOutlined } from "@ant-design/icons";
import {
  Button, Form,
  Input, message, Modal,
  Spin
} from "antd";
import React, { useEffect, useState } from "react";
import SpamAPI from "../../api/campaign.api";
import validateMessages from "../../common/ValidateForm";

export default function CreateSpamHotline() {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState([])
  const [audio, setAudio] = useState(null)

  useEffect(() => {
    // (async () => {
    //   try {
    //     const response = await CustomerCareService.getAllPackages();
    //     if (response.status === 200) {
    //       setPackageOptions(response.data);
    //     } else {
    //       message.error("Không có danh sách packages!");
    //     }
    //   } catch (error) {
    //     message.error("Có lỗi xảy ra!");
    //   }
    // })();
  }, []);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const onSubmit = async (values) => {
    try {
      const {name, hotline, description} = values;
      setSpinning(true);
      const data = {
        name,
        hotline,
        mota: description,
      }
      const response = await SpamAPI.createSpamHotline(data)
      setSpinning(false)

      if(response.status === 200) {
        message.success(response.data.message)
        form.resetFields()
        setVisible(false);
        return
      }
      
      message.error(response.data.message)
      setSpinning(false)
    } catch (error) {
      setSpinning(false)
    }

    


    // try {
    //   const foundPackage = packageOptions.find(
    //     (element) => element.package_id === values.package_type
    //   );
    //   const body = {
    //     enterprise_number: values.enterprise_number,
    //     date: values.date.format("YYYY-MM-DD HH:mm:ss"),
    //     duration: foundPackage.duration,
    //   };
    //   const response = await CustomerCareService.registerKhaiBao(body);
    //   if (response.status === 200) {
    //     message.success("Đăng ký thành công.");
    //     form.resetFields();
    //     setSpinning(false);
    //     setVisible(false);
    //   }
    // } catch (error) {
    //   message.error("Đã có lỗi xảy ra!");
    //   setSpinning(false);
    // }
  };

  const onShowModal = () => {
    setVisible(true);
  };

  const onHideModal = () => {
    form.resetFields()
    setVisible(false);
  };

  return (
    <>
      <Button
        icon={<PlusCircleOutlined />}
        type="primary"
        style={{ marginLeft: 5, width: 150 }}
        onClick={() => onShowModal()}
      >
        Add Spam
      </Button>

      <Modal
        title="Tạo campagin"
        visible={visible}
        onCancel={onHideModal}
        footer={
          <>
            <Button form="registerForm" htmlType="submit" type="primary" disabled={spinning}>
              Add Hotline Spam
            </Button>
            <Button onClick={() => onHideModal()} type="primary" danger>
              Hủy
            </Button>
          </>
        }
      >
        <Spin spinning={spinning}>
          <Form
            onFinish={onSubmit}
            form={form}
            {...layout}
            validateMessages={validateMessages}
            id="registerForm"
          >
            <Form.Item
              label="Tên khách hàng"
              rules={[
                {
                  required: true,
                  whitespace: true,
                },
              ]}
              name="name"
            >
              <Input placeholder="Vui lòng nhập tên campaign" />
            </Form.Item>
            {/* <audio src={audio} controls>
              <p>Fallback content goes here.</p>
            </audio> */}
            <Form.Item
              label="Hotline"
              rules={[
                {
                  required: true,
                  whitespace: true,
                },
              ]}
              name='hotline'
            >
              <Input placeholder="Vui lòng nhập số Hotline" />
            </Form.Item>

            <Form.Item
              label="Mô tả"
              rules={[
                {
                  required: true,
                  whitespace: true,
                },
              ]}
              name='description'
            >
              <Input placeholder="Vui lòng nhập mô tả" />
            </Form.Item>
            
          </Form>
        </Spin>
      </Modal>
      
    </>
  );
}

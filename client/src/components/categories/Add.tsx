import { Button, Form, Input, Modal, message } from "antd";
import React from "react";

type Category = {
  _id: string;
  title: string;
};

type CategoryValues = {
  title: string;
};

type AddProps = {
  isAddModalOpen: boolean;
  setIsAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
};

const Add: React.FC<AddProps> = ({
  isAddModalOpen,
  setIsAddModalOpen,
  categories,
  setCategories,
}) => {
  const [form] = Form.useForm();

  const onFinish = async (values: CategoryValues) => {
    try {
      await fetch(
        import.meta.env.VITE_APP_SERVER_URL + "/api/categories/add-category",
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }
      );
      message.success("Kategori başarılı bir şekilde eklendi!");
      form.resetFields();
      setCategories([
        ...categories,
        {
          _id: Math.random().toString(),
          title: values.title,
        },
      ]);
    } catch (error) {
      console.error(error);
      message.error("Kategori eklenirken bir hata oluştu.");
    }
  };

  return (
    <Modal
      title="Yeni Kategori Ekle"
      open={isAddModalOpen}
      onCancel={() => setIsAddModalOpen(false)}
      footer={null}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          name="title"
          label="Kategori Ekle"
          rules={[
            {
              required: true,
              message: "Kategori Alanı Boş Bırakılamaz!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item className="flex justify-end mb-0">
          <Button type="primary" htmlType="submit">
            Oluştur
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Add;

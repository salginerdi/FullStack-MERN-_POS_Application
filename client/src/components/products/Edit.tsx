import { Button, Form, Input, message, Modal, Select, Table } from "antd";
import React, { useEffect, useState } from "react";

type Product = {
  _id: number;
  title: string;
  img: string;
  price: number;
  category: string;
};

type Category = {
  _id: number;
  title: string;
  value: string;
};

const Edit: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<Product>>({});
  const [form] = Form.useForm();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(
          import.meta.env.VITE_APP_SERVER_URL + "/api/products/get-all"
        );
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch(
          import.meta.env.VITE_APP_SERVER_URL + "/api/categories/get-all"
        );
        const data = await res.json();
        data &&
          setCategories(
            data.map((item: Category) => ({ ...item, value: item.title }))
          );
      } catch (error) {
        console.log(error);
      }
    };

    getCategories();
  }, []);

  const onFinish = async (values: Product) => {
    try {
      await fetch(
        import.meta.env.VITE_APP_SERVER_URL + "/api/products/update-product",
        {
          method: "PUT",
          body: JSON.stringify({ ...values, productId: editingItem._id }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );
      message.success("Ürün başarıyla güncellendi.");
      setProducts(
        products.map((item) =>
          item._id === editingItem._id
            ? { ...values, _id: editingItem._id }
            : item
        )
      );
    } catch (error) {
      message.error("Bir şeyler yanlış gitti.");
      console.log(error);
    }
  };

  const deleteProduct = async (id: number) => {
    if (window.confirm("Silmek istediğinize emin misiniz?")) {
      try {
        await fetch(
          import.meta.env.VITE_APP_SERVER_URL + "/api/products/delete-product",
          {
            method: "DELETE",
            body: JSON.stringify({ productId: id }),
            headers: { "Content-type": "application/json; charset=UTF-8" },
          }
        );
        message.success("Ürün başarıyla silindi.");
        setProducts(products.filter((item) => item._id !== id));
      } catch (error) {
        message.error("Bir şeyler yanlış gitti.");
        console.log(error);
      }
    }
  };

  const columns = [
    {
      title: "Ürün Adı",
      dataIndex: "title",
      width: "8%",
      render: (_: unknown, record: Product) => <p>{record.title}</p>,
    },
    {
      title: "Ürün Görseli",
      dataIndex: "img",
      width: "4%",
      render: (_: unknown, record: Product) => (
        <img src={record.img} alt="" className="w-full h-20 object-cover" />
      ),
    },
    {
      title: "Ürün Fiyatı",
      dataIndex: "price",
      width: "8%",
    },
    {
      title: "Kategori",
      dataIndex: "category",
      width: "8%",
    },
    {
      title: "İşlemler",
      dataIndex: "action",
      width: "8%",
      render: (_: unknown, record: Product) => (
        <div>
          <Button
            type="link"
            className="pl-0"
            onClick={() => {
              setIsEditModalOpen(true);
              setEditingItem(record);
            }}
          >
            Düzenle
          </Button>
          <Button type="link" danger onClick={() => deleteProduct(record._id)}>
            Sil
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        bordered
        dataSource={products}
        columns={columns}
        rowKey={"_id"}
        scroll={{ x: 1000, y: 600 }}
      />
      <Modal
        title="Yeni Ürün Ekle"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={false}
      >
        <Form
          layout="vertical"
          onFinish={onFinish}
          form={form}
          initialValues={editingItem}
        >
          <Form.Item
            name="title"
            label="Ürün Adı"
            rules={[
              { required: true, message: "Ürün Adı Alanı Boş Bırakılamaz!" },
            ]}
          >
            <Input placeholder="Ürün adı giriniz." />
          </Form.Item>
          <Form.Item
            name="img"
            label="Ürün Görseli"
            rules={[
              {
                required: true,
                message: "Ürün Görseli Alanı Boş Bırakılamaz!",
              },
            ]}
          >
            <Input placeholder="Ürün görseli giriniz." />
          </Form.Item>
          <Form.Item
            name="price"
            label="Ürün Fiyatı"
            rules={[
              { required: true, message: "Ürün Fiyatı Alanı Boş Bırakılamaz!" },
            ]}
          >
            <Input placeholder="Ürün fiyatı giriniz." />
          </Form.Item>
          <Form.Item
            name="category"
            label="Kategori Seç"
            rules={[
              { required: true, message: "Kategori Alanı Boş Bırakılamaz!" },
            ]}
          >
            <Select
              showSearch
              placeholder="Bir kategori seçiniz."
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.title ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.title ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.title ?? "").toLowerCase())
              }
              options={categories}
            />
          </Form.Item>
          <Form.Item className="flex justify-end mb-0">
            <Button type="primary" htmlType="submit">
              Güncelle
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Edit;

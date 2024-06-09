import { Button, Form, Input, message, Modal, Select, Table, Space } from "antd";
import { useRef, useEffect, useState } from "react";
import {
  SearchOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const Edit = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState({});
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [form] = Form.useForm();

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Ara
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Sıfırla
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filtrele
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Kapat
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

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
          setCategories(data.map((item) => ({ ...item, value: item.title })));
      } catch (error) {
        console.log(error);
      }
    };

    getCategories();
  }, []);

  const onFinish = async (values) => {
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
      setIsEditModalOpen(false);
      form.resetFields();
    } catch (error) {
      message.error("Bir şeyler yanlış gitti.");
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
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
      render: (_, record) => <p>{record.title}</p>,
      ...getColumnSearchProps("title")
    },
    {
      title: "Ürün Görseli",
      dataIndex: "img",
      width: "4%",
      render: (_, record) => (
        <img src={record.img} alt="" className="w-full h-20 object-cover" />
      ),
    },
    {
      title: "Ürün Fiyatı",
      dataIndex: "price",
      width: "8%",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Kategori",
      dataIndex: "category",
      width: "8%",
      ...getColumnSearchProps("category")
    },
    {
      title: "İşlemler",
      dataIndex: "action",
      width: "8%",
      render: (_, record) => (
        <div>
          <Button
            type="link"
            className="pl-0"
            onClick={() => {
              setIsEditModalOpen(true);
              setEditingItem(record);
              form.setFieldsValue(record);
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
        onCancel={() => {
          setIsEditModalOpen(false);
          form.resetFields();
        }}
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

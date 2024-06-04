import { Button, Card, Form, Input, Modal, Select, message } from "antd";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";


const CreateBill = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (
    values
  ) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_APP_SERVER_URL + "/api/bills/add-bill",
        {
          method: "POST",
          body: JSON.stringify({
            ...values,
            cardItems: cart.cartItems,
            subTotal: cart.total,
            tax: ((cart.total * cart.tax) / 100).toFixed(2),
            totalAmount: (cart.total + (cart.total * cart.tax) / 100).toFixed(
              2
            ),
          }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );

      if (res.status === 200) {
        message.success("Fatura başarılı bir şekilde oluşturuldu.");
        dispatch(reset());
        navigate("/bills");
      }
    } catch (error) {
      message.error("Bir şeyler yanlış gitti.");
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        title="Fatura Oluştur"
        open={isModalOpen}
        footer={false}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Müşteri Adı"
            name="customerName"
            rules={[
              { required: true, message: "Müşteri Adı Girmek Zorunludur" },
            ]}
          >
            <Input placeholder="Bir Müşteri Adı Yazınız" />
          </Form.Item>
          <Form.Item
            label="Telefon Numarası"
            name="customerPhoneNumber"
            rules={[
              { required: true, message: "Telefon Numarası Girmek Zorunludur" },
            ]}
          >
            <Input placeholder="Bir Telefon Numarası Yazınız" maxLength={11} />
          </Form.Item>
          <Form.Item
            label="Ödeme Yöntemi"
            name="paymentMode"
            rules={[
              { required: true, message: "Ödeme Yöntemi Seçmek Zorunludur" },
            ]}
          >
            <Select placeholder="Ödeme Yöntemi Seçiniz">
              <Select.Option value="Nakit">Nakit</Select.Option>
              <Select.Option value="Kredi Kartı">Kredi Kartı</Select.Option>
            </Select>
          </Form.Item>
          <Card>
            <div className="flex justify-between">
              <span>Ara Toplam</span>
              <span>{cart.total > 0 ? cart.total.toFixed(2) : 0}₺</span>
            </div>
            <div className="flex justify-between my-2">
              <span>KDV %{cart.tax}</span>
              <span className="text-red-600">
                {(cart.total * cart.tax) / 100 > 0
                  ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                  : 0}
                ₺
              </span>
            </div>
            <div className="flex justify-between">
              <b>Genel Toplam</b>
              <b>
                {cart.total + (cart.total * cart.tax) / 100 > 0
                  ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                  : 0}
                ₺
              </b>
            </div>
            <div className="flex justify-end">
              <Button
                className="mt-4"
                type="primary"
                htmlType="submit"
                disabled={cart.cartItems.length === 0}
              >
                Fatura Oluştur
              </Button>
            </div>
          </Card>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateBill;

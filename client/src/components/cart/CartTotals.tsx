import React from "react";
import {
  ClearOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { decrease, deleteCart, increase, reset } from "../../redux/cartSlice";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

const CartTotals: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="cart h-full max-h-[calc(100vh_-_90px)] flex flex-col">
      <h2 className="bg-blue-600 text-center py-4 text-white font-bold tracking-wide electrolize-regular">
        Sepetteki Ürünler
      </h2>
      <ul className="cart-items px-2 flex flex-col gap-y-3 py-2 overflow-y-auto ">
        {cart.cartItems.length > 0 ? (
          cart.cartItems
            .map((item) => (
              <li className="cart-item flex justify-between" key={item._id}>
                <div className="flex items-center">
                  <img
                    src={item.img}
                    alt=""
                    className="w-16 h-16 object-cover cursor-pointer"
                    onClick={() => {
                      dispatch(deleteCart(item));
                      message.success("Ürün sepetten silindi.");
                    }}
                  />
                  <div className="flex flex-col ml-2">
                    <b>{item.title}</b>
                    <span className="electrolize-regular">
                      {item.price}₺ x {item.quantity}
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  <Button
                    type="primary"
                    size="small"
                    className="w-full flex items-center justify-center !rounded-full"
                    icon={<PlusCircleOutlined />}
                    onClick={() => dispatch(increase({ _id: item._id }))}
                  />
                  <span className="font-bold w-6 inline-block text-center">
                    {item.quantity}
                  </span>
                  <Button
                    type="primary"
                    size="small"
                    className="w-full flex items-center justify-center !rounded-full"
                    icon={<MinusCircleOutlined />}
                    onClick={() => {
                      if (item.quantity === 1) {
                        if (
                          window.confirm(
                            "Ürünü silmek istediğinizden emin misiniz?"
                          )
                        ) {
                          dispatch(decrease({ _id: item._id }));
                          message.success("Ürün sepetten silindi.");
                        }
                      }
                      if (item.quantity > 1) {
                        dispatch(decrease({ _id: item._id }));
                      }
                    }}
                  />
                </div>
              </li>
            ))
            .reverse()
        ) : (
          <span className="electrolize-regular">
            Sepette hiç ürün bulunmamaktadır...
          </span>
        )}
      </ul>
      <div className="cart-totals mt-auto">
        <div className="border-t border-b">
          <div className="flex justify-between p-2">
            <b>Ara Toplam</b>
            <span className="electrolize-regular">
              {cart.total > 0 ? cart.total.toFixed(2) : 0}₺
            </span>
          </div>
          <div className="flex justify-between p-2">
            <b>KDV %{cart.tax}</b>
            <span className="electrolize-regular text-red-700">
              {(cart.total * cart.tax) / 100 > 0
                ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                : 0}
              ₺
            </span>
          </div>
        </div>
        <div className="border-b mt-4">
          <div className="flex justify-between p-2">
            <b className="text-xl text-green-500">Genel Toplam</b>
            <span className="electrolize-regular text-xl">
              {cart.total + (cart.total * cart.tax) / 100 > 0
                ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                : 0}
              ₺
            </span>
          </div>
        </div>
        <div className="py-4 px-2">
          <Button
            type="primary"
            size="large"
            className="w-full"
            disabled={cart.cartItems.length === 0}
            onClick={() => navigate("/cart")}
          >
            Sipariş Oluştur
          </Button>
          <Button
            type="primary"
            danger
            size="large"
            className="w-full mt-2"
            icon={<ClearOutlined />}
            disabled={cart.cartItems.length === 0}
            onClick={() => {
              if (
                window.confirm("Sepeti temizlemek istediğinize emin misiniz?")
              ) {
                dispatch(reset());
                message.success("Sepet başarılı bir şekilde temizlendi.");
              }
            }}
          >
            Temizle
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartTotals;

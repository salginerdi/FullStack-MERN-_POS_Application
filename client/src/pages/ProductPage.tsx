import React from "react";
import Header from "../components/header/Header";
import Edit from "../components/products/Edit";

const ProductPage: React.FC = () => {
  return (
    <>
      <Header />
      <div className="px-6">
        <h1 className="text-4xl text-center mb-4 electrolize-regular">
          Ürünler
        </h1>
        <Edit/>
      </div>
    </>
  );
};

export default ProductPage;
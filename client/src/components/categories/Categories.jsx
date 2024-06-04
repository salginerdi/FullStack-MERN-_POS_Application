import React, { useEffect, useState } from "react";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import Add from "./Add";
import Edit from "./Edit";
import "./style.css";


const Categories = ({
  categories,
  setCategories,
  setFiltered,
  products
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState("Tümü")

  useEffect(() => {
    if(categoryTitle === "Tümü"){
      setFiltered(products)
    }else{
      setFiltered(products.filter((item)=>item.category === categoryTitle))
    }
  },[products, setFiltered, categoryTitle])

  return (
    <ul className="flex flex-row md:flex-col gap-4 text-lg electrolize-regular">
      {categories.map((item) => (
        <li key={item._id} className={`category-item ${item.title === categoryTitle && "bg-pink-700"}`} onClick={()=> setCategoryTitle(item.title)}>
          <span>{item.title}</span>
        </li>
      ))}

      <li
        className="category-item !bg-purple-800 hover:opacity-90"
        onClick={() => setIsAddModalOpen(true)}
      >
        <PlusOutlined className="md:text-2xl" />
      </li>

      <li
        className="category-item !bg-orange-800 hover:opacity-90"
        onClick={() => setIsEditModalOpen(true)}
      >
        <EditOutlined className="md:text-2xl" />
      </li>

      <Add
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        categories={categories}
        setCategories={setCategories}
      />
      <Edit
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        categories={categories}
        setCategories={setCategories}
      />
    </ul>
  );
};

export default Categories;

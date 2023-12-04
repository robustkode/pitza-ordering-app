"use client";
import DeleteButton from "@/components/layout/DeleteButton";
import UserTabs from "@/components/layout/UserTabs";
import { useEffect, useState } from "react";
import { useProfile } from "@/useProfile";
import toast from "react-hot-toast";
import { SlPencil } from "react-icons/sl";
import { RiDeleteBin5Line } from "react-icons/ri";
import Image from "next/image";

export default function CategoriesPage() {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const { loading: profileLoading, data: profileData } = useProfile();
  const [editedCategory, setEditedCategory] = useState(null);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
        setCategoriesLoading(false);
      });
    });
  }

  async function handleCategorySubmit(ev) {
    ev.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: categoryName };
      if (editedCategory) {
        data._id = editedCategory._id;
      }
      const response = await fetch("/api/categories", {
        method: editedCategory ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setCategoryName("");
      fetchCategories();
      setEditedCategory(null);
      if (response.ok) resolve();
      else reject();
    });
    await toast.promise(creationPromise, {
      loading: editedCategory
        ? "Updating a category..."
        : "Creating new category...",
      success: editedCategory ? "Category updated" : "Category created",
      error: "Error, sorry...",
    });
  }

  async function handleDeleteClick(_id) {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/categories?_id=" + _id, {
        method: "DELETE",
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(promise, {
      loading: "Deleting...",
      success: "Deleted",
      error: "Error",
    });

    fetchCategories();
  }

  return (
    <section className="mt-8 max-w-3xl mx-auto">
      {profileLoading || categoriesLoading ? (
        <Image
          className="mx-auto my-32"
          src={"/loading.gif"}
          width={100}
          height={100}
          alt="loading"
        />
      ) : !profileData.admin ? (
        <h1 className=" mx-auto my-32 text-red text-2xl">
          You&apos;re not an admin!
        </h1>
      ) : (
        <>
          <form className="mt-8" onSubmit={handleCategorySubmit}>
            <div className="flex gap-2 justify-between">
              <div className="w-full">
                <label>
                  {editedCategory ? "Update" : "Create new"}
                  {editedCategory && (
                    <>
                      : <b>{editedCategory.name}</b>
                    </>
                  )}
                </label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(ev) => setCategoryName(ev.target.value)}
                  className="grow"
                />
              </div>
              <div className="pb-2 flex gap-2">
                <button className="border border-primary" type="submit">
                  {editedCategory ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditedCategory(null);
                    setCategoryName("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
          <div>
            <h2 className="mt-8 text-sm text-gray-500">Edit category</h2>
            {categories?.length > 0 &&
              categories.map((c) => (
                <div
                  key={c._id}
                  className="bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center"
                >
                  <div className="grow">{c.name}</div>
                  <div className="flex gap-2">
                    <button
                      className=""
                      type="button"
                      onClick={() => {
                        setEditedCategory(c);
                        setCategoryName(c.name);
                      }}
                    >
                      <SlPencil size={26} />
                    </button>
                    <div className="text-primary">
                      <DeleteButton
                        label={<RiDeleteBin5Line size={32} color="#8b2323" />}
                        onDelete={() => handleDeleteClick(c._id)}
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </section>
  );
}

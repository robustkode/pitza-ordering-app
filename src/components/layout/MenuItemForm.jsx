import EditableImage from "@/components/layout/EditableImage";
import MenuItemPriceProps from "@/components/layout/MenuItemPriceProps";
import { useEffect, useState } from "react";

export default function MenuItemForm({ onSubmit, menuItem, placeHolder }) {
  const [image, setImage] = useState(menuItem?.image || "");
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [category, setCategory] = useState(menuItem?.category || "");
  const [categories, setCategories] = useState([]);
  const [extraIngredientPrices, setExtraIngredientPrices] = useState(
    menuItem?.extraIngredientPrices || []
  );

  useEffect(() => {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
        if (!category) {
          setCategory(categories[0]._id);
        }
      });
    });
  }, []);

  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();

        if (typeof +basePrice !== "number" || +basePrice === 0) {
          return;
        }

        const filteredSizes = sizes.filter((s) => s.price !== 0);

        onSubmit(ev, {
          image,
          name,
          description,
          basePrice,
          sizes: filteredSizes,
          extraIngredientPrices,
          category,
        });
      }}
      className="mt-8 w-full"
    >
      <div
        className="md:grid items-start gap-4"
        style={{ gridTemplateColumns: ".3fr .7fr" }}
      >
        <div>
          <EditableImage
            link={image}
            setLink={setImage}
            placeHolder={placeHolder}
          />
        </div>
        <div className="grow">
          <label>Item name</label>
          <input
            required
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />
          <label>Category</label>
          <div>
            <select
              className="w-full border rounded-zl"
              value={category}
              onChange={(ev) => setCategory(ev.target.value)}
            >
              {categories?.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id} className="p-2">
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          <label>Base price</label>
          <input
            required
            type="text"
            value={basePrice}
            onChange={(ev) => setBasePrice(ev.target.value)}
          />
          <MenuItemPriceProps
            name={"Sizes"}
            addLabel={"Add item size"}
            props={sizes}
            setProps={setSizes}
          />
          <MenuItemPriceProps
            name={"Extra ingredients"}
            addLabel={"Add ingredients prices"}
            props={extraIngredientPrices}
            setProps={setExtraIngredientPrices}
          />
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
}

import Image from "next/image";
import toast from "react-hot-toast";

import { FiPlus } from "react-icons/fi";
import { SlPencil } from "react-icons/sl";

export default function EditableImage({ link, setLink, placeHolder }) {
  async function handleFileChange(ev) {
    const files = ev.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);

      const uploadPromise = fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then((response) => {
        if (response.ok) {
          return response.json().then((link) => {
            setLink(link);
          });
        }
        throw new Error("Something went wrong");
      });

      await toast.promise(uploadPromise, {
        loading: "Uploading...",
        success: "Upload complete",
        error: "Upload error",
      });
    }
  }

  return (
    <>
      {(link || placeHolder) && (
        <Image
          className="rounded-lg w-full h-full mb-1"
          src={link || placeHolder}
          width={250}
          height={250}
          alt={"avatar"}
        />
      )}

      <label>
        <input type="file" className="hidden" onChange={handleFileChange} />
        <span className="flex justify-center  border border-gray-300 rounded-lg p-2 cursor-pointer">
          {!link ? <FiPlus size={20} /> : <SlPencil size={20} />}
        </span>
      </label>
    </>
  );
}

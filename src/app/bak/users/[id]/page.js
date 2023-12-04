"use client";
import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/useProfile";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";

export default function EditUserPage() {
  const { loading, data } = useProfile();
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    fetch("/api/profile?_id=" + id).then((res) => {
      res.json().then((user) => {
        setUser(user);
        setUserLoading(false);
      });
    });
  }, [id]);

  async function handleSaveButtonClick(ev, data) {
    ev.preventDefault();
    const promise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, _id: id }),
      });
      if (res.ok) resolve();
      else reject();
    });

    await toast.promise(promise, {
      loading: "Saving user...",
      success: "User saved",
      error: "An error has occurred while saving the user",
    });
  }

  return (
    <section className="mt-8 ">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        {loading || userLoading ? (
          <Image
            className="mx-auto my-32"
            src={"/loading.gif"}
            width={100}
            height={100}
            alt="loading"
          />
        ) : !data.admin ? (
          <h1 className=" mx-auto my-32 text-red text-2xl">
            You&apos;re not an admin!
          </h1>
        ) : (
          <UserForm user={user} onSave={handleSaveButtonClick} />
        )}
      </div>
    </section>
  );
}

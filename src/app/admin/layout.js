"use client";
import AdminTab from "@/components/layout/AdminTab";
import SubHeaders from "@/components/layout/SubHeaders";
import { useProfile } from "@/useProfile";
import Image from "next/image";

export default function AdminLayout({ children }) {
  const { loading, data } = useProfile();

  return (
    <div className="mt-8 px-4">
      <AdminTab />
      {loading ? (
        <Image
          className="mx-auto my-32"
          src={"/loading.gif"}
          width={100}
          height={100}
          alt="loading"
        />
      ) : !data.admin ? (
        <div className="mt-16">
          <p className="text-center text-gray-900 font-semiBold text-2xl">
            You&apos;re not an{" "}
            <span className="text-primary italic font-bold">Admin</span> !
          </p>
        </div>
      ) : (
        children
      )}
    </div>
  );
}

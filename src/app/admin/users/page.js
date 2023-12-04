"use client";
import { useProfile } from "@/useProfile";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [usersLoading, SetusersLoading] = useState(true);

  useEffect(() => {
    fetch("/api/users").then((response) => {
      response.json().then((users) => {
        setUsers(users);
        SetusersLoading(false);
      });
    });
  }, []);

  return (
    <section className="mt-8">
      {usersLoading ? (
        <Image
          className="mx-auto my-32"
          src={"/loading.gif"}
          width={100}
          height={100}
          alt="loading"
        />
      ) : (
        <div className="mt-8">
          {users?.length > 0 &&
            users.map((user) => (
              <div
                key={user._id}
                className="bg-gray-100 rounded-lg mb-2 p-1 px-4 flex items-center gap-4"
              >
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
                  <div className="text-gray-900">
                    {!!user.name && <span>{user.name}</span>}
                    {!user.name && <span className="italic">No name</span>}
                  </div>
                  <span className="text-gray-500">{user.email}</span>
                </div>
                <div>
                  <Link className="button" href={"/users/" + user._id}>
                    Edit
                  </Link>
                </div>
              </div>
            ))}
        </div>
      )}
    </section>
  );
}

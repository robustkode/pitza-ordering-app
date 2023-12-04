import { authOptions, isAdmin } from "@/app/api/auth/[...nextauth]/route";
import { Order } from "@/models/Order";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export async function GET(req) {
  mongoose.connect(process.env.MONGO_URL);

  function createOrQuery(list) {
    const orQuery = { $or: [] };
    for (const obj of list) {
      orQuery.$or.push(obj);
    }
    return orQuery;
  }

  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  const admin = await isAdmin();

  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  const list = url.searchParams.get("list");

  if (_id) {
    return Response.json(await Order.findById(_id));
  }

  if (admin) {
    return Response.json(await Order.find());
  }

  if (userEmail) {
    return Response.json(await Order.find({ userEmail }));
  }
  if (list) {
    const data = JSON.parse(list);

    const query = createOrQuery(data);
    console.log(query, "query");

    const res = await Order.find(query);

    return Response.json(res);
  }
}

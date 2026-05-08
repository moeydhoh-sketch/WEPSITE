import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import UserTable from "@/components/UserTable";
import dbConnect from "@/lib/mongodb";
import User from "@/lib/UserModal";

export default async function AdminDashboard() {
  const session = await getServerSession();
  
  // حماية قوية: فقط إيميلك يدخل
  if (session?.user?.email !== process.env.ADMIN_EMAIL) {
    redirect("/api/auth/signin");
  }

  await dbConnect();
  const users = await User.find({}).sort({ createdAt: -1 });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-purple-400">🛡️ لوحة الإدارة السرية</h1>
      <UserTable users={JSON.parse(JSON.stringify(users))} />
    </div>
  );
}
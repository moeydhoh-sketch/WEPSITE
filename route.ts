import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/mongodb';
import User from '@/lib/UserModal';

export async function POST(req: Request) {
  const session = await getServerSession();
  
  // حماية قوية
  if (session?.user?.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { email, approve } = await req.json();
  await dbConnect();

  if (approve) {
    // تفعيل الصلاحية لمدة 30 يوم بالضبط من الآن
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);
    
    await User.updateOne({ email }, { isApproved: true, expiresAt });
  } else {
    await User.updateOne({ email }, { isApproved: false, expiresAt: null });
  }

  return NextResponse.json({ success: true });
}
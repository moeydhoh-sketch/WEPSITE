"use client";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function UserTable({ users }: { users: any[] }) {
  const [userList, setUserList] = useState(users);

  const toggleApproval = async (email: string, currentStatus: boolean) => {
    const res = await fetch("/api/toggle-approval", {
      method: "POST",
      body: JSON.stringify({ email, approve: !currentStatus }),
    });
    
    if (res.ok) {
      setUserList(userList.map(u => u.email === email ? { ...u, isApproved: !currentStatus } : u));
    }
  };

  return (
    <div className="border border-gray-800 rounded-xl overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-900">
          <TableRow>
            <TableHead>الاسم</TableHead>
            <TableHead>الإيميل</TableHead>
            <TableHead>تاريخ التسجيل</TableHead>
            <TableHead>ينتهي في</TableHead>
            <TableHead>الحالة</TableHead>
            <TableHead>إجراء</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userList.map((user) => (
            <TableRow key={user.email} className="border-gray-800">
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{new Date(user.createdAt).toLocaleDateString('ar-SA')}</TableCell>
              <TableCell>{user.expiresAt ? new Date(user.expiresAt).toLocaleDateString('ar-SA') : 'غير محدد'}</TableCell>
              <TableCell>
                {user.isApproved ? 
                  <Badge className="bg-green-800 text-green-200">مشترك</Badge> : 
                  <Badge className="bg-red-800 text-red-200">مقيد</Badge>
                }
              </TableCell>
              <TableCell>
                <Button 
                  onClick={() => toggleApproval(user.email, user.isApproved)}
                  variant={user.isApproved ? "destructive" : "default"}
                >
                  {user.isApproved ? "إيقاف الصلاحية" : "تفعيل (30 يوم)"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
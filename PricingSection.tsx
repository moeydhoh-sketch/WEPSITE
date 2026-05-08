import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PricingSection() {
  return (
    <section className="py-20 px-4 bg-gray-950/50">
      <h3 className="text-3xl font-bold text-center mb-12">خطط الاشتراك</h3>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <Card className="bg-gray-900 border-gray-800 text-white">
          <CardHeader><CardTitle>مجاني</CardTitle></CardHeader>
          <CardContent><p className="text-4xl font-bold">0 <span className="text-sm text-gray-400">ريال</span></p><p className="text-gray-400 mt-4">تصفح فقط، لا يمكنك استخدام الذكاء الاصطناعي</p></CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-purple-500 border-2 text-white relative">
          <Badge className="absolute top-4 right-4 bg-purple-600">الأكثر طلباً</Badge>
          <CardHeader><CardTitle>احترافي</CardTitle></CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">25 <span className="text-sm text-gray-400">ريال / شهر</span></p>
            <p className="text-gray-400 mt-4">وصول كامل للذكاء الاصطناعي وتوليد العملاء بلا حدود</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
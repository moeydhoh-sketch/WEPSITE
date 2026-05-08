"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Loader2 } from "lucide-react";

export default function AiChat() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generateLeads = async () => {
    setLoading(true);
    setResult("");
    try {
      const res = await fetch("/api/generate-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data.result);
      } else {
        setResult(`❌ خطأ: ${data.error}`);
      }
    } catch (error) {
      setResult("❌ حدث خطأ في الاتصال.");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <Textarea 
          placeholder="اكتب وصف خدمتك أو منتجك هنا... مثال: أقدم خدمات تصميم مواقع وأريد استهداف أصحاب المتاجر"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-gray-900 border-gray-700 text-white min-h-[150px] text-lg"
        />
        <Button onClick={generateLeads} disabled={loading} className="bg-purple-600 hover:bg-purple-700 text-lg py-6">
          {loading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> جاري التحليل...</> : "✨ بحث وتحليل العملاء"}
        </Button>
      </div>

      {result && (
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 prose prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {result}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}
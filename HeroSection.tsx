"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[80vh] text-center px-4 overflow-hidden">
      {/* خلفية الجسيمات المتحركة (مؤثر وهمي بـ Tailwind) */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-500 rounded-full opacity-30"
            initial={{ y: -100, x: Math.random() * 1000 }}
            animate={{ y: 1000, x: Math.random() * 1000 }}
            transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <h2 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
          اكتشف عملاءك القادمين <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            بضغطة زر!
          </span>
        </h2>
        <p className="text-gray-400 text-xl mb-10 max-w-2xl mx-auto">
          أداة ذكية مدعومة بالذكاء الاصطناعي للبحث عن العملاء عبر منصات التواصل الاجتماعي وإنشاء ترويج احترافي لخدماتك.
        </p>
        <Link href="/dashboard">
          <Button size="lg" className="text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 shadow-lg shadow-purple-500/25">
            ابدأ الآن مجاناً ←
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}
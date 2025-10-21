"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  index: number;
}

export function StatCard({ icon: Icon, label, value, index }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      className="p-6 rounded-xl card glass transition-all shine-on-hover glow-hover"
    >
      <div className="flex items-center space-x-4">
        <div className="p-3 rounded-lg bg-gradient-to-br from-[#38BDF8]/20 to-[#818CF8]/20 border border-[#38BDF8]/20">
          <Icon className="w-6 h-6 text-[#38BDF8]" />
        </div>
        <div>
          <p className="text-gray-400 text-sm">{label}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
      </div>
    </motion.div>
  );
}

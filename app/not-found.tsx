'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, Search, Camera } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated 404 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            {/* Background glow */}
            <div className="absolute inset-0 bg-orange-500/20 blur-3xl rounded-full" />

            {/* 404 Text */}
            <h1 className="relative text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-b from-stone-400 to-stone-600 dark:from-stone-600 dark:to-stone-800 leading-none select-none">
              404
            </h1>

            {/* Floating camera icon */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-4 -right-4 md:top-0 md:right-0"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-2xl shadow-orange-500/30">
                <Camera className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-stone-600 dark:text-stone-400 max-w-md mx-auto">
            Looks like this shot didn't develop properly. The page you're looking for doesn't exist or has been moved.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="group flex items-center gap-2 px-8 py-4 bg-stone-900 dark:bg-white text-white dark:text-stone-900 rounded-full font-bold hover:scale-105 transition-transform duration-300 shadow-elevation-2"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>

          <Link
            href="/gallery"
            className="group flex items-center gap-2 px-8 py-4 glass-card rounded-full font-bold hover:scale-105 transition-transform duration-300"
          >
            <Camera className="w-5 h-5" />
            View Gallery
          </Link>
        </motion.div>

        {/* Search suggestion */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 pt-8 border-t border-stone-200 dark:border-stone-800"
        >
          <p className="text-sm text-stone-500 dark:text-stone-500 mb-4">
            Or try searching for what you need:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {['Gallery', 'Blog', 'Work', 'Services'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="px-4 py-2 text-sm text-stone-600 dark:text-stone-400 bg-white dark:bg-stone-900 rounded-full border border-stone-200 dark:border-stone-800 hover:border-orange-500 hover:text-orange-600 transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Visual element - film strip */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 flex items-center justify-center gap-2"
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.1 }}
              className="w-12 h-16 bg-stone-200 dark:bg-stone-800 rounded border-2 border-stone-300 dark:border-stone-700 flex items-center justify-center"
            >
              <div className="w-8 h-1 bg-stone-300 dark:bg-stone-700 rounded-full" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

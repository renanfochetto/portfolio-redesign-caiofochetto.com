"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { Menu, X, Globe, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useTheme } from "./theme-provider";
import { motion } from "framer-motion"; // ✅ IMPORT ADICIONADO

export function Header() {
  const { locale, t } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const otherLocale = locale === "pt" ? "en" : "pt";
  const localeHref = `/${otherLocale}`;

  const navItems = [
    { label: t.header.work, href: `/${locale}#work` },
    { label: t.header.experience, href: `/${locale}#experience` },
    { label: t.header.about, href: `/${locale}#about` },
    { label: t.header.contact, href: `/${locale}#contact` },
  ];

  return (
    // ✅ MOTION.HEADER COM ANIMAÇÃO
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 z-50 w-full border-b border-neutral-600 bg-background/80 backdrop-blur-md"
    >
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link
          href={`/${locale}`}
          className="font-heading text-xl font-bold tracking-tight text-foreground hover:scale-101 transition-all active:scale-98"
        >
          CAIO FOCHETTO<span className="text-primary">.</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">

          {/* Links de navegação - PADRONIZADOS */}
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="
              flex items-center gap-1.5 
              rounded-full 
              border border-neutral-600
              hover:border-primary
              active:scale-95
              px-3 py-1 
              text-xs font-medium 
              text-muted-foreground
              hover:text-primary
              transition-all duration-200
            "
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-3.5 w-3.5" />
            ) : (
              <Moon className="h-3.5 w-3.5" />
            )}
          </button>

          {/* Language toggle */}
          <Link
            href={localeHref}
            className="
              flex items-center gap-1.5 
              rounded-full 
              border border-neutral-600
              hover:border-primary
              active:scale-95
              px-3 py-1 
              text-xs font-medium 
              text-muted-foreground
              hover:text-primary
              transition-all duration-200
            "
          >
            <Globe className="h-3.5 w-3.5" />
            {otherLocale.toUpperCase()}
          </Link>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-3 md:hidden">

          {/* Theme toggle mobile */}
          <button
            onClick={toggleTheme}
            className="
              flex items-center gap-1 
              rounded-full 
              border border-neutral-600
              hover:border-primary
              active:scale-95
              px-2.5 py-1 
              text-xs font-medium 
              text-muted-foreground
              hover:text-primary
              transition-all duration-200
            "
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-3 w-3" />
            ) : (
              <Moon className="h-3 w-3" />
            )}
          </button>

          {/* Language toggle mobile */}
          <Link
            href={localeHref}
            className="
              flex items-center gap-1 
              rounded-full 
              border border-neutral-600
              hover:border-primary
              active:scale-95
              px-2.5 py-1 
              text-xs font-medium 
              text-muted-foreground
              hover:text-primary
              transition-all duration-200
            "
          >
            <Globe className="h-3 w-3" />
            {otherLocale.toUpperCase()}
          </Link>

          {/* Menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-foreground"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu - LINKS PADRONIZADOS */}
      {menuOpen && (
        <div className="border-t border-border bg-background px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </motion.header>
  );
}
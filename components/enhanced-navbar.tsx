"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, User, Bell, Settings, Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export function EnhancedNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("home");
  
  // Navigation items with icons
  const navItems = [
    { name: "home", label: "Home", href: "/" },
    { name: "features", label: "Features", href: "/features" },
    { name: "pricing", label: "Pricing", href: "/pricing" },
    { name: "about", label: "About", href: "/about" },
    { name: "contact", label: "Contact", href: "/contact" },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 ease-in-out rounded-b-xl",
        scrolled 
          ? "bg-background/90 dark:bg-black/90 backdrop-blur-md border-b shadow-sm" 
          : "bg-background/70 dark:bg-black/70 backdrop-blur-sm"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ 
                scale: 1.1,
                rotate: [0, -10, 10, -5, 5, 0],
                transition: { duration: 0.5 }
              }}
            >
              <Brain className="h-6 w-6 text-primary transition-all duration-300 group-hover:glow" />
            </motion.div>
            <motion.span 
              className="font-bold text-xl hidden sm:inline-block"
              initial={{ opacity: 0.9 }}
              whileHover={{ opacity: 1, scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              StudyGenius AI
            </motion.span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 relative">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className="relative text-sm font-medium transition-colors hover:text-primary py-1"
              onClick={() => setActiveItem(item.name)}
            >
              <span className="relative z-10">{item.label}</span>
              
              {/* Hover underline animation */}
              <motion.span 
                className="absolute bottom-0 left-0 h-[2px] bg-primary rounded-full w-0"
                initial={{ width: 0 }}
                whileHover={{ width: "100%", transition: { duration: 0.2 } }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
              
              {/* Active indicator */}
              {activeItem === item.name && (
                <motion.span 
                  className="absolute -bottom-1 left-1/2 h-1 w-1 rounded-full bg-primary"
                  layoutId="activeNavItem"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <Bell className="h-5 w-5 cursor-pointer text-muted-foreground hover:text-foreground transition-colors" />
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"
            />
          </motion.div>
          
          <ThemeToggle />
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" asChild>
              <Link href="/login">Log in</Link>
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button asChild>
              <Link href="/signup">Sign up</Link>
            </Button>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-4">
          <ThemeToggle />
          <motion.div
            whileTap={{ scale: 0.9 }}
          >
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isMenuOpen ? "close" : "open"}
                  initial={{ opacity: 0, rotate: isMenuOpen ? -90 : 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: isMenuOpen ? 90 : -90 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </motion.div>
              </AnimatePresence>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden fixed inset-0 top-16 z-50 bg-background/95 dark:bg-black/95 backdrop-blur-sm"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6 p-6">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <Link 
                    href={item.href} 
                    className="flex items-center text-lg font-medium transition-colors hover:text-primary"
                    onClick={() => {
                      setActiveItem(item.name);
                      setIsMenuOpen(false);
                    }}
                  >
                    <span className="relative">
                      {item.label}
                      {activeItem === item.name && (
                        <motion.span 
                          className="absolute -left-4 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-primary"
                          layoutId="activeMobileNavItem"
                        />
                      )}
                    </span>
                  </Link>
                </motion.div>
              ))}
              
              <motion.div 
                className="flex flex-col gap-4 mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.05 + 0.1, duration: 0.3 }}
              >
                <Button variant="outline" asChild className="w-full">
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>Log in</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/signup" onClick={() => setIsMenuOpen(false)}>Sign up</Link>
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

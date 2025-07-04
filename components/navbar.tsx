import * as React from "react";
import Link from "next/link";
import Image from "next/image"; 
import { GitHubStarsButton } from "@/components/animate-ui/buttons/github-stars";

export default function Navbar() {
  return (
    <nav className="border-b border-border/60 bg-background/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 font-semibold text-zinc-900 tracking-tight h-full">
          <span className="flex items-center h-full">
            <Image src="/android-chrome-192x192.png" alt="Brainstorm logo" className="h-8 w-8" width={32} height={32} />
            <span className="ml-2 flex items-center h-full mt-1 text-lg">Brainstorm</span>
          </span>
        </Link>
        <div className="flex items-center">
          <GitHubStarsButton 
            username="mrmps" 
            repo="brainstorm"
            formatted={true}
            inView={true}
          />
        </div>
        {/* Uncomment if future links are needed */}
        {/*
        <div className="flex items-center gap-8 text-sm">
          <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Examples
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
        </div>
        */}
      </div>
    </nav>
  );
} 
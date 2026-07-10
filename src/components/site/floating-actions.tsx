"use client";

import { MessageCircle, Phone, X } from "lucide-react";
import { CONTACT } from "@/lib/site-data";
import { useState } from "react";

/**
 * Quick-action cluster (WhatsApp + Phone).
 * Sits bottom-left so it never collides with the chatbot capsule (bottom-right).
 */
export function FloatingActions() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-4 left-4 z-40 flex flex-col items-start gap-2 sm:bottom-6 sm:left-6">
      {open && (
        <div className="flex flex-col gap-2">
          <a
            href={`https://wa.me/${CONTACT.phoneRaw}?text=Hi%2C%20I%27d%20like%20a%20free%20consultation.`}
            target="_blank"
            rel="noopener"
            aria-label="Chat on WhatsApp"
            className="flex h-11 w-11 items-center justify-center rounded-full text-white shadow-md transition-transform hover:scale-105"
            style={{ backgroundColor: "#25D366" }}
          >
            <MessageCircle className="h-5 w-5" />
          </a>
          <a
            href={`tel:${CONTACT.phoneRaw}`}
            aria-label="Call us"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition-transform hover:scale-105"
          >
            <Phone className="h-5 w-5" />
          </a>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close quick actions" : "Open quick actions"}
        className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 sm:h-12 sm:w-12"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>
    </div>
  );
}

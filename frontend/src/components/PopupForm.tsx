"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { submitInquiry } from "@/lib/inquiryActions";

export default function PopupForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    project: "",
    email: "",
  });

  useEffect(() => {
    let hasTriggered = false;

    const handleScroll = () => {
      if (hasTriggered) return;

      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const currentScrollPercent = (window.scrollY / scrollHeight) * 100;

      if (currentScrollPercent >= 15) {
        hasTriggered = true;
        setIsOpen(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage(null);

    const result = await submitInquiry(formData);

    if (result.error) {
      setErrorMessage(result.error);
      setSubmitting(false);
      return;
    }

    setSubmitted(true);
    setSubmitting(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-[440px] rounded-2xl bg-[#EBEBEB] p-8 text-[#111111] shadow-2xl">
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute right-5 top-5 text-neutral-500 hover:text-black transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <h2 className="font-['ArizonaFlare'] text-4xl sm:text-5xl uppercase tracking-tight text-neutral-900 leading-none">
            Book Your
            <br />
            Appointment
          </h2>
          <p className="mt-3 text-[10px] font-medium uppercase tracking-wider text-neutral-500 leading-relaxed max-w-xs mx-auto">
            To schedule your appointment, please provide the following information.
          </p>
        </div>

        {submitted ? (
          <div className="py-12 text-center">
            <p className="font-['ArizonaFlare'] text-2xl uppercase text-neutral-900">Thank You</p>
            <p className="mt-2 text-xs uppercase tracking-wider text-neutral-600">We will connect with you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <select
                required
                value={formData.project}
                onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                className="w-full bg-transparent border-b border-neutral-400 py-1.5 text-xs tracking-wider uppercase text-neutral-800 focus:border-black focus:outline-none transition-colors"
              >
                <option value="" disabled className="text-neutral-400">
                  SELECT PROJECT TYPE
                </option>
                <option value="Branding" className="text-black">Branding</option>
                <option value="Identity" className="text-black">Identity</option>
                <option value="Website" className="text-black">Website</option>
                <option value="Product" className="text-black">Product</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  required
                  placeholder="NAME"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border-b border-neutral-400 py-1.5 text-xs tracking-wider uppercase text-neutral-800 placeholder:text-neutral-400 focus:border-black focus:outline-none transition-colors"
                />
              </div>
              <div>
                <input
                  type="tel"
                  required
                  placeholder="PHONE NUMBER"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-transparent border-b border-neutral-400 py-1.5 text-xs tracking-wider uppercase text-neutral-800 placeholder:text-neutral-400 focus:border-black focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <input
                type="email"
                placeholder="EMAIL (OPTIONAL)"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent border-b border-neutral-400 py-1.5 text-xs tracking-wider uppercase text-neutral-800 placeholder:text-neutral-400 focus:border-black focus:outline-none transition-colors"
              />
            </div>

            {errorMessage && (
              <p className="text-xs text-red-600 text-center">{errorMessage}</p>
            )}

            <div className="flex flex-col items-center pt-2 gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="rounded-full border border-black px-8 py-2 text-xs font-base tracking-widest uppercase text-black hover:bg-black hover:text-white transition-all active:scale-95 disabled:opacity-50"
              >
                {submitting ? "Booking..." : "Book Now"}
              </button>

              <p className="text-[10px] tracking-wide text-neutral-500 text-center">
                Your data is strictly confidential and will never be shared.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
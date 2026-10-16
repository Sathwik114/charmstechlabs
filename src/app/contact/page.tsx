"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  MessageSquare,
  User,
  ExternalLink,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Shield,
  Zap,
} from "lucide-react";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  subject: "General Inquiry",
  message: "",
};

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [enquiryCode, setEnquiryCode] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          mobile: formData.phone,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit enquiry. Please check your information.");
      }

      setEnquiryCode(data.enquiryCode || "CHARMS-ENQ-SUCCESS");
      setStatus("success");
      setFormData(initialFormData);
    } catch (err: unknown) {
      setStatus("error");
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unexpected error occurred. Please try again later.");
      }
    }
  };

  const handleResetForm = () => {
    setStatus("idle");
    setEnquiryCode(null);
    setErrorMessage(null);
  };

  return (
    <div className="flex flex-col font-sans bg-[#f8fafc] text-slate-900 min-h-screen pb-24">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 bg-gradient-to-b from-blue-50/80 via-indigo-50/40 to-[#f8fafc] border-b border-slate-200/60 text-center">
        <div className="container relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 z-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-white px-4 py-1.5 text-xs font-bold text-blue-700 shadow-2xs">
            <MessageSquare className="h-3.5 w-3.5 text-blue-600" />
            <span>Academic Consultation Desk • Tirupati</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          </div>

          <h1 className="mb-5 text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Connect With Our{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Technical Mentors
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed">
            Have questions about B.Tech / M.Tech final year project development, code architecture, or industrial software training? Reach out to our senior engineers in Tirupati today.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-14">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT COLUMN: Channels */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  Contact Information
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
                  Reach out directly through WhatsApp, phone, email, or visit our engineering project development facility in Tirupati.
                </p>

                <div className="space-y-4">
                  {/* Address */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Lab Address
                      </span>
                      <p className="text-sm font-bold text-slate-900 mt-0.5">
                        Charms Tech Labs, Tech Park, Tirupati, Andhra Pradesh
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Near SV University, Tirupati - 517501
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-violet-50 text-violet-600 border border-violet-200 flex items-center justify-center">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Phone & WhatsApp
                      </span>
                      <a
                        href="tel:+917285972050"
                        className="text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors block mt-0.5"
                      >
                        +91 72859 72050
                      </a>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Direct support for project topic selection & admissions
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-cyan-50 text-cyan-600 border border-cyan-200 flex items-center justify-center">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Email Support
                      </span>
                      <a
                        href="mailto:hello@charmstechlabs.com"
                        className="text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors block mt-0.5"
                      >
                        hello@charmstechlabs.com
                      </a>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Replies within 24 business hours
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Working Hours
                      </span>
                      <p className="text-sm font-bold text-slate-900 mt-0.5">
                        Monday – Saturday: 9:00 AM – 6:30 PM
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Sunday: Available for booked project viva drills
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Counseling Card */}
              <div className="p-6 rounded-3xl bg-blue-50/70 border border-blue-200/80">
                <div className="flex items-center gap-2 mb-2 text-blue-800 font-bold text-sm">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  <span>Free Academic Project Counseling</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Not sure which domain to choose between AI/ML, Full Stack, or Generative AI? Bring your college guidelines to our mentors for a free scoping consultation.
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN: Contact Form */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
                {status === "success" ? (
                  <div className="py-8 text-center flex flex-col items-center">
                    <div className="h-16 w-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-5">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>

                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 mb-3">
                      Enquiry Registered
                    </span>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
                      Thank You! Message Received.
                    </h2>

                    <p className="text-sm text-slate-600 max-w-md mb-8 leading-relaxed">
                      Our academic counselors and project engineers will review your requirements and reach out to discuss project details.
                    </p>

                    <div className="w-full max-w-md rounded-2xl bg-slate-50 border border-slate-200 p-5 mb-8 text-center">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                        Your Inquiry Tracking Code
                      </span>
                      <div className="font-mono text-2xl font-extrabold text-blue-600 tracking-wider">
                        {enquiryCode}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="mb-8">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 mb-3">
                        <Sparkles className="h-3 w-3" />
                        Prompt Engineer Callback
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
                        Send Us an Inquiry
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-500">
                        Fill in your academic and contact details below and our team will get in touch.
                      </p>
                    </div>

                    {errorMessage && (
                      <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                        {errorMessage}
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Sathya Sathwik"
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="e.g. pushpagirisathwik@gmail.com"
                            className="w-full rounded-xl border border-slate-200 bg-slate-50
                             px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-2">
                            Phone / WhatsApp Number *
                          </label>
                          <input
                            type="tel"
                            required
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="e.g. 7285972050"
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-2">
                            Subject / Purpose *
                          </label>
                          <select
                            name="subject"
                            required
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 font-semibold focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                          >
                            <option value="Project Development">Final Year Project Development</option>
                            <option value="Training Enquiry">Full Stack Training Program</option>
                            <option value="Internship">Student Internship Track</option>
                            <option value="General Inquiry">General Campus Inquiry</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2">
                          Project Domain or Requirements *
                        </label>
                        <textarea
                          required
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Describe your degree (B.Tech/M.Tech), branch, preferred technologies (AI/ML, Python, Web), or any specific requirements..."
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-y"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full py-4 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {status === "loading" ? (
                          <span>Submitting Inquiry...</span>
                        ) : (
                          <>
                            <span>Send Inquiry to Mentors</span>
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Campus Map Card */}
      <section className="pt-4 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-sm text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center mb-4">
              <MapPin className="w-7 h-7" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
              Visit CHARMS Tech Labs Campus
            </h3>
            <p className="text-sm text-slate-600 max-w-lg mb-6">
              Tech Park, Sector 4, Near SV University, Tirupati, Andhra Pradesh — 517501
            </p>
            <a
              href="https://maps.google.com/?q=Tirupati,Andhra+Pradesh"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-900 text-xs font-bold transition-colors"
            >
              <span>View On Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

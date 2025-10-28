"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import Image from "next/image";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(10, "Please enter your full address"),
  usage: z.enum(["home", "business"], {
    required_error: "Please select your usage type",
  }),
  quantity: z.string().min(1, "Please select quantity"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function PreOrderPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/preorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          source: "preorder-page",
          type: "preorder",
        }),
      });

      if (response.ok) {
        toast.success("Pre-order submitted successfully!");
        reset();
      } else {
        const errorData = await response.json();
        toast.error(
          errorData.error || "Failed to submit pre-order. Please try again."
        );
      }
    } catch (error) {
      console.error("Error submitting pre-order:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-12">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <Image
                src="/images/OyanaFinalLogo.svg"
                alt="Oyana logo"
                width={200}
                height={48}
                className="h-10 w-auto md:h-12"
                priority
              />
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Join the <span className="text-primary">Oyana</span> Waitlist
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-white/70"
            >
              Be first to try AI-powered YouTube retention analysis
            </motion.p>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onSubmit={() => {}}
            className="bg-zinc-900 rounded-2xl p-8 border border-white/10"
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  First Name
                </label>
                <Input
                  {...register("firstName")}
                  className="w-full"
                  placeholder="John"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Last Name
                </label>
                <Input
                  {...register("lastName")}
                  className="w-full"
                  placeholder="Doe"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Email
                </label>
                <Input
                  {...register("email")}
                  type="email"
                  className="w-full"
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Phone Number
                </label>
                <Input
                  {...register("phone")}
                  type="tel"
                  className="w-full"
                  placeholder="+233 XX XXX XXXX"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-white mb-2">
                Address
              </label>
              <Input
                {...register("address")}
                className="w-full"
                placeholder="Your full address"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Usage Type
                </label>
                <select
                  {...register("usage")}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="">Select usage type</option>
                  <option value="home">Home</option>
                  <option value="business">Business</option>
                </select>
                {errors.usage && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.usage.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Quantity
                </label>
                <select
                  {...register("quantity")}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="">Select quantity</option>
                  <option value="1">1 Unit</option>
                  <option value="2">2 Units</option>
                  <option value="3">3 Units</option>
                  <option value="4">4 Units</option>
                  <option value="5+">5+ Units</option>
                </select>
                {errors.quantity && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.quantity.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-white mb-2">
                Additional Message (Optional)
              </label>
              <Textarea
                {...register("message")}
                className="w-full"
                placeholder="Any specific requirements or questions?"
                rows={4}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-black hover:brightness-110 py-3 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-[1.02]"
            >
              {isSubmitting ? "Submitting..." : "Join Waitlist"}
            </Button>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
}

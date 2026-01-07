'use client';

import { useState } from "react";
import { ContactPageForm } from "@/components/forms/ContactPageForm";
import { CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function ContactPage() {
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to bg-gray-50">
      
      {/* --- Page Header --- */}
      <div className="w-full pt-30 pb-10 md:pt-35 md:pb-16">
        <div className="container mx-auto px-5 max-w-6xl">
            <h1 className="text-4xl lg:text-6xl font-semibold tracking-tight text-primary mb-6">
                Get in touch
            </h1>
            <p className="text-md lg:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                We help brands and businesses scale through digital solutions. Let&apos;s talk about your project.
            </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-24 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            
            {/* --- LEFT COLUMN: Contact Details (Takes up 4 columns) --- */}
            <div className="lg:col-span-5 space-y-8 order-2 lg:order-1 px-6">
                
               {/* ✅ REPLACED: Info Block with Neubrutalism Card */}
                <Card variant="neubrutalism" className="bg-white">

                    <CardContent className="space-y-10">
                        <div>
                            <h3 className="text-primary text-md lg:text-lg font-medium flex items-center gap-2">
                                <Mail className="w-5 h-5"/>  <a href="mailto:hi@dashmedia.com" className="text-md md:text-lg text-primary ">hi@dashmedia.com</a>
                            </h3>
                        </div>

                        <div>
                            <h3 className="text-primary text-md lg:text-lg font-medium flex items-center gap-2">
                                <MapPin className="w-5 h-5 "/> <p className="text-md md:text-lg text-primary leading-snug">123 Business Rd, Suite 456 <br/>Delhi, 110001</p>
                            </h3>
                        </div>

                        <div>
                            <h3 className="text-primary text-md lg:text-lg font-medium flex items-center gap-2">
                                <Phone className="w-5 h-5"/> <a href="tel:+919876543210" className="text-md md:text-lg text-primary">+91 987 654 3210</a>
                            </h3>
                        </div>

                    </CardContent>
                </Card>
            </div>

            {/* --- RIGHT COLUMN: The Form (Takes up 8 columns) --- */}
            <div className="lg:col-span-7 ">
                {isSuccess ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        className="bg-green-50 dark:bg-green-900/10 p-10 rounded-2xl border border-green-100 dark:border-green-900/50 flex flex-col items-start gap-4"
                    >
                        <div className="flex items-center gap-3 text-green-700 dark:text-green-400">
                            <CheckCircle2 className="w-8 h-8" />
                            <h2 className="text-2xl font-bold">Message Sent Successfully</h2>
                        </div>
                        <p className="text-green-800/80 dark:text-green-300 text-lg">
                            Thanks for reaching out! We&apos;ll be in touch with you within 24 hours.
                        </p>
                        <Button onClick={() => setIsSuccess(false)} variant="outline" className="mt-4 bg-white">
                            Send Another Message
                        </Button>
                    </motion.div>
                ) : (
                    /* The form sits directly on the page, no card wrapper */
                    <ContactPageForm onSuccess={() => setIsSuccess(true)} />
                )}
            </div>

        </div>
      </div>
    </div>
  );
}
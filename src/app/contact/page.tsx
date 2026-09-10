"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useState, FormEvent } from "react";

export default function ContactPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        setStatus('idle');
        setErrorMessage('');

        const formData = new FormData(e.currentTarget);
        const data = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Something went wrong');
            }

            setStatus('success');
            (e.target as HTMLFormElement).reset();
        } catch (error) {
            setStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'Failed to send message');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="w-full">
            <div className="bg-primary py-24 text-center text-white">
                <h1 className="text-5xl font-serif font-bold">Contact Us</h1>
                <p className="mt-4 text-xl text-gray-200">Get in Touch</p>
            </div>

            <section className="py-20 container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <div>
                        <h2 className="text-3xl font-serif font-bold text-primary mb-8">Reach Out</h2>
                        <p className="text-gray-600 mb-10 leading-relaxed">
                            Have questions about admissions, our programs, or upcoming events?
                            Fill out the form or contact us directly using the information below. We look forward to hearing from you.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start">
                                <div className="p-3 bg-gray-100 rounded-lg mr-4">
                                    <MapPin className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Visit Us</h4>
                                    <p className="text-gray-600">135 Industrial Pkwy N <br /> Aurora, ON L4G 4C4</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="p-3 bg-gray-100 rounded-lg mr-4">
                                    <Mail className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Email Us</h4>
                                    <p className="text-gray-600 mb-1">General: <a href="mailto:info@elisacademy.ca" className="hover:text-primary transition-colors hover:underline">info@elisacademy.ca</a></p>
                                    {/* <p className="text-gray-600">Admissions: admissions@queensglen.com</p> */}
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="p-3 bg-gray-100 rounded-lg mr-4">
                                    <Phone className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Call Us</h4>
                                    <p className="text-gray-600"><a href="tel:+12898940806" className="hover:text-primary transition-colors hover:underline">+1 289 894 0806</a></p>
                                    <p className="text-sm text-gray-500 mt-1">Mon-Sat: 9:00 AM - 6:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-gray-50 p-8 rounded-2xl shadow-sm border border-gray-100">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="first-name">First name</Label>
                                    <Input id="first-name" name="firstName" placeholder="Enter first name" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="last-name">Last name</Label>
                                    <Input id="last-name" name="lastName" placeholder="Enter last name" required />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" placeholder="you@example.com" required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="subject">Subject</Label>
                                <Input id="subject" name="subject" placeholder="Admissions Inquiry" required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea id="message" name="message" placeholder="How can we help you?" className="min-h-[150px]" required />
                            </div>

                            <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    "Send Message"
                                )}
                            </Button>

                            {status === 'success' && (
                                <div className="p-4 bg-green-50 text-green-700 rounded-lg flex items-center">
                                    <CheckCircle className="h-5 w-5 mr-2" />
                                    <span>Message sent successfully! We&apos;ll get back to you soon.</span>
                                </div>
                            )}

                            {status === 'error' && (
                                <div className="p-4 bg-red-50 text-red-700 rounded-lg flex items-center">
                                    <AlertCircle className="h-5 w-5 mr-2" />
                                    <span>{errorMessage || 'Something went wrong. Please try again.'}</span>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="w-full h-[60svh] bg-gray-100">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2141.0256542761954!2d-79.46196458956986!3d44.00802382929108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882ad3dd2dfff001%3A0x62b128a515897064!2s135%20Industrial%20Pkwy%20N%2C%20Aurora%2C%20ON%20L4G%204C4!5e0!3m2!1sen!2sca!4v1766349729846!5m2!1sen!2sca"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Elis Academy Location"
                    className="grayscale hover:grayscale-0 transition-all duration-500"
                ></iframe>
            </section>
        </div>
    )
}

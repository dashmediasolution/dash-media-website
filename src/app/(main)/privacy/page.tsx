export const metadata = {
  title: "Privacy Policy | Dash Media Solutions",
  description: "Privacy Policy regarding the collection and use of your data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 pb-20">
      {/* Header */}
      <div className="pt-30 sm:pt-35 pb-20 text-center px-5">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground">We value your privacy and are committed to protecting your personal data.</p>
        <p className="text-sm text-muted-foreground mt-2 font-bold">Last Updated: December 2025</p>
      </div>

      <div className="container mx-auto px-5 -mt-10 relative z-10 max-w-5xl">
         {/* Removed Card Wrapper */}
        <div className="bg-white rounded-xl p-10">
            <article className="max-w-none space-y-12">
                
                <section>
                    <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-black">1. Information We Collect</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4 text-md lg:text-lg">
                        We collect several different types of information for various purposes to provide and improve our Service to you:
                    </p>
                    <ul className="list-disc pl-6 space-y-3 text-muted-foreground text-md lg:text-lg">
                        <li><strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you (e.g., Email address, First name and Last name, Phone number).</li>
                        <li><strong>Usage Data:</strong> We may also collect information on how the Service is accessed and used (e.g., your computer&apos;s Internet Protocol address, browser type, browser version).</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-black">2. How We Use Your Data</h2>
                    <p className="text-muted-foreground leading-relaxed text-md lg:text-lg">
                        Dash Media Solutions uses the collected data for various purposes:
                    </p>
                    <ul className="list-disc pl-6 space-y-3 text-muted-foreground text-md lg:text-lg mt-4">
                        <li>To provide and maintain the Service</li>
                        <li>To notify you about changes to our Service</li>
                        <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
                        <li>To provide customer care and support</li>
                        <li>To monitor the usage of the Service</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-black">3. Cookies and Tracking Data</h2>
                    <p className="text-muted-foreground leading-relaxed text-md lg:text-lg">
                        We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-black">4. Data Security</h2>
                    <p className="text-muted-foreground leading-relaxed text-md lg:text-lg">
                        The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-black">5. Third-Party Services</h2>
                    <p className="text-muted-foreground leading-relaxed text-md lg:text-lg">
                        We may employ third party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used. These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
                    </p>
                </section>

                <section className="pt-8 border-t mt-12">
                    <p className="text-muted-foreground text-sm sm:text-lg">
                        If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@dashmedia.com" className="text-primary hover:underline font-medium">privacy@dashmedia.com</a>.
                    </p>
                </section>

            </article>
        </div>
      </div>
    </div>
  );
}
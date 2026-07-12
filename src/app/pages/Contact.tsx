import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { FadeInSection } from '../components/motion/FadeInSection';
import { fadeUpVariants, staggerContainer, EASE_LUXURY } from '../utils/motion';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import contactImage from 'figma:asset/52e70ed822f015234a068fbbac1d71aa8bb344e3.png';
import { toast } from 'sonner';
import { projectId } from '../utils/supabase/info';

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-fd83a735/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Use public anon key for authorization if needed, or if the route is open (CORS)
          // The server handles CORS for *, so this should work.
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      toast.success('Inquiry sent successfully. We will respond within 24 hours.');
      setFormData({ name: '', email: '', phone: '', message: '' });

    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to send inquiry. Please try again or call us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#faf8f5]">
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeUpVariants} className="w-16 h-px bg-gradient-bronze mx-auto mb-8" />
            <motion.h1 variants={fadeUpVariants} className="text-5xl md:text-7xl font-serif text-[#2c2c2c] mb-8">
              Get in Touch
            </motion.h1>
            <motion.p variants={fadeUpVariants} className="text-xl text-[#6b6b6b] leading-relaxed max-w-2xl mx-auto font-light">
              We invite you to experience the transformative power of clinical luxury. Schedule your private consultation or reach out with any inquiries.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Split */}
      <section className="pb-32 px-4">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-20">
            
            {/* Left Column: Contact Info & Map */}
            <div className="space-y-16">
              {/* Contact Grid */}
              <FadeInSection>
                <div className="grid md:grid-cols-2 gap-8">
                  {[
                    { 
                      icon: <MapPin className="w-5 h-5" />, 
                      title: 'STUDIO', 
                      line1: '1206 Millennium Parkway, Suite 2004', 
                      line2: 'Brandon, FL 33511', 
                      link: 'https://www.google.com/maps/search/?api=1&query=1206+Millennium+Parkway+Suite+2004+Brandon+FL+33511', 
                      linkText: 'Get Directions' 
                    },
                    { 
                      icon: <Phone className="w-5 h-5" />, 
                      title: 'CONTACT', 
                      line1: '(914) 299-7739', 
                      line2: 'Text or Call', 
                      link: 'tel:9142997739', 
                      linkText: 'Call Now' 
                    },
                    { 
                      icon: <Clock className="w-5 h-5" />, 
                      title: 'HOURS', 
                      line1: 'By Appointment Only', 
                      line2: 'Tuesday - Sunday', 
                      link: '', 
                      linkText: '' 
                    },
                    { 
                      icon: <Mail className="w-5 h-5" />, 
                      title: 'BOOKING', 
                      line1: 'Online Scheduling', 
                      line2: 'Available 24/7', 
                      link: 'https://book.squareup.com/appointments/f7dcst2ljp85dq/location/LMVSQK9C6PR4T/services?buttonTextColor=ffffff&color=000000&locale=en&referrer=so', 
                      linkText: 'Book Appointment' 
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="group p-8 bg-white border border-[#b8956a]/10 hover:border-[#b8956a]/30 transition-all duration-500">
                      <div className="text-[#b8956a] mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                        {item.icon}
                      </div>
                      <h3 className="text-xs font-medium tracking-[0.2em] text-[#b8956a] mb-4 uppercase">{item.title}</h3>
                      <p className="text-[#2c2c2c] text-lg font-serif mb-1">{item.line1}</p>
                      <p className="text-[#6b6b6b] text-sm mb-6 font-light">{item.line2}</p>
                      {item.linkText && (
                        <a 
                          href={item.link}
                          target={item.link.startsWith('http') ? '_blank' : undefined}
                          rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="inline-block text-xs uppercase tracking-widest text-[#2c2c2c] border-b border-[#b8956a]/30 pb-1 hover:border-[#b8956a] transition-all"
                        >
                          {item.linkText}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </FadeInSection>

              {/* FAQ Section */}
              <FadeInSection delay={0.2}>
                <div className="bg-white p-10 border border-[#b8956a]/10">
                  <h3 className="text-2xl font-serif text-[#2c2c2c] mb-8">Frequently Asked</h3>
                  <div className="space-y-8">
                    {[
                      { 
                        q: 'How do I schedule an appointment?', 
                        a: 'For the most seamless experience, we recommend using our 24/7 online booking system. You may also text or call us directly.' 
                      },
                      { 
                        q: 'What is your cancellation policy?', 
                        a: 'We kindly request 24 hours notice for any cancellations or rescheduling to allow us to accommodate other clients.' 
                      },
                      { 
                        q: 'Do you offer consultations?', 
                        a: 'Yes, every new client visit begins with a comprehensive skin analysis and consultation to ensure your treatment is perfectly tailored to your needs.' 
                      }
                    ].map((faq, idx) => (
                      <div key={idx} className="border-b border-[#b8956a]/10 pb-6 last:border-0 last:pb-0">
                        <h4 className="text-lg text-[#2c2c2c] mb-2">{faq.q}</h4>
                        <p className="text-[#6b6b6b] font-light leading-relaxed">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeInSection>
            </div>

            {/* Right Column: Form */}
            <div className="lg:sticky lg:top-32 h-fit">
              <FadeInSection delay={0.3}>
                <div className="bg-white p-12 shadow-[0_4px_30px_rgba(0,0,0,0.02)] border border-[#b8956a]/10 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-bronze" />
                  
                  <div className="mb-10 text-center">
                    <span className="text-xs uppercase tracking-[0.2em] text-[#b8956a] mb-3 block">Inquiries</span>
                    <h2 className="text-4xl font-serif text-[#2c2c2c]">Send a Message</h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="group">
                          <Label htmlFor="name" className="text-xs uppercase tracking-widest text-[#6b6b6b] group-focus-within:text-[#b8956a] transition-colors mb-2 block">Name</Label>
                          <Input
                            id="name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            disabled={loading}
                            className="border-0 border-b border-[#e5e5e5] rounded-none px-0 py-3 bg-transparent focus:border-[#b8956a] focus:ring-0 transition-all placeholder:text-neutral-300 disabled:opacity-50"
                            placeholder="Your full name"
                          />
                        </div>
                        <div className="group">
                          <Label htmlFor="phone" className="text-xs uppercase tracking-widest text-[#6b6b6b] group-focus-within:text-[#b8956a] transition-colors mb-2 block">Phone</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            disabled={loading}
                            className="border-0 border-b border-[#e5e5e5] rounded-none px-0 py-3 bg-transparent focus:border-[#b8956a] focus:ring-0 transition-all placeholder:text-neutral-300 disabled:opacity-50"
                            placeholder="(555) 000-0000"
                          />
                        </div>
                      </div>
                      
                      <div className="group">
                        <Label htmlFor="email" className="text-xs uppercase tracking-widest text-[#6b6b6b] group-focus-within:text-[#b8956a] transition-colors mb-2 block">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          disabled={loading}
                          className="border-0 border-b border-[#e5e5e5] rounded-none px-0 py-3 bg-transparent focus:border-[#b8956a] focus:ring-0 transition-all placeholder:text-neutral-300 disabled:opacity-50"
                          placeholder="email@example.com"
                        />
                      </div>

                      <div className="group">
                        <Label htmlFor="message" className="text-xs uppercase tracking-widest text-[#6b6b6b] group-focus-within:text-[#b8956a] transition-colors mb-2 block">Message</Label>
                        <Textarea
                          id="message"
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          required
                          disabled={loading}
                          className="border-0 border-b border-[#e5e5e5] rounded-none px-0 py-3 bg-transparent focus:border-[#b8956a] focus:ring-0 transition-all resize-none placeholder:text-neutral-300 disabled:opacity-50"
                          placeholder="How can we help you?"
                        />
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        disabled={loading}
                        className="w-full btn-bronze py-6 text-xs uppercase tracking-[0.2em] hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {loading ? 'Sending...' : 'Submit Inquiry'}
                      </Button>
                    </div>
                  </form>
                </div>
              </FadeInSection>
            </div>

          </div>
        </div>
      </section>

      {/* Decorative Full Width Image */}
      <FadeInSection>
        <div className="h-[40vh] relative overflow-hidden">
          <ImageWithFallback
            src={contactImage}
            alt="SkinByEmely Studio"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-[#2c2c2c]/20" />
        </div>
      </FadeInSection>
    </div>
  );
}
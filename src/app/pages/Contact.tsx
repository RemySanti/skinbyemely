import { MapPin, Phone, Clock, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { FadeInSection } from '../components/motion/FadeInSection';
import { fadeUpVariants, staggerContainer } from '../utils/motion';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import contactImage from 'figma:asset/52e70ed822f015234a068fbbac1d71aa8bb344e3.png';

export default function Contact() {
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
              Book online anytime, call or text us, or visit our Brandon studio.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-32 px-4">
        <div className="max-w-4xl mx-auto space-y-16">
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

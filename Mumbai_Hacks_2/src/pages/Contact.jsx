import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import contact_img from "./contactimg.jpg"
import { motion } from "framer-motion";
import LinkedInIcon from "../components/LinkedinIcon";
import Footer from "../components/Footer";

const Contact = () => {
  return (
    <div className="bg-[#0a0a0a] text-gray-200 font-sans">

      <section
        className="relative py-32 text-center"
        style={{
          backgroundImage: `url(${contact_img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <h1 className="relative text-5xl font-extrabold text-white z-10">Contact Us</h1>
      </section>


      <section className="py-5 text-center bg-[#111]">
        <h2 className="text-5xl font-bold [-webkit-text-stroke:2px_#eab308] text-transparent mb-3">
          Contact
        </h2>
        <h3 className="text-3xl font-semibold text-white mt-8 mb-16">Contact Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-6xl mx-auto px-6">

          <div className="flex flex-col items-center space-y-3">
            <LinkedInIcon />
            <a href="https://www.linkedin.com/in/md-arman-ali-87a300323/" target="_blank" rel="noopener noreferrer" className="text-xl font-semibold text-white">LinkedIn/Md-Arman-Ali</a>
            <p className="text-gray-400 text-sm max-w-xs">
              Send us your detailed brief here.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-3">
            <LinkedInIcon />
            <a href="https://www.linkedin.com/in/saraswata-chatterjee-b560972b3/" target="_blank" rel="noopener noreferrer" className="text-xl font-semibold text-white">LinkedIn/Saraswata-Chatterjee</a>
            <p className="text-gray-400 text-sm max-w-xs">
              Send us your detailed brief here.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-3">
            <LinkedInIcon />
            <a href="https://www.linkedin.com/in/arijit-deb-7b0747324/" target="_blank" rel="noopener noreferrer" className="text-xl font-semibold text-white">LinkedIn/Arijit-Deb</a>
            <p className="text-gray-400 text-sm max-w-xs">
              Send us your detailed brief here.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-3">
            <MapPin className="w-10 h-10 text-yellow-500" />
            <p className="text-xl font-semibold text-white">Kolkata, India</p>
            <p className="text-gray-400 text-sm max-w-xs">
              Our doors are open for visitors.
            </p>
          </div>
        </div>
      </section>


      <section className="bg-[#0f0f0f] py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

          <div>
            <h2 className="text-5xl font-bold [-webkit-text-stroke:2px_#eab308] text-transparent mb-3">Form</h2>
            <h3 className="text-3xl font-semibold text-white mt-5 mb-5">Get In Touch !!</h3>
            <p className="text-gray-400 leading-relaxed">
              We're excited to hear from you. Please use the form to send us your questions, feedback, or collaboration proposals. We'll get back to you as soon as possible.
            </p>
          </div>


          <form className="flex flex-col space-y-5">
            <input
              type="email"
              placeholder="Email"
              className="bg-transparent border border-yellow-500 rounded-md px-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="tel"
              placeholder="Phone"
              className="bg-transparent border border-yellow-500 rounded-md px-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="text"
              placeholder="Name"
              className="bg-transparent border border-yellow-500 rounded-md px-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <textarea
              rows="4"
              placeholder="Message"
              className="bg-transparent border border-yellow-500 rounded-md px-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            ></textarea>
            <button
              type="submit"
              className="bg-yellow-500 text-black font-semibold py-3 rounded-md hover:bg-yellow-400 transition-all"
            >
              Submit Button
            </button>
          </form>
        </div>
      </section>


      <section className="bg-[#111]">
        <iframe
          title="default-map"
          className="w-full h-96 border-0"
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d58841.19699282578!2d88.43736276768942!3d22.57302931487031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1698248888888"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
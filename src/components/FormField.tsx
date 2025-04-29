

import { FiSend } from 'react-icons/fi'
import AnimatedSection from './AnimatedSection'
import { useState } from 'react';



const FormField: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
            });

            setTimeout(() => {
                setSubmitted(false);
            }, 3000);
        }, 1500);
    };


    return (
        <AnimatedSection direction="left">
            <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-blue-100 dark:hover:shadow-blue-900/20 transform">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-6 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                    Send Me a Message
                </h3>

                {submitted ? (
                    <div className="bg-green-100 dark:bg-green-900/30 p-6 rounded-lg text-center animate-fade-in">
                        <div className="text-green-600 dark:text-green-400 mb-2 text-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Thank You!</h4>
                        <p className="text-gray-600 dark:text-gray-300">Your message has been sent successfully. I'll get back to you soon!</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                            <div className="group">
                                <label htmlFor="name" className="block text-sm text-gray-600 dark:text-gray-400 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">Your Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 md:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all group-hover:border-blue-300 dark:group-hover:border-blue-500"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="group">
                                <label htmlFor="email" className="block text-sm text-gray-600 dark:text-gray-400 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">Your Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 md:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all group-hover:border-blue-300 dark:group-hover:border-blue-500"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div className="group">
                            <label htmlFor="subject" className="block text-sm text-gray-600 dark:text-gray-400 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className="w-full p-2 md:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all group-hover:border-blue-300 dark:group-hover:border-blue-500"
                                placeholder="How can I help you?"
                            />
                        </div>

                        <div className="group">
                            <label htmlFor="message" className="block text-sm text-gray-600 dark:text-gray-400 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={4}
                                className="w-full p-2 md:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none group-hover:border-blue-300 dark:group-hover:border-blue-500"
                                placeholder="Your message..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full sm:w-auto px-6 md:px-8 py-2 md:py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full 
                      transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg 
                      flex items-center justify-center relative overflow-hidden group ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-blue-600 group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-blue-600 transition-all duration-1000 ease-in-out bg-size-200 bg-pos-0 group-hover:bg-pos-100"></span>
                            <span className="relative z-10 flex items-center">
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Message <FiSend className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                                    </>
                                )}
                            </span>
                        </button>
                    </form>
                )}
            </div>
        </AnimatedSection>)
}

export default FormField
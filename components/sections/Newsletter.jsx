'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setIsSubmitted(true);
    setEmail('');
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section className="newsletter-area">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Newsletter Text */}
          <div className="lg:w-1/2">
            <div className="newsletter-text">
              <h2>Subscribe for a <span>25% Discount</span></h2>
              <p>
                Join our newsletter to receive exclusive offers, sustainable living tips, 
                and be the first to know about our new eco-friendly products. 
                Make a difference with every purchase.
              </p>
            </div>
          </div>

          {/* Newsletter Form */}
          <div className="lg:w-1/2 w-full">
            <div className="newsletter-form relative">
              <form onSubmit={handleSubmit} className="flex">
                <input
                  type="email"
                  name="email"
                  className="nl-email flex-1"
                  placeholder="Your E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="submit"
                  value={isSubmitted ? 'Subscribed!' : 'Subscribe'}
                  className={isSubmitted ? 'bg-[#131212]' : ''}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

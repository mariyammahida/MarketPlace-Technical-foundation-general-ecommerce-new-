import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <div>
      <footer className="bg-base-200 text-base-content p-6 sm:p-10">
        <div className="flex flex-wrap lg:flex-nowrap justify-between items-start gap-10">
          
          {/* Address Section */}
          <div className="flex-1 text-gray-500">
            <p className="text-sm leading-relaxed">
              400 University Drive Suite 200
              <br />
              Coral Gables, 33134 USA
            </p>
            <p className="mt-6 text-black text-sm">
              © 2022 Meubel House. All rights reserved.
            </p>
          </div>

          {/* Links Section */}
          <div className="flex-1">
            <h6 className="footer-title text-gray-500 font-bold mb-4">Links</h6>
            <div className="flex flex-col gap-2">
              <Link href="/" className="link link-hover text-sm">Home</Link>
              <Link href="/shop" className="link link-hover text-sm">Shop</Link>
              <Link href="/about" className="link link-hover text-sm">About</Link>
              <Link href="/contact" className="link link-hover text-sm">Contact</Link>
            </div>
          </div>

          {/* Help Section */}
          <div className="flex-1">
            <h6 className="footer-title text-gray-500 font-bold mb-4">Help</h6>
            <div className="flex flex-col gap-2">
              <Link href="/payment-options" className="link link-hover text-sm">Payment Options</Link>
              <Link href="/returns" className="link link-hover text-sm">Returns</Link>
              <Link href="/privacy-policy" className="link link-hover text-sm">Privacy Policy</Link>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="flex-1">
            <h6 className="footer-title text-gray-500 font-bold mb-4">Newsletter</h6>
            <form>
              <div className="form-control">
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="input input-bordered w-full sm:w-auto flex-1"
                  />
                  <button type="submit" className="btn btn-primary w-full sm:w-auto">
                    Subscribe
                  </button>
                </div>
              </div>
            </form>
          </div>

        </div>
      </footer>
    </div>
  );
};

export default Footer;

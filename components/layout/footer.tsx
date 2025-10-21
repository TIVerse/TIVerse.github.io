import Link from "next/link";
import { Github, Mail, Heart } from "lucide-react";

const footerLinks = {
  product: [
    { name: "Projects", href: "/projects" },
    { name: "Documentation", href: "#" },
    { name: "Blog", href: "/blog" },
    { name: "Community", href: "/community" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Contribute", href: "/contribute" },
    { name: "Contact", href: "/contact" },
  ],
  resources: [
    { name: "GitHub", href: "https://github.com/tiverse" },
    { name: "Discussions", href: "https://github.com/orgs/tiverse/discussions" },
    { name: "Issues", href: "https://github.com/tiverse" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#0F172A] border-t border-white/10">
      <div className="h-px nav-gradient-border opacity-70" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1">
            <Link href="/" className="inline-block mb-4">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-[#38BDF8] to-[#818CF8] bg-clip-text text-transparent">
                TIVerse
              </h3>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Engineering the Future of Open Infrastructure
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/tiverse"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#38BDF8] transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:eshanized@proton.me"
                className="text-gray-400 hover:text-[#38BDF8] transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#38BDF8] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#38BDF8] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#38BDF8] transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} TIVerse - Tonmoy Infrastructure & Vision. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm flex items-center">
              Built with <Heart className="w-4 h-4 mx-1 text-red-500" /> by{" "}
              <a
                href="https://github.com/eshanized"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 text-[#38BDF8] hover:underline"
              >
                Eshan Roy
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

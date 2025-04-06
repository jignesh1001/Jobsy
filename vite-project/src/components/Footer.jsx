

const Footer = () => {
    return (
      <footer className="border-t border-t-gray-200 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold">Job Hunt</h2>
              <p className="text-sm">© 2024 Your Company. All rights reserved.</p>
            </div>
  
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="https://facebook.com" className="hover:text-gray-400" aria-label="Facebook">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.676 0H1.324C.593 0 0 .592 0 1.324v21.352C0 23.408.592 24 1.324 24h11.495V14.706H9.69v-3.622h3.128V8.413c0-3.1 1.894-4.788 4.662-4.788 1.324 0 2.464.099 2.794.144v3.24l-1.916.001c-1.504 0-1.795.714-1.795 1.763v2.31h3.588l-.467 3.622h-3.121V24h6.116C23.408 24 24 23.408 24 22.676V1.324C24 .592 23.408 0 22.676 0z"/>
                </svg>
              </a>
  
              <a href="https://twitter.com" className="hover:text-gray-400" aria-label="Twitter">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557a9.835 9.835 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.723 9.87 9.87 0 0 1-3.127 1.195 4.916 4.916 0 0 0-8.373 4.482 13.957 13.957 0 0 1-10.141-5.144 4.916 4.916 0 0 0 1.523 6.573A4.9 4.9 0 0 1 .964 8.78v.061a4.914 4.914 0 0 0 3.94 4.814 4.9 4.9 0 0 1-2.212.084 4.918 4.918 0 0 0 4.588 3.417A9.862 9.862 0 0 1 0 19.54 13.945 13.945 0 0 0 7.548 22c9.056 0 14.01-7.502 14.01-14.01 0-.213-.005-.425-.014-.636A9.99 9.99 0 0 0 24 4.557z"/>
                </svg>
              </a>
  
              <a href="https://linkedin.com" className="hover:text-gray-400" aria-label="LinkedIn">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452H16.85v-5.569c0-1.331-.027-3.044-1.854-3.044-1.855 0-2.141 1.445-2.141 2.939v5.674H9.254V9.095h3.473v1.561h.049c.484-.916 1.667-1.882 3.43-1.882 3.669 0 4.349 2.417 4.349 5.562v6.116zM5.337 7.433a2.07 2.07 0 1 1 .002-4.14 2.07 2.07 0 0 1-.002 4.14zm2.107 13.019H3.23V9.095h4.214v11.357zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.225.792 24 1.771 24h20.453C23.208 24 24 23.225 24 22.271V1.729C24 .774 23.208 0 22.225 0z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
export default Footer;
  


/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "lh3.googleusercontent.com"
            }
        ]
    },    
    poweredByHeader: false, // Disables the "X-Powered-By" header for better security
    reactStrictMode: true, // Helps identify potential issues in the app
    headers: async () => {
        return [
            {
                source: "/(.*)",
                headers: [
                    // the following line broke the app, chatgpt doesn't always know whats best clearly...
                    // { key: "Content-Security-Policy", value: "default-src 'self'; img-src 'self' lh3.googleusercontent.com; script-src 'self'; style-src 'self'; object-src 'none'; frame-ancestors 'none'; base-uri 'self'; form-action 'self';" },
                    { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
                    { key: "X-Content-Type-Options", value: "nosniff" },
                    { key: "X-Frame-Options", value: "DENY" },
                    { key: "Referrer-Policy", value: "no-referrer" }
                ]
            }
        ]
    }
};

export default nextConfig;

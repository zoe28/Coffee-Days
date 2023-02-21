module.exports = {
  async rewrites() {
    if (process.env.NODE_ENV === "development") {
      return [
        {
          source: "/api/:path*",
          destination: "http://127.0.0.1:5000/api/:path*",
        },
      ];
    } else if (process.env.DOMAIN) {
      return [
        {
          source: "/api/:path*",
          destination: `${process.env.DOMAIN}:8000/api/:path*`,
        },
      ];
    }
  },
};

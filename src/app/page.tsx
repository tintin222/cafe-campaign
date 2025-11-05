export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to Cafe Campaign
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your Next.js and Node.js base is ready!
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Read Docs
          </a>
          <a
            href="https://nextjs.org/learn"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-white text-black border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Learn Next.js
          </a>
        </div>
      </main>
    </div>
  );
}

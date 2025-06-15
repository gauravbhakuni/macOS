export default function ComingSoon({ appName = "This app" }) {
  return (
    <div className="flex items-center justify-center">
      {/* Centered Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <h2 className="text-2xl font-bold mb-2">{appName}</h2>
        <p className="text-white/70">Coming soon... 🚧</p>
      </div>
    </div>
  );
}

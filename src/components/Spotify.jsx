export default function Spotify() {
  return (
    <div className="w-full min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full h-full flex items-center justify-center">
        <iframe
          src="https://open.spotify.com/embed/playlist/3MdT0fbuoq8o4Sp9MuG9S2?theme=0"
          className="w-full min-h-screen rounded-xl"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}

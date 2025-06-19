
const Safari = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black">
      <div className="w-full h-full aspect-video">
        <iframe
          src="https://www.youtube.com/embed/P8frC_cLLD4"
          title="African Safari 4K"
          className="w-full h-full rounded-lg shadow-lg"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}

export default Safari
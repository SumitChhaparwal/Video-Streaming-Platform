const YoutubePlayer = ({ url }) => {
  let videoID = "";
  try {
    //getting V var value from "https://m.youtube.com/watch?v=fXBPo38gvFg&pp=ygUSQ2hhbXBpb24gTWVudGFsaXR5"
    videoID = new URL(url).searchParams.get("v");
  } catch (error) {
    console.error("Invalid Video URL is Provided! ", error);
  }

  //Construct embedURL with parameters
  let embedURL = `https://www.youtube.com/embed/${videoID}?autoplay=1&mute=1&modestbranding=1&rel=0&iv_load_policy=3`;

  return (
    <>
      <div>
        <iframe
          src={embedURL}
          title="Video Player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
          width="100%"
          height="100%"
          style={{
            position: "absolute",
            left: 0,
            height: "calc(100% + 60px)", // Expands height to compensate
            border: 0,
          }}
          allowFullScreen
          frameBorder="0"
        ></iframe>
      </div>
    </>
  );
};

export default YoutubePlayer;

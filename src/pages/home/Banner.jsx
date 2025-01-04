import image from '../../assets/1.png'
const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row-reverse py-3 justify-between items-center gap-12">
  <div className="md:w-1/2 w-full flex items-center md:justify-end">
    <img src={image} alt="" className="w-full h-auto"/>
  </div>
  
  <div className="md:w-1/2 w-full">
    <h1 className="md:text-5xl text-2xl font-medium mb-7">Top Best Mobile Game</h1>
    <p className="mb-10">
      It is miHoYo&apos;s first turn-based game, featuring the main character, who is referred to as the Trailblazer, travelling across planets through the Astral Express.
    </p>
  </div>
</div>

  );
}

export default Banner;

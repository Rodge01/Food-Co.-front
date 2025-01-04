import image from '../../assets/1.png'
const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row-reverse py-3 justify-between items-center gap-12">
  <div className="md:w-1/2 w-full flex items-center md:justify-end">
    <img src={image} alt="" className="w-full h-auto"/>
  </div>
  
  <div className="md:w-1/2 w-full">
    <h1 className="md:text-5xl text-2xl font-medium mb-7">Best Sell of the Month</h1>
    <p className="mb-10">
    <b>F1</b> Our Potato Fries are a crowd favorite! Made from hand-cut, farm-fresh potatoes, they’re golden and crispy on the outside, soft on the inside, and perfectly seasoned. Whether as a side or a snack, their irresistible texture and flavor keep customers coming back for more!</p>
  </div>
</div>

  );
}

export default Banner;

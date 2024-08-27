import ninth_img from "../../assets/nine.png";
const Ninth = () => {
  return (
    <div className="">
      {/* <Header /> */}
      <div className="container ">
        <div className="bg-white p-3 mt-5 rounded-xl mx-auto">
          <div className="flex justify-center">
            <img
              src={ninth_img}
              alt=""
              className="pointer-events-none w-[50%] sm:w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ninth;

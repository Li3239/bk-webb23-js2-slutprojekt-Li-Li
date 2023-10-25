import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import "../css/style.css";
const images = [
  "https://res.cloudinary.com/ifeomaimoh/image/upload/v1652345767/demo_image2.jpg",
  "https://res.cloudinary.com/ifeomaimoh/image/upload/v1652366604/demo_image5.jpg",
  "https://res.cloudinary.com/ifeomaimoh/image/upload/v1652345874/demo_image1.jpg",
];
function Carousel2() {
  return (
    <div className="box">
      <Carousel useKeyboardArrows={true}>
        {images.map((URL, index) => (
          <div className="slide">
            <img alt="sample_file" src={URL} key={index} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
export default Carousel2;
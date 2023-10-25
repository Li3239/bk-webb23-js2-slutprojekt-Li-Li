
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

export default function Carousel() {

    const carouselList = [
        { 
            id: 'carousel-halloween', 
            title: 'Hemska Dagar',
            imgUrl: 'https://www.mcdn.net/images/content/4267bceb-9e95-41fe-b177-e09d19982a29_Puff-HD.jpg'
        },
        { 
            id: 'carousel-news', 
            title: 'Våra senaste nyheter',
            imgUrl: 'https://www.mcdn.net/images/content/f2ae7659-b35a-40ef-aabe-34bf5c2fa79a_start-hero-mobile-SRD-nyheter.jpg'
        },
        // { 
        //     id: 'carousel-autumn-home', 
        //     title: 'Höstmysigt hem',
        //     imgUrl: 'https://www.mcdn.net/images/content/e7fcf6e6-b418-4156-b7b2-26bf2b60a9b3_mobile-hostmys-1.jpg'
        // },
        { 
            id: 'carousel-dressup-home', 
            title: 'klä ditt hem',
            imgUrl: 'https://www.mcdn.net/images/content/76c8d2df-f65a-4ab6-87eb-c80164add4cb_Webb-KDH.jpg'
        },
        { 
            id: 'carousel-soffa', 
            title: 'Soffor för alla',
            imgUrl: 'https://www.mcdn.net/images/content/3c3de663-5a1e-48a3-ba64-33e4a7d04919_pic-sofforforalla-personal.jpg'
        },
        { 
            id: 'carousel-order-in-home', 
            title: 'Ordning och reda i hemmet',
            imgUrl: 'https://www.mcdn.net/images/content/71ae3bd4-1386-4840-8196-c915549893f0_Hero-ordning%26reda-hall.jpg'
        },
        { 
            id: 'carousel-cold', 
            title: 'När kylan smsger sig på',
            imgUrl: 'https://www.mcdn.net/images/content/e3d5ed66-0cc5-4753-865f-bac7cb7531b9_Hero-meta-Va%CC%88rmDig-1.jpg'
        },
        { 
            id: 'carousel-bathroom', 
            title: 'Badrumsnyheter',
            imgUrl: 'https://www.mcdn.net/images/content/533b2344-94d8-4d2e-8c3e-6a9246de0318__9HwPtM.jpg'
        }];


    return (
        <Carousel className='carousel-div' 
                  showArrows={true} showThumbs={true} useKeyboardArrows={true}
                  autoPlay={true} infiniteLoop={true}>
            {carouselList.map(item => {
                return(
                    <div className='carousel-slide' key={item.id}>
                        <img src={item.imgUrl} />
                        <p>{item.title}</p>
                    </div>
                )
            })}
        </Carousel>
    );
}

//    <div className="box">
//       <Carousel useKeyboardArrows={true}>
//         {images.map((URL, index) => (
//           <div className="slide">
//             <img alt="sample_file" src={URL} key={index} />
//           </div>
//         ))}
//       </Carousel>
//     </div>
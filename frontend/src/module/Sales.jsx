
import { useNavigate } from 'react-router-dom';

export default function Sales() {
    const navigate = useNavigate();

    const saleList = [
        { 
            id: 'sale-furniture', 
            title: 'Furniture', 
            category: "Sängar-madrasser",
            href: '/', 
            imgDefaultUrl: require('../images/mobler.jpg'),
            imgAlternateUrl: require('../images/mobler_wide.jpg') },
        { 
            id: 'sale-textile',
            title: 'Textile', 
            category: "Textilier",
            href: '/', 
            imgDefaultUrl: require('../images/textil.jpg'),
            imgAlternateUrl: require('../images/textil_wide.jpg') },
        { 
            id: 'sale-lighting', 
            title: 'Lightning', 
            category: "Belysning",
            href: '/', 
            imgDefaultUrl: require('../images/belysning.jpg'),
            imgAlternateUrl: require('../images/belysning_wide.jpg') },
        { 
            id: 'sale-furnishings', 
            title: 'Furnishings', 
            category: "Inredning",
            href: '/', 
            imgDefaultUrl: require('../images/inredning.jpg'),
            imgAlternateUrl: require('../images/inredning_wide.jpg') }
    ];
    // const saleList = [
    //     { 
    //         id: 'sale-furniture', 
    //         title: 'Furniture', 
    //         category: "Sängar-madrasser",
    //         href: '/', 
    //         imgDefaultUrl: 'https://www.mcdn.net/images/content/97d1f0e3-475e-4dbc-93ed-87fbcfe4a2a3_linkblock-mobler.jpg',
    //         imgAlternateUrl: 'https://www.mcdn.net/images/content/10969724-f257-4572-8f0d-786c491ac636_MSS-mobile-mobler.jpg' },
    //     { 
    //         id: 'sale-textile',
    //         title: 'Textile', 
    //         category: "Textilier",
    //         href: '/', 
    //         imgDefaultUrl: 'https://www.mcdn.net/images/content/63caa7c0-a980-44b6-b8c6-ce35a2686590_linkblock-textil.jpg',
    //         imgAlternateUrl: 'https://www.mcdn.net/images/content/c4642192-0a89-4fbf-bc45-a0bd432e5fae_MSS-mobile-textil.jpg' },
    //     { 
    //         id: 'sale-lighting', 
    //         title: 'Lightning', 
    //         category: "Belysning",
    //         href: '/', 
    //         imgDefaultUrl: 'https://www.mcdn.net/images/content/8e619505-cc20-4f1a-94f2-5ad93d38a117_linkblock-belysning.jpg',
    //         imgAlternateUrl: 'https://www.mcdn.net/images/content/2bf2392b-392e-4d29-b4b9-6f0239b94f44_MSS-mobile-belysning.jpg' },
    //     { 
    //         id: 'sale-furnishings', 
    //         title: 'Furnishings', 
    //         category: "Inredning",
    //         href: '/', 
    //         imgDefaultUrl: 'https://www.mcdn.net/images/content/ee3c33e9-2bf1-4c18-a93c-aeae5dcde9e9_linkblock-inredning.jpg',
    //         imgAlternateUrl: 'https://www.mcdn.net/images/content/e52d26ee-f32c-42ad-a72e-3c0230cb7a87_MSS-mobile-inredning.jpg' }
    // ];

    function handleClick(e, category) {
        e.preventDefault();
        console.log('bild click>>>>>>>>>>>>>', e.target, category);
        navigate(`/products?category=${category}`);
    }

    return(
        <div className="sale-div">
            <ul>
                {saleList.map(item =>{
                    return(
                        <li key={item.category} onClick={(e) => handleClick(e, item.category)}>
                            {/* <a href={item.link}> */}
                            <a >
                                {/* show different images depend on width of screen(className) */}
                                <img src={item.imgDefaultUrl} alt={item.title}  className='sales-default-image'/>
                                <img src={item.imgAlternateUrl} alt={item.title} className='sales-alternate-image'/>
                            </a>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faShop, faRightToBracket, faPhone } from '@fortawesome/free-solid-svg-icons';

export default function HeaderZon() {

    const infoList = ['74 Butiker', 'Fri frakt till butik', 'Störst på soffor', 'Köp nu - betala sen!'];
    const actionList = [
        {icon: faShop, title: 'välj din butik', herf: '/'}, 
        {icon: faRightToBracket, title: 'Logga in', herf: '/login'}, 
        {icon: faPhone, title: 'Kundservice', herf: '/service'}
    ];

    return(
        <>
        <div className="head-main">
            <div className="head-inner">
                <ul className="head-info">
                    {infoList.map(item => {
                        return(
                            <li key={item} className="head-info-item">
                                <div className="head-info-icon is-positiv">
                                    <FontAwesomeIcon icon={faCheck} style={{ color: 'rgb(19, 170, 19)' }} />
                                </div>
                                <div className="head-info-text">
                                    {item}
                                </div>
                            </li>
                        )
                    })}
                </ul>
                <ul className="head-action">
                    {actionList.map(item => {
                        return(
                            <li key={item.title} className="head-action-item">
                                <div className="head-action-icon is-positiv">
                                    <FontAwesomeIcon icon={item.icon} style={{ color: 'rgb(19, 170, 19)' }} />
                                </div>
                                <a className="head-action-text" title={item.title} herf={item.herf}>
                                    {item.title}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
        </>
    )
}
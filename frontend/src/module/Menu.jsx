
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import _, { map, sortBy } from 'underscore';
import { useEffect, useState } from 'react';
   
export default function Menu({ activeId, searchKey, setSearchKey }) {

    const menuItems = [
        { id: 1, title: 'Hem', link: './' },
        { id: 2, title: 'Produkter', link: './products' }
        // { id: 3, title: 'Kampanj', link: '/campaign' }
    ];
    const [orderby, setOrderby] = useState(true);

    function handleOrder(sortby) {
        setOrderby(sortby);
    }

    useEffect(() => {
        setSearchKey({...searchKey, orderby: orderby});
        console.log('[Menu]-[sort by] searchKey = ', searchKey);
    }, [orderby])

    return(
        <nav className="horizontal-menu">
            <div className="menu-div">
                <ul>
                    {menuItems.map(item =>{
                        return(
                            <li key={item.id}>
                                {/* set active class for selected item on menu */}
                                {activeId == item.id && <a className='a-active' href={item.link}>{item.title}</a>}
                                {activeId != item.id && <a href={item.link}>{item.title}</a>}
                            </li>
                        )
                    })}
                </ul>
            </div>
            {/* show sort by div only when Product List is shown */}
            {activeId == 2 && 
                <div className="sort-div">
                    <h4>Sortera efter: </h4>
                    <button onClick={() => handleOrder(true)}>
                        <FontAwesomeIcon icon={faSort} style={{ color: '#383737' }}/>  Längsta pris
                    </button>
                    <button onClick={() => handleOrder(false)}>
                        <FontAwesomeIcon icon={faSort} style={{ color: '#383737' }}/>  Högsta pris
                    </button>
                </div>}
        </nav>
    )
}
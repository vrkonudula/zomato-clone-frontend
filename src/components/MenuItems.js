import React from 'react';
import '../css/MenuItems.css'
import MenuItem from './MenuItem';

class MenuItems extends React.Component {
    render() {
        const { details, menuItems } = this.props;
        return (
            <div id="menuItemsContainer">
                {
                    menuItems.map((item) => {
                        return <MenuItem key={item._id} details={details} menu={item} />
                    })
                }
            </div>
        )
    }
}

export default MenuItems;
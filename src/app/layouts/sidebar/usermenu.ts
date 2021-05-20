import { MenuItem } from './menu.model';
export const UserMENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true
    },
    {
        id: 2,
        label: 'MENUITEMS.DASHBOARDS.TEXT',
        icon: 'uil-home-alt',
        badge: {
            variant: 'primary',
            text: '01', //'MENUITEMS.DASHBOARDS.BADGE',
        },
        link: '/user',
    },
   
 
    {
        id: 3,
        label: 'FRQ Tickets',
        icon: 'uil-ticket',
        link: 'user/rfq',
    },
    {
        id: 4,
        label: 'Offer Tickets',
        icon: 'uil-ticket',
        link: 'user/offer',
    },
    {
        id: 5,
        label: 'Stock Tickets',
        icon: 'uil-ticket',
        link: 'user/stock',
    },
    {
        id: 6,
        label: 'Quoted Tickets',
        icon: 'uil-ticket',
        link: 'user/quoted',
    },
    {
        id: 7,
        label: 'My Quatioions',
        icon: 'uil-comments-alt',
        link: 'user/quotations',
       
    }
    
];
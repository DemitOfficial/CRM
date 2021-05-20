import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
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
        link: '/admin',
    },
    {
        id: 7,
        label: 'Tickets',
        icon: 'uil-ticket',
        subItems: [
            {
                id: 8,
                label: 'All Tickets',
                link: 'admin/tickets',
                parentId: 7
            },
            {
                id: 8,
                label: 'RFQ Tickets',
                link: 'admin/rfq',
                parentId: 7
            },
            {
                id: 9,
                label: 'Stock Tickets',
                link: 'admin/stock',
                parentId: 7
            },
            {
                id: 9,
                label: 'Offer Tickets',
                link: 'admin/offer',
                parentId: 7
            },
            {
                id: 9,
                label: 'Quoted Tickets',
                link: 'admin/quoted',
                parentId: 7
            },
         
        ]
    },
    
    {
        id: 5,
        label: 'Companies',
        icon: 'uil-calender',
        link: 'admin/companies',
    },
    {
        id: 6,
        label: 'Users',
        icon: 'uil-user-circle',
        link: 'admin/users',
        badge: {
            variant: 'warning',
            text: 'MENUITEMS.CHAT.BADGE',
        },
    },
   
    {
        id: 7,
        label: 'Emails',
        icon: 'uil-envelope',
        subItems: [
            {
                id: 8,
                label: 'Read Email',
                link: 'admin/emails',
                parentId: 7
            },
            {
                id: 9,
                label: 'Compose Email',
                link: 'admin/createemail',
                parentId: 7
            },
         
        ]
    },
    {
        id: 7,
        label: 'Messages',
        icon: 'uil-envelope',
        subItems: [
            {
                id: 8,
                label: 'Read Message',
                link: 'admin/messages',
                parentId: 7
            },
            {
                id: 9,
                label: 'Compose Message',
                link: 'admin/createmessage',
                parentId: 7
            },
         
        ]
    },
  
    
    {
        id: 22,
        label: 'My Contacts',
        icon: 'uil-book-alt',
        subItems: [
            {
                id: 23,
                label: 'My Contacts',
                link: 'admin/mycontacts',
                parentId: 22
            },
          
          
        ]
    },
  
 
];



// export interface JobPreference {
//   id: string;
//   value: string;
//   label: string;
//   icon: string; // Using icon name instead of direct image reference
//   description?: string;
// }

// export const SUPERMARKET_JOB_PREFERENCES: JobPreference[] = [
//   {
//     id: '1',
//     value: 'sales',
//     label: 'Sales Associate',
//     icon: 'shopping-cart',
//     description: 'Assist customers, manage inventory, and process sales transactions'
//   },
//   {
//     id: '2',
//     value: 'cashier',
//     label: 'Cashier',
//     icon: 'cash-register',
//     description: 'Process customer payments and handle cash register operations'
//   },
//   {
//     id: '3',
//     value: 'delivery',
//     label: 'Delivery Person',
//     icon: 'truck-delivery',
//     description: 'Deliver orders to customers in a timely and professional manner'
//   },
//   {
//     id: '4',
//     value: 'driver',
//     label: 'Driver',
//     icon: 'truck',
//     description: 'Transport goods between locations and maintain delivery vehicles'
//   },
//   {
//     id: '5',
//     value: 'security',
//     label: 'Security Guard',
//     icon: 'shield-check',
//     description: 'Monitor premises to prevent theft and ensure customer safety'
//   },
//   {
//     id: '6',
//     value: 'billingcounterperson',
//     label: 'Billing Counter Person',
//     icon: 'receipt',
//     description: 'Process customer bills and handle payment transactions'
//   },
//   {
//     id: '7',
//     value: 'accountant',
//     label: 'Accountant',
//     icon: 'calculator',
//     description: 'Manage financial records and handle accounting tasks'
//   },
//   {
//     id: '8',
//     value: 'stocker',
//     label: 'Stocker/Inventory Clerk',
//     icon: 'box',
//     description: 'Stock shelves, organize inventory, and maintain store appearance'
//   },
//   {
//     id: '9',
//     value: 'manager',
//     label: 'Department Manager',
//     icon: 'user-tie',
//     description: 'Oversee department operations and supervise staff'
//   },
//   {
//     id: '10',
//     value: 'butcher',
//     label: 'Butcher/Meat Cutter',
//     icon: 'drumstick-bite',
//     description: 'Prepare and package meat products according to customer requests'
//   },
//   {
//     id: '11',
//     value: 'baker',
//     label: 'Baker',
//     icon: 'bread-slice',
//     description: 'Prepare baked goods and maintain bakery section'
//   },
//   {
//     id: '12',
//     value: 'produce',
//     label: 'Produce Clerk',
//     icon: 'apple-alt',
//     description: 'Maintain produce section, ensure quality, and assist customers'
//   }
// ];

export interface JobPreference {
  id: string;
  value: string;
  label: string;
  //imageUrl: string;
  description?: string;
}

export const SUPERMARKET_JOB_PREFERENCES: JobPreference[] = [
  {
    id: '1',
    value: 'sales',
    label: 'Sales Associate',
    //imageUrl: require('@/assets/images/job-icons/sales.png'),
    description:
      'Assist customers, manage inventory, and process sales transactions',
  },
  {
    id: '2',
    value: 'cashier',
    label: 'Cashier',
    //imageUrl: require('@/assets/images/job-icons/cashier.png'),
    description:
      'Process customer payments and handle cash register operations',
  },
  {
    id: '3',
    value: 'delivery',
    label: 'Delivery Person',
    //imageUrl: require('@/assets/images/job-icons/delivery.png'),
    description:
      'Deliver orders to customers in a timely and professional manner',
  },
  {
    id: '4',
    value: 'driver',
    label: 'Driver',
    //imageUrl: require('@/assets/images/job-icons/driver.png'),
    description:
      'Transport goods between locations and maintain delivery vehicles',
  },
  {
    id: '5',
    value: 'security',
    label: 'Security Guard',
    //imageUrl: require('@/assets/images/job-icons/security.png'),
    description: 'Monitor premises to prevent theft and ensure customer safety',
  },
  {
    id: '6',
    value: 'billingcounterperson',
    label: 'Billing Counter Person',
    //imageUrl: require('@/assets/images/job-icons/billing.png'),
    description: 'Process customer bills and handle payment transactions',
  },
  {
    id: '7',
    value: 'accountant',
    label: 'Accountant',
    //imageUrl: require('@/assets/images/job-icons/accountant.png'),
    description: 'Manage financial records and handle accounting tasks',
  },
  {
    id: '8',
    value: 'stocker',
    label: 'Stocker/Inventory Clerk',
    //imageUrl: require('@/assets/images/job-icons/stocker.png'),
    description:
      'Stock shelves, organize inventory, and maintain store appearance',
  },
  {
    id: '9',
    value: 'manager',
    label: 'Department Manager',
    //imageUrl: require('@/assets/images/job-icons/manager.png'),
    description: 'Oversee department operations and supervise staff',
  },
  {
    id: '10',
    value: 'butcher',
    label: 'Butcher/Meat Cutter',
    //imageUrl: require('@/assets/images/job-icons/butcher.png'),
    description:
      'Prepare and package meat products according to customer requests',
  },
  {
    id: '11',
    value: 'baker',
    label: 'Baker',
    //imageUrl: require('@/assets/images/job-icons/baker.png'),
    description: 'Prepare baked goods and maintain bakery section',
  },
  {
    id: '12',
    value: 'produce',
    label: 'Produce Clerk',
    //imageUrl: require('@/assets/images/job-icons/produce.png'),
    description:
      'Maintain produce section, ensure quality, and assist customers',
  },
];

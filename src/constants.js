export const APP_TITLE = "Jerrad's Transportation";
export const TRIP_TYPES = {
  oneWay: 'One way trip (A to B)',
  toDfw: 'To DFW Airport',
  toLoveField: 'To Dallas Love Field Airport',
  toAac: 'To American Airlines Center',
  toCs: 'To Cowboys Stadium',
  fromCs: 'From Cowboys Stadium',
  toDep: 'To Dos Equis Pavilion',
};

export const PUBLIC_ADDRESSES = {
  dfw: {
    address: '2400 Aviation Dr',
    city: 'Dallas',
    state: 'TX',
    zip: '75261',
  },
  loveField: {
    address: '8008 Herb Kelleher Way',
    city: 'Dallas',
    state: 'TX',
    zip: '75235',
  },
  aac: {
    address: '2500 Victory Ave',
    city: 'Dallas',
    state: 'TX',
    zip: '75219',
  },
  ds: {
    address: '1 AT&T Way',
    city: 'Arlington',
    state: 'TX',
    zip: '76011',
  },
  dep: {
    address: '1818 1st Ave',
    city: 'Dallas',
    state: 'TX',
    zip: '75210',
  },
};

export const NUM_OF_PASSENGERS = [1, 2, 3, 4, 5];
export const NUM_OF_LUGGAGES = [0, 1, 2, 3, 4];
export const VEHICLE_TYPES = ['Sedan', 'SUV'];

export const STATES = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];

export const DASHBAORD_PAGE = {
  newRequests: 'New Requests',
  pendingRequests: 'Pending Requests',
  upcomingRides: 'Upcoming Rides',
  history: 'History',
};

export const COLORS = {
  blue: '#0ea5e9',
  grey: '#647687',
  orange: '#fe9800',
  green: '#2c7f2c',
  black: '#000',
  white: '#fff',
};

export const PRICING_INFO_TABLE_HEADERS = {
  pickUp: 'Pick-up Location',
  dropOff: 'Drop-off Location',
  sedanPrice: 'Sedan (Tesla)',
  suvPrice: 'SUV',
};

export const PRICING_INFO_TABLE_DATA = [
  {
    pickUp: 'Rockwall/Fate',
    dropOff: 'DFW Airport',
    sedanPrice: 75,
    suvPrice: 85,
  },
  {
    pickUp: 'Royse City/Caddo Mills',
    dropOff: 'DFW Airport',
    sedanPrice: 85,
    suvPrice: 95,
  },
  {
    pickUp: 'Rockwall/Fate',
    dropOff: 'Dallas Love Field',
    sedanPrice: 75,
    suvPrice: 75,
  },
  {
    pickUp: 'Royse City/Caddo Mills',
    dropOff: 'Dallas Love Field',
    sedanPrice: 85,
    suvPrice: 85,
  },
  {
    pickUp: 'Rockwall/Fate',
    dropOff: 'Cowboys Stadium',
    sedanPrice: 75,
    suvPrice: 75,
  },
  {
    pickUp: 'Royse City/Caddo Mills',
    dropOff: 'Cowboys Stadium',
    sedanPrice: 85,
    suvPrice: 85,
  },
  {
    pickUp: 'Cowboys Stadium',
    dropOff: 'Rockwall/Fate',
    sedanPrice: 100,
    suvPrice: 100,
  },
  {
    pickUp: 'Cowboys Stadium',
    dropOff: 'Royse City/Caddo Mills',
    sedanPrice: 110,
    suvPrice: 110,
  },
  {
    pickUp: 'Rockwall/Fate',
    dropOff: 'Dos Equis Pavilion',
    sedanPrice: 65,
    suvPrice: 75,
  },
  {
    pickUp: 'Royse City/Caddo Mills',
    dropOff: 'Dos Equis Pavilion',
    sedanPrice: 75,
    suvPrice: 85,
  },
  {
    pickUp: 'Rockwall/Fate',
    dropOff: 'American Airlines Center',
    sedanPrice: 65,
    suvPrice: 75,
  },
  {
    pickUp: 'Royse City/Caddo Mills',
    dropOff: 'American Airlines Center',
    sedanPrice: 75,
    suvPrice: 85,
  },
];

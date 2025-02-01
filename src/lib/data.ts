import type { Category, Resource } from './types';
import { sanityClient } from '../sanityClient';

export const resources:Resource[] = await sanityClient.fetch('*') as Resource[];
console.log(resources);
export const categories: Category[] = [
  {
    id: 'where-to-go',
    title: 'Where to go first',
    icon: '👣',
    description: 'New in The Hague? Start here for basic help'
  },
  {
    id: 'health',
    title: 'Health & Wellbeing',
    icon: '👨‍⚕️',
    description: 'Medical care when you are sick'
  },
  {
    id: 'dentist',
    title: 'Dentist',
    icon: '🦷',
    description: 'Help for tooth pain'
  },
  {
    id: 'food-clothing',
    title: 'Food & Clothes',
    icon: '🥗',
    description: 'Free food and clothing'
  },
  {
    id: 'shelter',
    title: 'Shelter',
    icon: '🏠',
    description: 'Find a place to sleep',
    subcategories: [
      {
        id: 'day-shelter',
        title: 'Day Shelter',
      },
      {
        id: 'night-shelter',
        title: 'Night Shelter',
      },
    ],
  },
  {
    id: 'legal',
    title: 'Legal Advice',
    icon: '⚖️',
    description: 'Free legal help'
  },
  {
    id: 'women',
    title: 'Help for Women',
    icon: '👩',
    description: 'Special support for women'
  },
  {
    id: 'children',
    title: 'Help for Children & Youth',
    icon: '👶',
    description: 'Support for young people'
  },
  {
    id: 'safety',
    title: 'Safety & Protection',
    icon: '👶',
    description: 'Access to emergency service and protection from violence, abuse, and work exploitation.'
  },
  {
    id: 'work',
    title: 'Safety & Protection',
    icon: '👶',
    description: 'When you have a job you have rights, also if you are undocumented.'
  },
  {
    id: 'asylum-return',
    title: 'Asylum & Return',
    icon: '👶',
    description: 'Here you can find information about asylum procedure and return.'
  },
  {
    id: 'find-family',
    title: 'Find Missing Relatives',
    icon: '👶',
    description: 'The Red Cross can help you to search for missing relatives in other countries and get in touch with them.'
  },
  {
    id: 'courses',
    title: 'Courses & Activities',
    icon: '👶',
    description: 'Organisations offer (language) courses and activities that you can follow.'
  },
  {
    id: 'feedback',
    title: 'Feedback',
    icon: '📝',
    description: 'Give us feedback on this website! For example if you miss information or information is incorrect.'
  },
  {
    id: 'helpdesk',
    title: 'Helpdesk and Social Support',
    icon: '🛈',
    description: 'Give us feedback on this website! For example if you miss information or information is incorrect.'
  },
  
  
  
];

// // Update the resources with more direct language and clearer information
// export const resources: Record<string, Resource[]> = {
//   'where-to-go': [
//     {
//       id: "red-cross-helpdesk",
//       title: "Red Cross WhatsApp Helpline",
//       description: "The Red Cross helpline is here to help you with any needs you have, by finding the right help for you.",
//       icon: "❓",
//       source: "Red Cross Netherlands",
//       lastUpdated: "2024-01-29",
//       details: {
//         openingHours: {
//           weekdays: "Monday-Friday: 10:00-18:00",
//           weekends: "Weekends/Holidays: limited capacity"
//         },
//         contact: {
//           whatsapp: "+31 970 10286964"
//         }
//       }
//     },
//     {
//       id: "world-house",
//       title: "The Hague World House",
//       description: "The Worldhouse is a safe center for undocumented migrants. They can help you with questions about shelter, your legal situation, and health.",
//       icon: "🏠",
//       source: "The Hague World House",
//       lastUpdated: "2024-01-29",
//       details: {
//         openingHours: {
//           weekdays: "Monday: 10:00 - 14:00, Thursday: 13:00 - 15:00",
//           weekends: "During the winter on Saturdays: 10:30-15:00"
//         },
//         contact: {
//           phone: "+31 70 318 1673 or +31 70 318 1658",
//           whatsapp: "+31 6 57 54 72 69",
//           email: "dhwereldhuis@stekdenhaag.nl",
//           website: "https://denhaagwereldhuis.nl/home"
//         },
//         address: "Hooftskade 87, 2526 KB Den Haag",
//         emergencyContact: {
//           phone: "+31 70 318 1616",
//           hours: "Monday - Friday: 08:00 - 17:00"
//         },
//         notes: "You can visit or call The Worldhouse during consultation hours without an appointment. They can assist with shelter, legal situations, and health issues."
//       }
//     },
//     {
//       id: 'lvv-rotterdam',
//       title: 'LVV Rotterdam',
//       description: 'In case you got a negative decision for asylum and you are from the Hague, this office may be able to help you get into the LVV program and to help you with 24-hour shelter.',
//       icon: '🏠',
//       source: 'Rotterdam Municipality',
//       lastUpdated: '2024-01-29',
//       details: {
//         openingHours: {
//           weekdays: "Monday - Friday: 08:30 - 11:30",
//           weekends: "Closed"
//         },
//         contact: {
//           phone: "14 010",
//           email: "vreemdelingenloketMO@rotterdam.nl",
//           website: "https://www.rotterdam.nl/centraal-onthaal"
//         },
//         notes: `The LVV program is a government program where you get a place in a 24-hour shelter for 6 months. During this time, social workers will support you to find a solution to your situation: a residence permit, migrating to another country, or returning to your home country. People from the Hague can go here for help.

// To get a place in the LVV program, you have to register with one of the two NGOs included in the LVV program: Stichting ROS or Vluchtelingenwerk. You can also visit ROS, Pauluskerk, or VluchtelingenWerk for more information about the program. There is no waiting list in Rotterdam, but not everyone is accepted. 
// Criteria include: 
//  - Being 18 years or older.
// - Not having a legal permit to stay in the Netherlands.
// - Being from an unsafe country (decided by the Dutch Government).
// - Not having the right to stay in an asylum seekers center.
// - Not being 'declared undesirable'.
// - Not having a residence permit in the EU.
// - Not having a Dublin claim.
// - Showing willingness to cooperate in a realistic process and signing an agreement.
// - Not having participated in an LVV shelter before.
// - Having a connection with the Rotterdam region.`
//       }
//     }
//   ],
//   shelter: [],
//   'day-shelter': [
//     {
//       id: 'world-house',
//       title: 'The Hague World House',
//       description: 'A safe center for undocumented migrants, offering support for shelter, legal issues, and health. The Day Shelter provides a place to stay during the day and access to resources.',
//       icon: '☀️',
//       source: 'The Hague World House',
//       lastUpdated: '2024-01-29',
//       details: {
//         address: 'Hooftskade 87, 2526 KB Den Haag',
//         openingHours: {
//           weekdays: 'Monday - Friday: 10:00-15:00',
//           weekends: 'Closed',
//         },
//         contact: {
//           phone: '+31 70 318 1673',
//           whatsapp: '+31 6 57 54 72 69',
//           email: 'dhwereldhuis@stekdenhaag.nl',
//           website: 'https://denhaagwereldhuis.nl/home',
//         },
//         notes: 'Open to all migrants in need of a safe space and support during the day.',
//       },
//     },
//   ],
//   'night-shelter': [
//     {
//       id: 'winter-shelter',
//       title: 'Winter Shelter',
//       description: 'Available for people without a BSN when it is too cold to sleep outside. This shelter provides warmth and safety during extreme weather conditions.',
//       icon: '❄️',
//       source: 'Red Cross Netherlands',
//       lastUpdated: '2024-01-29',
//       details: {
//         address: 'Various locations (check Red Cross for current sites)',
//         openingHours: {
//           weekdays: 'Open nightly during winter months when temperatures drop below 0°C.',
//           weekends: 'Open nightly during winter months when temperatures drop below 0°C.',
//         },
//         contact: {
//           phone: '+31 88 022 2300',
//           website: 'https://www.rodekruis.nl/winteropvang',
//         },
//         notes: 'Please arrive early as space may be limited. Bring necessary items such as warm clothing and personal belongings.',
//       },
//     },
//   ],
//   'health': [
//     {
//       id: 'doctors-world',
//       title: 'Doctors of the World',
//       description: 'Medical consultation for people without insurance or legal status.',
//       icon: '⚕️',
//       source: 'Doctors of the World',
//       lastUpdated: '2024-01-29',
//       details: {
//         openingHours: 'Tuesday & Thursday: 10:00-16:00',
//         address: 'Parallel Street 15, The Hague'
//       }
//     }
//   ],
//   'dentist': [
//     {
//       id: 'dental-care',
//       title: 'Tandarts',
//       description: 'Undocumented migrants can go to any dentist for aid. However, everyone has to pay aid in full. For children below 18, the costs of normal dental care are partly reimbursed through the CAK.',
//       icon: '🦷',
//       source: 'Dental Care Foundation',
//       lastUpdated: '2024-01-29',
//       details: {
//         openingHours: {
//           weekdays: 'This depends on the dentist',
//           weekends: 'This depends on the dentist'
//         },
//         notes: `Via the links below you can find an overview of dentists in The Hague. You have to call them and make an appointment before you can go to one.  

// You can find all dentists in the city of The Hague via this link: https://www.tandarts.nl/tandarts-den-haag  

// You can find dental service when you have an emergency during the evenings and weekend in The Hague via this link: https://www.tandarts.nl/spoedtandarts/den-haag

// You can find dental service when you have an emergency during the evenings and weekend for the province of South Holland via this link: https://www.tandarts.nl/spoedtandarts/zuid-holland`,
//         website: 'https://www.tandarts.nl/'
//       }
//     }
//   ],
//   'safety': [
//     {
//       id: 'safe-house',
//       title: 'Safe House',
//       description: 'Confidential shelter for people facing dangerous situations.',
//       icon: '🛡️',
//       source: 'Safety Network NL',
//       lastUpdated: '2024-01-29',
//       details: {
//         openingHours: '24/7 Emergency Hotline Available'
//       }
//     }
//   ],
//   'food-clothing': [
//     {
//       id: 'food-bank',
//       title: 'Food Bank The Hague',
//       description: 'Weekly food packages for people in need.',
//       icon: '🥗',
//       source: 'Food Bank Foundation',
//       lastUpdated: '2024-01-29',
//       details: {
//         openingHours: 'Wednesday & Friday: 13:00-16:00',
//         requirements: 'Registration required'
//       }
//     }
//   ],
//   'work': [
//     {
//       id: 'work-rights',
//       title: 'Work Rights Information',
//       description: 'Information about your rights as a worker in the Netherlands.',
//       icon: '💼',
//       source: 'FairWork Foundation',
//       lastUpdated: '2024-01-29',
//       details: {
//         openingHours: 'Monday - Thursday: 9:00-17:00'
//       }
//     }
//   ],
//   'asylum': [
//     {
//       id: 'asylum-info',
//       title: 'Asylum Information Point',
//       description: 'Information about the asylum procedure in the Netherlands.',
//       icon: '📝',
//       source: 'Dutch Council for Refugees',
//       lastUpdated: '2024-01-29',
//       details: {
//         openingHours: 'Monday - Friday: 9:00-16:30',
//         address: 'Central Location, The Hague'
//       }
//     }
//   ],
//   'legal': [
//     {
//       id: 'legal-desk',
//       title: 'Legal Information Desk',
//       description: 'Free legal advice for people without documents.',
//       icon: '⚖️',
//       source: 'Legal Aid Foundation',
//       lastUpdated: '2024-01-29',
//       details: {
//         openingHours: 'Tuesday & Thursday: 14:00-16:00',
//         requirements: 'No appointment needed'
//       }
//     }
//   ],
//   'missing': [
//     {
//       id: 'tracing',
//       title: 'Red Cross Tracing Service',
//       description: 'Help with finding family members you have lost contact with.',
//       icon: '🔍',
//       source: 'Red Cross Netherlands',
//       lastUpdated: '2024-01-29',
//       details: {
//         openingHours: 'Monday - Friday: 9:00-17:00',
//         requirements: 'Bring any information you have about your missing relatives'
//       }
//     }
//   ],
//   'women': [
//     {
//       id: 'women-center',
//       title: 'Women\'s Support Center',
//       description: 'Safe space and support services specifically for women.',
//       icon: '👩',
//       source: 'Women\'s Network',
//       lastUpdated: '2024-01-29',
//       details: {
//         openingHours: 'Monday - Friday: 10:00-18:00',
//         address: 'Confidential location provided upon contact'
//       }
//     }
//   ],
//   'children': [
//     {
//       id: 'youth-support',
//       title: 'Youth Support Services',
//       description: 'Support and activities for young people under 18.',
//       icon: '👶',
//       source: 'Youth Care Foundation',
//       lastUpdated: '2024-01-29',
//       details: {
//         openingHours: 'Monday - Friday: 9:00-17:00',
//         requirements: 'Open to all young people under 18'
//       }
//     }
//   ],
//   'feedback': [
//     {
//       id: 'feedback-form',
//       title: 'Feedback Form',
//       description: 'We value your feedback! Please fill out the form below to share your thoughts or suggestions.',
//       icon: '📝',
//       source: 'IFRC',
//       lastUpdated: '2024-01-29',
//       details: {
//         formEmbedUrl: 'https://ee.ifrc.org/x/hUvqfxtS'
//       }
//     }
//   ],
//   'helpdesk': [
//     {
//       id: 'raad-helpdesk',
//       title: 'Raad en Daad Helpdesk',
//       description: 'You can come to the Raad en Daad desk for free advice and aid.',
//       icon: '🩹',
//       source: 'Red Cross Website',
//       lastUpdated: '2025-01-29',
//       details: {
//         openingHours: {
//           weekdays: 'Friday: 12:30-14:30',
//           weekends: "Closed"},
//         address: 'Jonckbloetplein 24, 2523 AR Den Haag',
//         contact: {
//           phone: "+31 070-2052410"
//         },
//       }
//     },
//     {
//       id: 'redcross-helpdesk',
//       title: 'Red Cross Humanitarian Helpdesk',
//       description: 'Do you have questions about your rights, food aid, finances, mental wellbeing, health care, legal support or shelter? The Red Cross can help or give advice. Walk in during the opening hours of the helpdesk!',
//       icon: '➕',
//       source: 'Red Cross Website',
//       lastUpdated: '2025-01-29',
//       details: {
//         openingHours: {
//           weekdays: "Thursday: 12:00 - 16:00",
//           weekends: "Closed"
//         },
//         address: 'Jonckbloetplein 24, 2523 AR Den Haag',
//         contact: {
//           email: "helpdesk.haaglanden@rodekruis.nl",
//       },
//     },
//     }
//   ]
// };

// Add emergency contacts
export const emergencyContacts = [
  {
    name: 'Emergency Number',
    number: '112',
    description: 'For life-threatening situations'
  },
  {
    name: 'Red Cross WhatsApp',
    number: '+31 97 010 286 964',
    whatsapp: true,
    description: 'Get help in your language'
  },
  {
    name: 'Women\'s Crisis Line',
    number: '+31 70 345 6789',
    description: 'For women who feel unsafe'
  }
];
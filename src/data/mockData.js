export const borrowerProfile = {
  id: 'BOR001',
  name: 'Rajesh Kumar',
  phone: '+91 9876543210',
  kycStatus: 'verified',
  creditScore: 720,
};

export const activeLoan = {
  id: 'LA001',
  amount: 25000,
  status: 'disbursed',
  purpose: 'Business',
  emi: 2150,
  tenure: 6,
  nextDueDate: '15 Dec 2025',
};

export const loans = [
  {
    id: 'LA001',
    amount: 25000,
    status: 'disbursed',
    emi: 2150,
    dueDate: '15 Dec 2025',
  },
  {
    id: 'LA002',
    amount: 15000,
    status: 'approved',
  },
  {
    id: 'LA003',
    amount: 30000,
    status: 'pending',
  },
];

export const emiSchedule = [
  { no: 1, amount: 2150, date: '15 Oct 2025', status: 'paid' },
  { no: 2, amount: 2150, date: '15 Nov 2025', status: 'paid' },
  { no: 3, amount: 2150, date: '15 Dec 2025', status: 'upcoming' },
  { no: 4, amount: 2150, date: '15 Jan 2026', status: 'upcoming' },
  { no: 5, amount: 2150, date: '15 Feb 2026', status: 'upcoming' },
  { no: 6, amount: 2150, date: '15 Mar 2026', status: 'upcoming' },
];

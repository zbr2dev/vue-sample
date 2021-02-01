export default [
  'Unassigned',
  'Assigned',
  'Pending',
  'Confirmed',
  'Accepted',
  'Dispatched',
  'Arrived',
  'Cycling',
  'Waiting(free)',
  'Waiting (paid)',
  'Chauffeuring',
  'At the stop',
  'Completed',
  'Canceled',
].map((el) => ({ label: el, value: el }));
// Track

const live_admissions = [{}];
const school_trips = [{}];

enum ExamEvent {
  RESULTS,
  CENTER,
  HALL_TICKET,
}
enum EventTypes {
  SCHOOL_TRIPS,
  LIVE_ADMISSIONS,
}

const event_list = [ExamEvent, EventTypes];

const track_event = [
  {
    event_name: event_list,
    event_date: "",
    associated_participants: [
      {
        name: "",
        role: "",
      },
    ],
  },
];

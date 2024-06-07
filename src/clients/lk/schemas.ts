import { z } from 'zod';

export const userDataSchema = z.object({
  guid_person: z.string(),
  group: z.string(),
  name: z.string(),
  surname: z.string(),
  patronymic: z.string(),
  course: z.string(),
  specialty: z.string(),
  specialty_code: z.string(),
  specialization: z.string(),
  birthday: z.string(),
  degreeLength: z.string(),
  learn_status: z.string(),
  faculty: z.string(),
  educationForm: z.string(),
  finance: z.string(),
  degreeLevel: z.string(),
  enterYear: z.string(),
  sex: z.string(),
});

export const userAvatarSchema = z.object({
  user: z.object({
    avatar: z.string(),
  }),
});

export const lessonSchema = z.object({
  name: z.string(),
  dateInterval: z.string(),
  link: z.string().nullable(),
  place: z.string(),
  timeInterval: z.string(),
  teachers: z.array(z.string()),
  rooms: z.array(z.string()),
});

export const studentScheduleSchema = z.record(
  z.object({ lessons: z.array(lessonSchema) }),
);

// export const studentScheduleSchema = z.object({
//   Monday: z.object({ lessons: z.array(lessonSchema) }),
//   Tuesday: z.object({ lessons: z.array(lessonSchema) }),
//   Wednesday: z.object({ lessons: z.array(lessonSchema) }),
//   Thursday: z.object({ lessons: z.array(lessonSchema) }),
//   Friday: z.object({ lessons: z.array(lessonSchema) }),
//   Saturday: z.object({ lessons: z.array(lessonSchema) }),
// });

export const pdInfoSchema = z.object({
  curator: z.string(),
  current_att1: z.string(),
  current_att2: z.string(),
  current_att_mid: z.string(),
  current_semestr_balls: z.string(),
  current_semestr_result: z.string(),
  last_semestr_balls: z.string(),
  last_semestr_result: z.string(),
  project: z.string(),
  project_theme: z.string(),
  subproject: z.string(),
});

export const newsSchema = z.object({
  title: z.string(),
  content: z.string(),
  date: z.string(),
  time: z.string(),
  id: z.string(),
});

export const academicPerformanceSchema = z.object({
  bill_num: z.string(),
  chair: z.string(),
  exam_date: z.string(),
  exam_time: z.string(),
  exam_type: z.string(),
  grade: z.string(),
  id: z.string(),
  name: z.string(),
  teacher: z.string(),
});

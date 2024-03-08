import { z } from 'zod';

export const userDataSchema = z.object({
  guid_person: z.string(),
  user_status: z.enum(['stud', 'staff']),
  group: z.string(),
  name: z.string(),
  surname: z.string(),
  patronymic: z.string(),
  course: z.string(),
  specialty: z.string(),
  specialty_code: z.string(),
  specialization: z.string(),
});

export const userAvatarSchema = z.object({
  user: z.object({
    avatar: z.string(),
  }),
});

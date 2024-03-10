import type { lessonSchema, studentScheduleSchema } from './schemas';
import type { z } from 'zod';

export type Lesson = z.infer<typeof lessonSchema>;
export type StudentSchedule = z.infer<typeof studentScheduleSchema>;

import type { getStudentSchema } from './schemas';
import type { z } from 'zod';

export type StudentData = z.infer<typeof getStudentSchema>;

import { z } from 'zod';

const envSchema = z.object({
	GOOGLE_API_KEY: z.string().optional(),
	GOOGLE_CALENDAR_ID: z.string().optional(),

	GITHUB_TOKEN: z.string().min(1),
});

export const validateEnv = () => {
	const parsed = envSchema.safeParse(process.env);

	if (!parsed.success) {
		console.error('❌ Invalid environment variables:', parsed.error.format());
		process.exit(1);
	}

	return parsed.data;
};

export type Env = z.infer<typeof envSchema>;

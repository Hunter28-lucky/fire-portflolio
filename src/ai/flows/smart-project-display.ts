'use server';

/**
 * @fileOverview This file defines a Genkit flow for curating top projects for a freelancer's portfolio.
 *
 * It uses AI to select projects based on performance and relevance.
 * - getTopProjects - A function that retrieves the curated list of top projects.
 * - TopProjectsInput - The input type for the getTopProjects function.
 * - TopProjectsOutput - The return type for the getTopProjects function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TopProjectsInputSchema = z.object({
  freelancerSkills: z
    .string()
    .describe('A comma-separated list of the freelancer\'s skills.'),
  projectDescriptions: z
    .string()
    .describe('A comma-separated list of project descriptions.'),
  projectPerformanceMetrics: z
    .string()
    .describe(
      'A comma-separated list of project performance metrics (e.g., client satisfaction, completion rate, revenue generated) for each project.'
    ),
});
export type TopProjectsInput = z.infer<typeof TopProjectsInputSchema>;

const TopProjectsOutputSchema = z.object({
  topProjects: z
    .string()
    .describe(
      'A comma-separated list of the top projects curated by the AI, based on relevance to skills and performance metrics.'
    ),
});
export type TopProjectsOutput = z.infer<typeof TopProjectsOutputSchema>;

export async function getTopProjects(input: TopProjectsInput): Promise<TopProjectsOutput> {
  return getTopProjectsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'topProjectsPrompt',
  input: {schema: TopProjectsInputSchema},
  output: {schema: TopProjectsOutputSchema},
  prompt: `You are an AI assistant helping a freelancer curate their portfolio.

  Given the freelancer's skills, project descriptions, and performance metrics, select the top projects that best showcase their expertise and success.

  Freelancer Skills: {{{freelancerSkills}}}
  Project Descriptions: {{{projectDescriptions}}}
  Project Performance Metrics: {{{projectPerformanceMetrics}}}

  Based on this information, curate a list of the top projects that would be most impressive to potential clients.
  The list should be comma seperated.`,
});

const getTopProjectsFlow = ai.defineFlow(
  {
    name: 'getTopProjectsFlow',
    inputSchema: TopProjectsInputSchema,
    outputSchema: TopProjectsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

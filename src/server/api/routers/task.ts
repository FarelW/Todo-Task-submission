import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

const isValidDate = (dateString: string) => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

export const taskRouter = createTRPCRouter({
  getTask: publicProcedure
    .input(
      z.object({
        limit: z.number().default(10),
        offset: z.number().default(0),
        search: z.string().default(""),
        filter: z.string().default(""),
      }),
    )
    .query(async ({ ctx, input }) => {
      if (input.filter=="done") {
        return(
          await ctx.db.task.findMany({
            where: {
              OR: [
                {
                  title: {
                    contains: input.search,
                    mode: 'insensitive',
                  },
                },
                {
                  description: {
                    contains: input.search,
                    mode: 'insensitive',
                  },
                },
              ],
              isDone: true
            },
            skip: input.offset,
            take: input.limit,
            orderBy: {
              duedate: 'asc',
            },
          })
        )
      } else if (input.filter=="undone") {
        return(
          await ctx.db.task.findMany({
            where: {
              OR: [
                {
                  title: {
                    contains: input.search,
                    mode: 'insensitive',
                  },
                },
                {
                  description: {
                    contains: input.search,
                    mode: 'insensitive',
                  },
                },
              ],
              isDone: false
            },
            skip: input.offset,
            take: input.limit,
            orderBy: {
              duedate: 'asc',
            },
          })
        )
      } else {
        return(
          await ctx.db.task.findMany({
            where: {
              OR: [
                {
                  title: {
                    contains: input.search,
                    mode: 'insensitive',
                  },
                },
                {
                  description: {
                    contains: input.search,
                    mode: 'insensitive',
                  },
                },
              ],
            },
            skip: input.offset,
            take: input.limit,
            orderBy: {
              duedate: 'asc',
            },
          })
        )
      }
    }),

  addTask: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        duedate: z.string().refine(isValidDate, {
          message: "Invalid date format",
        }).transform((val) => new Date(val)),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { title, description, duedate } = input;
  
      const newTask = await ctx.db.task.create({
        data: {
          title,
          description,
          duedate,
        },
      });
  
      return newTask;
    }),

  deleteTask: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;

      const deletedTask = await ctx.db.task.delete({
        where: {
          id,
        },
      });

      return deletedTask;
    }),

  markDone: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;

      const changeMark = await ctx.db.task.update({
        where: {
          id,
        },
        data: {
          isDone: true,
        },
      });

      return changeMark;
    }),

    markUndone: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;

      const changeMark = await ctx.db.task.update({
        where: {
          id,
        },
        data: {
          isDone: false,
        },
      });

      return changeMark;
    }),
  
});
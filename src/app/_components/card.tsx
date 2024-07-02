"use client";

import { api } from "@/trpc/react";
import { Button, IconButton, type UseToastOptions } from "@chakra-ui/react";
import { type Task } from "@prisma/client";
import { type QueryObserverResult } from "@tanstack/react-query";
import { FaTrashAlt } from "react-icons/fa";

interface CardProps {
    content: Task;
    toast: (options?: UseToastOptions) => void;
    refetch: () => Promise<QueryObserverResult<unknown, unknown>>;
}

const truncateDescription = (description: string | null, maxLength: number) => {
    if (!description) return 'No description provided';
    return description.length > maxLength
        ? description.substring(0, maxLength) + '...'
        : description;
};

export const Card: React.FC<CardProps> = ({ content, toast, refetch }) => {
    const markDoneMutation = api.task.markDone.useMutation({
        onSuccess: async () => {
            toast({
                title: "Task marked as done.",
                description: `Task ${content.title} has been marked as done.`,
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            await refetch();
        },
        onError: (error) => {
            toast({
                title: "Error.",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            void refetch();
        },
    });

    const markUndoneMutation = api.task.markUndone.useMutation({
        onSuccess: async () => {
            toast({
                title: "Task marked as undone.",
                description: `Task ${content.title} has been marked as undone.`,
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            await refetch();
        },
        onError: (error) => {
            toast({
                title: "Error.",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            void refetch();
        },
    });

    const deleteTaskMutation = api.task.deleteTask.useMutation({
        onSuccess: async () => {
            toast({
                title: "Task deleted.",
                description: `Task ${content.title} has been deleted.`,
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            await refetch();
        },
        onError: (error) => {
            toast({
                title: "Error.",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            void refetch();
        },
    });

    const handleMarkDone = (id: string) => {
        markDoneMutation.mutate({ id });
    };

    const handleMarkUndone = (id: string) => {
        markUndoneMutation.mutate({ id });
    };

    const handleDelete = (id: string) => {
        deleteTaskMutation.mutate({ id });
    };

    return (
        <div className="flex items-center gap-3 py-2 px-2 md:px-5 w-[300px] md:w-[700px] h-[60px] md:h-[120px] rounded-md md:rounded-xl text-white backdrop-blur-sm bg-white/10 hover:bg-white/15 transition-all duration-300">
            <div className="flex-col w-[78%]">
                <div className="text-xs md:text-2xl font-bold">{content.title}</div>
                <div className="text-[8px] md:text-base font-medium">{truncateDescription(content.description, 40)}</div>
                <div className="text-[8px] md:text-base font-medium">Due Date: <span className="text-red-400">{content.duedate ? new Date(content.duedate).toLocaleDateString() : 'No Due Date'}</span></div>
            </div>
            {content.isDone ? 
                <Button colorScheme='red' fontSize={{ base: 8, md: 15 }} width={{ base: 20, md: 40 }} height={{ base: 7, md: 10 }} onClick={() => handleMarkUndone(content.id)}>Mark as Undone</Button>
                : 
                <Button colorScheme='green' fontSize={{ base: 8, md: 15 }} width={{ base: 20, md: 40 }} height={{ base: 7, md: 10 }} onClick={() => handleMarkDone(content.id)}>Mark as Done</Button>
            }
            <IconButton
                colorScheme='red'
                aria-label='Delete task'
                icon={<FaTrashAlt />}
                onClick={() => handleDelete(content.id)}
                width={{ base: 7, md: 10 }}
                height={{ base: 7, md: 10 }}
            />
        </div>
    );
};

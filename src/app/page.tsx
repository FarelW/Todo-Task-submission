"use client";

import { FaPlus } from "react-icons/fa";
import { api } from "@/trpc/react";
import { Button, IconButton, Input, Select, useToast } from '@chakra-ui/react';
import { type Task } from "@prisma/client";
import { useEffect, useState } from "react";
import { Card } from "./_components/card";

export default function Home() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('none');
  const [isOpenTask, setIsOpenTask] = useState<boolean>(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duedate, setDueDate] = useState('');
  const toast = useToast();

  const {
    data: tasks,
    refetch,
  } = api.task.getTask.useQuery({
    search: search,
    filter: filter,
  });

  useEffect(() => {
    void refetch(); // Use void to explicitly ignore the promise
  }, [search, filter, refetch]);

  const addTaskMutation = api.task.addTask.useMutation({
    onSuccess: () => {
      toast({
        title: "Task added.",
        description: "Your task has been added successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setTitle('');
      setDescription('');
      setDueDate('');
      setIsOpenTask(false);
      void refetch(); // Use void to explicitly ignore the promise
    },
    onError: (error) => {
      toast({
        title: "Error.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTaskMutation.mutate({
      title,
      description,
      duedate: duedate ? new Date(duedate).toISOString() : "",
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <h1 className="mt-14 sm:mt-10 text-3xl sm:text-5xl text-white">
        Todo List
      </h1>
      <div className="flex gap-2 sm:gap-4 mt-10 sm:mt-20">
        <Input
          placeholder='Search'
          width={{base:170, sm:290, md:480}}
          height={{base:8, sm:10, md:12}}
          fontSize={{base:10, sm:12, md:15}}
          _placeholder={{ opacity: 1, color: 'gray.200' }}
          color="gray.200"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          defaultValue='none'
          width={{base:108, sm:110, md:180}}
          height={{base:8, sm:10, md:12}}
          fontSize={{base:8, sm:12, md:15}}
          color="gray.200"
          _placeholder={{ opacity: 1, textColor: 'gray.300' }}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value='none' className="text-black">None</option>
          <option value='done' className="text-black">Completed</option>
          <option value='undone' className="text-black">Not Completed</option>
        </Select>
        <IconButton
          width={{base:6, sm:8, md:12}}
          height={{base:8, sm:10, md:12}}
          fontSize={{base:10, sm:12, md:15}}
          variant="outline"
          color="white"
          aria-label="Add task"
          icon={<FaPlus />}
          className="hover:text-black transition-all duration-300"
          onClick={() => setIsOpenTask(true)}
        />
      </div>
      <div className="flex-col space-y-2 md:space-y-6 mt-6 sm:mt-12 mb-20">
        {tasks?.map((task: Task) => (
          <Card key={task.id} content={task} toast={toast} refetch={refetch} />
        ))}
      </div>
      {isOpenTask && 
        <div className="fixed w-screen h-screen bg-black bg-opacity-25">
          <div className="flex w-screen h-screen justify-center items-center">
            <div className="relative p-6 sm:p-10 sm:w-[500px] sm:h-[450px] bg-gray-100 rounded-xl">
              <form className=" space-y-2 sm:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-gray-600 text-sm sm:text-xl font-semibold mb-2">
                    Title
                  </label>
                  <Input
                    placeholder="Enter title"
                    _placeholder={{ textColor: 'gray.600' }}
                    variant="outline"
                    size={{base:"sm", md:"md"}}
                    className="w-screen"
                    borderColor="black"
                    _hover={{ borderColor: 'black' }}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-600 text-sm sm:text-xl font-semibold mb-2">
                    Description
                  </label>
                  <Input
                    placeholder="Enter description"
                    _placeholder={{ textColor: 'gray.600' }}
                    variant="outline"
                    size={{base:"sm", md:"md"}}
                    className="w-screen"
                    borderColor="black"
                    _hover={{ borderColor: 'black' }}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-600 text-sm sm:text-xl font-semibold mb-2">
                    Due Date
                  </label>
                  <Input
                    type="date"
                    _placeholder={{ textColor: 'gray.600' }}
                    variant="outline"
                    size={{base:"sm", md:"md"}}
                    className="w-screen"
                    borderColor="black"
                    _hover={{ borderColor: 'black' }}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button
                    colorScheme="teal"
                    size={{base:"sm", md:"md"}}
                    className="mt-2 sm:mt-4"
                    type="submit"
                  >
                    Submit
                  </Button>
                  <Button
                    colorScheme="red"
                    size={{base:"sm", md:"md"}}
                    className="mt-2 sm:mt-4"
                    onClick={() => setIsOpenTask(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      }
    </main>
  );
}

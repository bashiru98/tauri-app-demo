"use client";

import { TbArrowBarDown } from "react-icons/tb";
import { useEffect, useState } from "react";
import ListItem from "@/components/ListItem";
import { invoke } from "@tauri-apps/api/tauri";
import Link from "next/link";

export default function Home() {
  const [todo, setTodo] = useState("");
  const [allTodos, setAllTodos] = useState<any>([]);

  const addTodo = (e: any) => {
    e.preventDefault();

    const todoItem = {
      id: new Date().getTime(),
      text: todo,
      isChecked: false,
    };

    if (todo !== "") {
      setAllTodos([...allTodos].concat(todoItem).reverse());
      setTodo("");
      invoke("log_todo", { addedTodo: todo });
      console.log("added", todo);
    }
    console.log(allTodos);
  };

  const getAllTodos = () => {
    // @ts-ignore
    let stored = JSON.parse(localStorage.getItem("todo"));

    if (stored) {
      setAllTodos(stored);
    }
  };

  const toggleChecked = (id: any) => {
    let updatedTodos = [...allTodos].map((todo) => {
      if (todo.id === id) {
        todo.isChecked = !todo.isChecked;
      }

      return todo;
    });

    setAllTodos(updatedTodos);
  };

  const deleteTodo = (id: any) => {
    const filteredTodo = allTodos.filter((todo: any) => todo.id !== id);
    setAllTodos(filteredTodo);
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(allTodos));
  }, [allTodos]);

  return (
    <div className="relative flex items-center justify-center h-screen w-screen bg-[#181824]">
      <Link href={"/weather"}>
        <p className="absolute bottom-8 right-8 text-sky-300 cursor-pointer">
          See weather updates
        </p>
      </Link>
      <div className="h-[28rem] w-[28rem] ">
        <form
          className="flex items-center w-full h-[2.5rem] bg-[#25273c] rounded-[15px] overflow-hidden "
          onSubmit={addTodo}>
          <input
            type={"text"}
            className="flex-1 outline-none border-none px-[1rem] text-[1rem] bg-transparent text-white "
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <div
            className="w-[3rem] h-full bg-[#4ec032] flex items-center justify-center text-white cursor-pointer  "
            onClick={addTodo}>
            <TbArrowBarDown size={24} />
          </div>
        </form>

        <div className="bg-[#25273c] h-full mt-[2rem] overflow-auto  ">
          {allTodos.map((todo: any) => (
            <ListItem
              key={todo.id}
              deleteTodo={() => deleteTodo(todo.id)}
              text={todo.text}
              isChecked={todo.isChecked}
              toggleChecked={() => toggleChecked(todo.id)}
            />
          ))}

          {allTodos.length === 0 && (
            <p className="text-white text-center mt-[6rem] text-[1.5rem] ">
              There are no Todo's
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

import { NextPage } from "next";
import Link from "next/link"
import { useEffect } from "react";

export function makeElementDraggable(elementId: string): void {
    const dragElement = document.getElementById(elementId);
    let initLeft: number = 0, initTop: number = 0, mouseX: number = 0, mouseY: number = 0;
  
    dragElement?.addEventListener('mousedown', dragMouseDown);
  
    function dragMouseDown(e: MouseEvent): void {
      e.preventDefault();
      // Get the initial mouse position
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Get the initial element position
      initLeft = dragElement!.offsetLeft;
      initTop = dragElement!.offsetTop;
      document.addEventListener('mouseup', closeDragElement);
      document.addEventListener('mousemove', elementDrag);
    }
  
    function elementDrag(e: MouseEvent): void {
      e.preventDefault();
      // Calculate the new element position
      const elementX = initLeft + e.clientX - mouseX;
      const elementY = initTop + e.clientY - mouseY;
      dragElement!.style.left = elementX + "px";
      dragElement!.style.top = elementY + "px";
    }
  
    function closeDragElement(): void {
      document.removeEventListener('mouseup', closeDragElement);
      document.removeEventListener('mousemove', elementDrag);
    }
  }

const NavBar: NextPage = () => {
    useEffect(() => {
        makeElementDraggable('draggable-element');
    }, []);
  
    return (
        <nav id='draggable-element' className="absolute bottom-0 inline-flex justify-center content-center items-center max-w-s rounded-md bg-zinc-900/80 p-2 mb-10 h-16">
            <Link href='/'>
                <button
                className="rounded-md bg-neutral-900 w-20 py-3 text-white no-underline transition hover:bg-white/20 mr-2"
                >
                  Home
                </button>
            </Link>
            <input
            type='text'
            placeholder="Search"
            className="transition duration-150 ease-out border border-neutral-700 rounded-full bg-white/10 w-10 hover:w-1/6 active:w-1/6 focus:outline-none py-3 text-white no-underline transition hover:bg-white/20 hover:ease-in active:ease-in mr-2 p-3"
            />
            <Link href='/feed'>
                <button
                className="border border-neutral-700 rounded-md bg-white/10 w-20 py-3 text-white no-underline transition hover:bg-white/20 mr-1"
                >
                  Feed
                </button>
            </Link>
            <Link href='/profile'>
                <button
                className="border border-neutral-700 rounded-md bg-white/10 w-24 py-3 text-white no-underline transition hover:bg-white/20"
                >
                  Profile
                </button>
            </Link>
        </nav>
    )
  }

  export default NavBar
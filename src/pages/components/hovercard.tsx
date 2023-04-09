import type { NextPage } from "next";
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import Image from "next/image";
// import Link from "next/link";

import { jakartaSans } from "../_app";

const UserProfileHoverCard: NextPage<{ url: string, firstName: string | null , userName: string | null, userBio: string}> = (
  { url, firstName, userName, userBio }) => (

  <HoverCardPrimitive.Root>

    <HoverCardPrimitive.Trigger asChild>
      {/* <Link
        className="cursor-pointer h-12 w-12 rounded-full inline-block"
        href={link}
      > */}
        <Image className="rounded-full w-12 h-11 bg-neutral-800 cursor-pointer" src={url} height={50} width={50} alt="Profile Picture" />
      {/* </Link> */}
    </HoverCardPrimitive.Trigger>

    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content className={`${jakartaSans.variable} font-sans cursor-pointer backdrop-blur-md dark:bg-neutral-700/30 shadow-xl w-80 rounded-xl p-5 data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade data-[state=open]:transition-all`}>

        <div className="flex flex-col gap-7">
          <Image className="rounded-full bg-neutral-700/30" src={url} alt="User Avatar" width={60} height={60} />

          <div className="flex flex-col gap-15">

            <div className="leading-5">
              <div className="font-bold dark:text-white">{firstName}</div>
              <div className="mb-3 font-medium dark:text-neutral-400">@{userName}</div>
            </div>

            <p className="mb-3 dark:text-white">
              {userBio}
            </p>

            <div className="inline-flex justify-between gap-15">
              <div className="flex gap-3">
                <div className="font-bold dark:text-white">0</div> <div className="font-medium dark:text-neutral-400">Following</div>
              </div>
              <div className="flex gap-3 ml-3">
                <div className="font-bold dark:text-white">9000</div>
                 <div className="font-medium dark:text-neutral-400">Followers</div>
              </div>
            </div>

          </div>
        </div>
        <HoverCardPrimitive.Arrow className="backdrop-blur-md fill-neutral-700/30" />

      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Portal>

  </HoverCardPrimitive.Root>
);

export default UserProfileHoverCard;

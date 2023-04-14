import type { NextPage } from "next";
import { type RouterOutputs } from "~/utils/api";
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import Image from "next/image";
import Link from "next/link";

import { customFont } from "../_app";

type PostUser = RouterOutputs["posts"]["getOneById"]["user"];

const UserProfileHoverCard: NextPage< PostUser > = (
  { profileImageURL, id, firstName, userName }) => (

  <HoverCardPrimitive.Root>

    <HoverCardPrimitive.Trigger asChild>

      <Link href={`/user/${id}`} className="w-[50px] h-[50px]">
        <Image height={55} width={55} className="rounded-full bg-neutral-800 cursor-pointer" src={profileImageURL} alt="Profile Picture" />
      </Link>


    </HoverCardPrimitive.Trigger>

    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content className={`${customFont.variable} font-sans cursor-pointer backdrop-blur-lg dark:bg-neutral-700/30 shadow-xl w-56 rounded-xl p-5 data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade data-[state=open]:transition-all`}>

      <Link href={`/user/${id}`}>

        <div className="flex flex-col gap-7">
          <Image className="rounded-full bg-neutral-700/30" src={profileImageURL} alt="User Avatar" width={60} height={60} />

          <div className="flex flex-col gap-15">

            <div className="leading-5">
              <div className="font-bold dark:text-white">{firstName}</div>
              <div className="font-medium dark:text-neutral-400">@{userName}</div>
            </div>

            {/* <p className="mb-3 dark:text-white">
              This is a bio
            </p>

            <div className="inline-flex justify-between gap-15">
              <div className="flex gap-3">
                <div className="font-bold dark:text-white">0</div> <div className="font-medium dark:text-neutral-400">Following</div>
              </div>
              <div className="flex gap-3 ml-3">
                <div className="font-bold dark:text-white">9000</div>
                <div className="font-medium dark:text-neutral-400">Followers</div>
              </div>
            </div> */}

          </div>
        </div>
        <HoverCardPrimitive.Arrow className="backdrop-blur-md fill-neutral-700/30" />

        </Link>

      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Portal>

  </HoverCardPrimitive.Root>
)

export default UserProfileHoverCard;

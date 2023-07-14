import type { NextPage } from "next";
import { type RouterOutputs } from "~/utils/api";
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import Image from "next/image";
import Link from "next/link";

import { customFont } from "../_app";

type PostUser = RouterOutputs["posts"]["getOneById"]["user"];

const ProfileHoverCard: NextPage< PostUser > = ({ profileImageURL, id, firstName, userName }) => (

  <HoverCardPrimitive.Root openDelay={400} closeDelay={100}>

    <HoverCardPrimitive.Trigger asChild >

      <Link href={`/profile/${id}`} >
        <Image height={50} width={50} className="rounded-full bg-neutral-800 cursor-pointer h-[50px] w-[54px] max-md:w-[60px]" src={profileImageURL} alt="Profile Picture" />
      </Link>


    </HoverCardPrimitive.Trigger>

    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content className={`${customFont.variable} font-sans cursor-pointer backdrop-blur-lg dark:bg-neutral-700/30 shadow-xl w-48 rounded-xl p-5 data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade data-[state=open]:transition-all`}>

      <Link href={`/profile/${id}`}>

        <div className="flex flex-col gap-7">
          <Image className="rounded-full bg-neutral-800/30 h-16 w-16" src={profileImageURL} alt="User Avatar" width={60} height={60} />

          <div className="flex flex-col gap-15">

            <div className="leading-5">
              <div className="font-bold dark:text-white">{firstName}</div>
              <div className="text-neutral-00 dark:text-neutral-400">@{userName}</div>
            </div>

          </div>
        </div>
        <HoverCardPrimitive.Arrow className="backdrop-blur-md fill-neutral-100/30 dark:fill-neutral-700/30" />

        </Link>

      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Portal>

  </HoverCardPrimitive.Root>
)

export default ProfileHoverCard;

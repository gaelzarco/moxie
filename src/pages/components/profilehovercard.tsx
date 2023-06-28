import type { NextPage } from "next";
import { type RouterOutputs } from "~/utils/api";
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import Image from "next/image";
import Link from "next/link";

import { customFont } from "../_app";

type PostUser = RouterOutputs["posts"]["getOneById"]["user"];

const ProfileHoverCard: NextPage< PostUser > = ({ profileImageURL, id, firstName, userName }) => (

  <HoverCardPrimitive.Root openDelay={400} closeDelay={100}>

    <HoverCardPrimitive.Trigger asChild>

      <Link href={`/profile/${id}`} className="min-w-12 min-h-12">
        <Image height={55} width={55} className="rounded-full bg-neutral-800 cursor-pointer min-h-12 max-h-12 min-w-12 max-w-12" src={profileImageURL} alt="Profile Picture" />
      </Link>


    </HoverCardPrimitive.Trigger>

    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content className={`${customFont.variable} font-sans cursor-pointer backdrop-blur-lg dark:bg-neutral-700/30 shadow-xl w-48 rounded-xl p-5 data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade data-[state=open]:transition-all`}>

      <Link href={`/profile/${id}`}>

        <div className="flex flex-col gap-7">
          <Image className="rounded-full bg-neutral-700/30 h-16 w-16" src={profileImageURL} alt="User Avatar" width={60} height={60} />

          <div className="flex flex-col gap-15">

            <div className="leading-5">
              <div className="font-bold dark:text-white">{firstName}</div>
              <div className="font-medium dark:text-neutral-400">@{userName}</div>
            </div>

          </div>
        </div>
        <HoverCardPrimitive.Arrow className="backdrop-blur-md fill-neutral-700/30" />

        </Link>

      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Portal>

  </HoverCardPrimitive.Root>
)

export default ProfileHoverCard;

import type { NextPage } from "next";

import { UserNavDropDown } from "./dropdownmenus";

const NavBar: NextPage = () => {

    return (
      <div className="inline-flex p-5 pr-6 justify-between">
                  
        <UserNavDropDown />

      </div>
    )
  }

export default NavBar
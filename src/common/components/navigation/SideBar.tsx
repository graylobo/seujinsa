import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Menu, MenuItem, Sidebar, SubMenu, useProSidebar } from "react-pro-sidebar";
import styled from "styled-components";
import { useQuery } from "react-query";
import { getMenus } from "../../api/menu";
export default function SideBar() {
  const router = useRouter();
  const [sideBar, setSideBar] = useState(false);
  const { data, isLoading, error } = useQuery("getMenu", getMenus, {
    select: (data) => Object.entries(data.data.data),
  });

  function handleModalBackgroundClick(e: React.MouseEvent) {
    setSideBar(false);
  }
  return (
    <Wrapper id={`navbar ${sideBar ? "active" : ""}`}>
      <div id="nav-container">
        {sideBar && (
          <>
            <Modal onClick={handleModalBackgroundClick} />
            <Sidebar collapsedWidth="0" id="sidebar">
              <Menu className="menu-container">
                {data?.map(
                  (menu: any) =>
                    menu[1]["visible"] && (
                      <SubMenu key={menu[0]} label={menu[0]}>
                        {Object.entries(menu[1]["menuItems"]).map((menuItem: any) => (
                          <MenuItem
                            onClick={() => {
                              router.push(menuItem[1]["route"]);
                            }}
                            key={menuItem[0]}
                          >
                            {menuItem[0]}
                          </MenuItem>
                        ))}
                      </SubMenu>
                    )
                )}
              </Menu>
            </Sidebar>
          </>
        )}

        <Image
          id="more"
          width={25}
          height={25}
          src="/images/more.png"
          alt=""
          onClick={() => {
            setSideBar((e) => !e);
          }}
        />
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  top: 10px;
  padding-bottom: 30px;
  #nav-container {
    position: fixed;
    z-index: 99;
  }

  #more {
    z-index: 99;
    position: absolute;
    top: 0;
    cursor: pointer;
  }
  #sidebar {
    z-index: 99;
    position: absolute;
    left: 40px;
    border-right: 0;
    .ps-sidebar-container {
      border-radius: 10px;
    }
  }
`;
const Modal = styled.div`
  position: fixed;
  overflow: hidden;
  z-index: 98;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  opacity: 1;
  background-color: gray;
  opacity: 0.8;
`;

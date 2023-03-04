import { getMenus } from "api/menu";
import { themeState } from "common/recoil/states";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
export default function SideBar({ menu, setMenu }: any) {
  const router = useRouter();
  const theme = useRecoilValue(themeState);
  const { data, isLoading, error } = useQuery("getMenu", getMenus, {
    select: (data) => Object.entries(data.data.data),
  });

  function handleModalBackgroundClick(e: React.MouseEvent) {
    setMenu(false);
  }
  return (
    <Wrapper id={`navbar ${menu ? "active" : ""}`} className={theme}>
      <div id="nav-container">
        {menu && (
          <>
            <Modal onClick={handleModalBackgroundClick} />
            <Sidebar collapsedWidth="0" id="sidebar">
              <Menu className="menu-container">
                {data?.map(
                  (menu: any) =>
                    menu[1]["visible"] && (
                      <SubMenu className="sub-menu" key={menu[0]} label={menu[0]}>
                        {Object.entries(menu[1]["menuItems"]).map((menuItem: any) => (
                          <MenuItem
                            className="menu-item"
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
            setMenu((e: boolean) => !e);
          }}
        />
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  top: 10px;
  padding-bottom: 30px;

  &.dark {
    .sub-menu {
      .ps-open {
        background-color: black;
      }
      background-color: black;
      .menu-item {
        background-color: darkgray;
      }
    }
  }

  #nav-container {
    position: fixed;
    z-index: 99;
  }
  #more {
    z-index: 99;
    position: absolute;
    cursor: pointer;
  }
  #sidebar {
    z-index: 99;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
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

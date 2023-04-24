import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu } from "antd";
import { sidebarData } from "./../../utils/data";
import useLanguage from "./../../hooks/useLanguage";
import { useLocation, useHistory } from "react-router-dom";

function Sidebar() {
    const [selectedKeys, setSelectedKeys] = useState(["1"]);
    const translate = useLanguage();
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        for (let item of sidebarData) {
            if (item.path === location.pathname) {
                setSelectedKeys([`${item.id}`]);
            }
        }

        if (location.pathname === "/login" || location.pathname === "/") {
            history.push("/products");
        }
    }, [location]);

    return (
        <>
            <aside className='sidebar'>
                <div className='aside-top' style={{ padding: "20px" }}>
                    <Link to='/' className='brand-wrap'>
                        <img
                            src='./logo.png'
                            height='46'
                            className='logo'
                            alt='logo'
                        />
                    </Link>
                </div>

                <Menu mode='inline' theme='light' selectedKeys={selectedKeys}>
                    {sidebarData?.map((item) => {
                        if (item?.link?.length > 0) {
                            return (
                                <Menu.SubMenu
                                    key={item?.id}
                                    title={translate(item?.title)}
                                    icon={item?.icon}
                                >
                                    {item?.link?.map((el) => {
                                        return (
                                            <Menu.Item
                                                key={el?.id}
                                                icon={el?.icon}
                                            >
                                                <NavLink to={el?.exact} exact>
                                                    <span>
                                                        {translate(el?.title)}
                                                    </span>
                                                </NavLink>
                                            </Menu.Item>
                                        );
                                    })}
                                </Menu.SubMenu>
                            );
                        } else {
                            return (
                                <Menu.Item key={item?.id} icon={item?.icon}>
                                    <NavLink to={item?.path} exact>
                                        {/* {item?.icon} */}
                                        {translate(item?.title)}
                                    </NavLink>
                                </Menu.Item>
                            );
                        }
                    })}
                </Menu>
            </aside>
        </>
    );
}

export default Sidebar;

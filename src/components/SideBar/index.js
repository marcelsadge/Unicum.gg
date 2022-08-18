import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaBars } from 'react-icons/fa';

const SideBarComponent = styled.div`
    background-color: black;
    position: fixed;
    height: 100%;
    width: 300px;
    animation: ${props => props.open ? openSideBar : closeSideBar} .5s;

    > svg {
        position: fixed;
        color: #fff;
        height: 50px;
        width: 25px;
        margin-top: 10px;
        margin-left: 240px;
        cursor: pointer;
    }
`

const openSideBar = keyframes`
    from {
        opacity: 0;
        width: 0;
    } to {
        opacity: 1;
        width: 300px;
    }
`

const closeSideBar = keyframes`
    from {
        opacity: 1;
        width: 300px;
    } to {
        opacity: 0;
        width: 0;
    }
`

function SideBar({ show }) {
    const [isOpen, setIsOpen] = useState(true);

    const collapseSidebar = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                show(false);
            }, '300');
        }
    }, [isOpen]);
    
    return (
        <SideBarComponent open={isOpen}>
            <FaBars
                onClick={collapseSidebar}
            />
        </SideBarComponent>
    );
}

export default SideBar;

import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import styled, { keyframes } from 'styled-components';
import SideBar from '../SideBar';

const SideContainer = styled.div`
  display: flex;
  height: 100px;

  > svg {
    position: fixed;
    color: white;
    height: 50px;
    width: 25px;
    margin-top: 10px;
    margin-left: 30px;
    cursor: pointer;
  }
`

function PageHeader() {
  const [sidebar, setSidebar] = useState(false);
  const displaySideBar = () => {
    setSidebar(!sidebar);
  };

    return (
      <SideContainer>
        <FaBars onClick={displaySideBar}/>
          {sidebar && <SideBar show={setSidebar}/>}
      </SideContainer>
    );
};

export default PageHeader;
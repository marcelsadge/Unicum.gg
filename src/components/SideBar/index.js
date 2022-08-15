import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import styled from 'styled-components';

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
function SideBar() {
  const [sidebar, setSidebar] = useState(false);

  const displaySideBar = () => {
    setSidebar(!sidebar);
  };

    return (
      <SideContainer>
        <FaBars onClick={displaySideBar}/>

      </SideContainer>
    );
};

export default SideBar;
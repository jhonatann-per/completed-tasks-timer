import { Timer, Scroll } from '@phosphor-icons/react';
import { NavLink } from 'react-router-dom';
import { HeaderContainer } from './styles';
import logo from '../../assets/IgniteLogo.svg';

export function Header() {
  return (
    <HeaderContainer>
      <img src={logo} alt="" />
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
}

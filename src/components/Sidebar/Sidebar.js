// @flow strict
import React, {useState} from 'react';
import Author from './Author';
import Contacts from './Contacts';
import Copyright from './Copyright';
// import Menu from './Menu';
import styles from './Sidebar.module.scss';
import { useSiteMetadata } from '../../hooks';
import { Route } from 'react-router-dom';
type Props = {
  isIndex?: boolean,
};

const Sidebar = ({ isIndex }: Props) => {
  const { author, copyright, menu } = useSiteMetadata();
  const [searchQuery, setSearchQuery] = useState(window.location.search.replace(/\?filter=/g, ''))
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    window.location.href = `/search?filter=${e.target.value}`;
  }

  return (
    <div className={styles['sidebar']}>
      <div className={styles['sidebar__inner']}>
        <Author author={author} isIndex={isIndex} />
        {/* <Menu menu={menu} /> */}
        <Contacts contacts={author.contacts} />
        {/* <Route render={({ history}) => ( */}
            <div className={styles['search__container']}>
              <input className={styles['search__input']} value={searchQuery} onChange={handleChange} type="text" placeholder="Search" />
            </div>
        {/* )} />    */}
        <Copyright copyright={copyright} />
      </div>
    </div>
  );
};

export default Sidebar;

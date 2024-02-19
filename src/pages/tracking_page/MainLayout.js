import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import NavbarVertical from 'components/navbar/vertical_tracking/NavbarVertical';
// import ProductProvider from 'components/app/e-commerce/ProductProvider';
// import CourseProvider from 'components/app/e-learning/CourseProvider';
import LeafletMapExample from './LeafletMapExample';

const MainLayout = () => {
  const { hash, pathname } = useLocation();
  const isKanban = pathname.includes('kanban');
  // const isChat = pathname.includes('chat');

  useEffect(() => {
    setTimeout(() => {
      if (hash) {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
      }
    }, 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={'container-fluid'}>
      <NavbarVertical />
      {/* <ProductProvider> */}
      {/* <CourseProvider> */}
      <div className={classNames('content', { 'pb-0': isKanban })}>
        <div className="mt-5">
          <LeafletMapExample />
        </div>
      </div>
      {/* </CourseProvider> */}
      {/* </ProductProvider> */}
    </div>
  );
};

export default MainLayout;

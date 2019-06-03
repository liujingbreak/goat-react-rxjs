import React from 'react';
import styles from './BaseRoute.module.scss';

const BaseRoute: React.FC<{className?: string}> = (props) => {
  const className = styles.BaseRoute + ' ' + (props.className ? props.className : '');
  return <section className={className}>{props.children}</section>;
};

export default BaseRoute;

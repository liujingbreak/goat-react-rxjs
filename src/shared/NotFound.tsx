import React from 'react';
import BaseRoute from '../common/BaseRoute';
import styles from './NotFound.module.scss';

const NotFound: React.FC = () => {
	return <BaseRoute className={styles.host}>
		<h1>We couldn't find what you were looking for, but you can check out some links below.</h1>
	</BaseRoute>;
}
export default NotFound;

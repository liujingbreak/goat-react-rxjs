import React from 'react';
import classnames from 'classnames';
import styles from './Animatable.module.scss';

export interface AnimProps {
	visible?: boolean;
}
export default class AnimatableComponent extends React.Component<AnimProps> {
	render() {
		return (
			<div className={classnames({[styles.hide]: !this.props.visible})}>
				{this.props.children}
			</div>
		);
	}
}


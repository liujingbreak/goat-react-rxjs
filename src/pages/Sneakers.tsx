import React from 'react';
// import BaseRoute from '../common/BaseRoute';
import {SneakerItem, sneakerStoreSubjects, SneakerList
} from '../store/SneakerSubjects';
import styles from './Sneakers.module.scss';
import { match, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import classnames from 'classnames';
import {tap} from 'rxjs/operators';
import {Subscription} from 'rxjs';

export default class Sneakers extends React.Component<{match: match}, SneakerList & {nextBtnDisabled: boolean}> {
	subs: Subscription[] = [];

	constructor(props: any) {
		super(props);
		this.fetchNextPage = this.fetchNextPage.bind(this);
		this.state = {
			nextBtnDisabled: false,
			...sneakerStoreSubjects.listData.getValue()
		};
	}

	async fetchNextPage() {
		this.setState({nextBtnDisabled: true});
		await sneakerStoreSubjects.getList(sneakerStoreSubjects.listData.getValue().page + 1);
		this.setState({nextBtnDisabled: false});
	}

	componentDidMount() {
		const unsub = sneakerStoreSubjects.listData
		.pipe(tap(listData => {
			this.setState(listData);
		})).subscribe();

		this.fetchNextPage();
		this.subs.push(unsub);
	}

	componentWillUnmount() {
		this.subs.forEach(sub => sub.unsubscribe());
	}
	render() {
		const listView = this.state.list.map(item => (
			<SneakerGridCell key={item.id} data={item} routeMatch={this.props.match}></SneakerGridCell>
		));
		return (
			<React.Fragment>
				<div className={styles.SneakerGrid + ' tst-sneaker-grid'}>
					{listView.concat(<span key={-1} className={styles.gridItemsTail}></span>)}
				</div>
				<Button variant="outlined" className={styles.nextPageBtn + ' ' + classnames({[styles.hide]: this.state.noMorePage})}
					onClick={this.fetchNextPage}
					disabled={this.state.nextBtnDisabled}>
					SEE MORE
				</Button>
			</React.Fragment>
		);
	}
}


class SneakerGridCell extends React.Component<{data: SneakerItem, routeMatch: match}> {
	onLinkRef(dom: any) {
		if (dom)
			dom.className = styles.SneakerGridCell;
	}

	render() {
		return <Link to={this.props.routeMatch.path + '/' + this.props.data.slug}
				innerRef={this.onLinkRef}>
			<div className={styles.cellContent}>
				<img src={this.props.data.grid_picture_url} alt={this.props.data.name} className={styles.cellImage}/>
				<div className={styles.name + ' tst-sneaker-name'}>{this.props.data.name}</div>
			</div>
		</Link>;
	}
}


import {Observable, of, asapScheduler} from 'rxjs';
import {throttleTime, map} from 'rxjs/operators';

export function trackError(err: Error, msg?: string) {
	console.log('TODO: error tracking', err, msg || '');
}

export function createMediaQuery() {
	const query2colMap: {[k: string]: number} = {
		'screen and (max-width: 599px)': 2,
		'screen and (min-width: 600px) and (max-width: 839px)': 3,
		'screen and (min-width: 840px) and (max-width: 1279px)': 4,
		'screen and (min-width: 1280px)': 6
	};

	if (typeof window !== 'undefined') {
		require('matchmedia-polyfill');
	}

	function mediaQuery() {
		let numCol = 2;
		Object.keys(query2colMap).some(query => {
			if (matchMedia(query).matches) {
			numCol = query2colMap[query];
			return true;
			}
			return false;
		});
		return numCol;
	}

	if (typeof window !== 'undefined') {
		return new Observable(subscriber => {
			subscriber.next();
			const lis = () => subscriber.next();
			window.addEventListener('resize', lis);
			return () => window.removeEventListener('resize', lis); 
		}).pipe(
			throttleTime(100, asapScheduler, {trailing: true, leading: true}),
			map(() => mediaQuery())
		);
	} else {
		return of(6);
	}
}


import React, {useEffect} from 'react';
import { match, Redirect } from 'react-router-dom';
// import BaseRoute from '../common/BaseRoute';
import styles from './SneakerDetail.module.scss';
import {sneakerStoreSubjects} from '../store/SneakerSubjects';

const doc = typeof window !== 'undefined' ? document : null;
interface Params {
  name: string;
}
const SneakerDetail: React.FC<{match: match<Params>}> = ({match: {params}}) => {

  const [fetchDone, setFetchDone] = React.useState(false);
  const [data, setData] = React.useState(sneakerStoreSubjects.itemData.getValue());

  useEffect(() => {
    const sub = sneakerStoreSubjects.itemData
    .subscribe(item => {
      if (doc && item) {
        doc.title = item.nickname;
      }
      setData(item);
    });

    sneakerStoreSubjects.getDetailBySlug(params.name)
    .then(() => setFetchDone(true));
    return () => sub.unsubscribe();
  }, [params.name]);

  return <div className={styles.content + ' tst-SneakerDetail'}>
    { data && fetchDone ? (
      <React.Fragment>
        <section className={styles.main}>
          <div className={styles.left}>
            <img src={data.main_picture_url} alt={data.name}/>
          </div>
          <div className={styles.right}><h3>{data.name}</h3></div>
        </section>
        <section className={styles.story} dangerouslySetInnerHTML={{__html: data.story_html}}></section>
      </React.Fragment>
    ) : ( !data && fetchDone ? <Redirect to='/sneakers'/> : '')}
  </div>;
};

export default SneakerDetail;

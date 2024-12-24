import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getAllFeeds,
  getOrdersFeeds
} from '../../services/slices/feeds-slice/feeds-slice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllFeeds());
  }, []);
  const orders: TOrder[] = useSelector(getOrdersFeeds);
  if (!orders.length) {
    return <Preloader />;
  }
  const handleGetFeeds = () => {
    dispatch(getAllFeeds());
  };
  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};

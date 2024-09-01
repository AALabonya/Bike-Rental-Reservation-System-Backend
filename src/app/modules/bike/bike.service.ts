import QueryBuilder from '../../builder/QueryBuilder';
import { searchableBikeId } from './bike.constant';
import { TBike } from './bike.interface';
import { Bike } from './bike.model';

const createBikeIntoDB = async (payload: TBike) => {
  const result = await Bike.create(payload);
  return result;
};

const getAllBikesFromDB = async (query: Record<string, unknown>) => {
  const bikeQuery = new QueryBuilder(Bike.find(), query)
    .search(searchableBikeId)
    .filter()
    .sort()
    .paginate()
    .fields();
  const meta = await bikeQuery.countTotal();
  const data = await bikeQuery.modelQuery;

  return {
    meta,
    data,
  };
};
const getSingleBikes = async (id: string) => {
  const result = await Bike.findById(id);
  return result;
};
const updateBikes = async (id: string, payload: Partial<TBike>) => {
  const data = await Bike.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  console.log(data);

  return data;
};

const deleteBikes = async (id: string): Promise<TBike | null> => {
  const result = await Bike.findByIdAndDelete(id, { new: true });
  // console.log(result);

  return result;
};

export const BikeServices = {
  createBikeIntoDB,
  getSingleBikes,
  getAllBikesFromDB,
  updateBikes,
  deleteBikes,
};

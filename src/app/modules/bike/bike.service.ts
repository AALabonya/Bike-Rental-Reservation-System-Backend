import { TBike } from "./bike.interface"
import { Bike } from "./bike.model"

const createBikeIntoDB = async (payload: TBike) => {
	const result = await Bike.create(payload)
	return result
}

const getAllBikesFromDB = async () => {
	const result = await Bike.find()
	return result
}
const updateBikes = async (id: string, payload: Partial<TBike>) => {
    const data = await Bike.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });
    return data;
  };
  
  const deleteBikes = async (id: string): Promise<TBike | null> => {
    const result = await Bike.findByIdAndUpdate(
      id,{ isAvailable: false }, { new: true },
  );
  console.log(result);
  
  return result;
    
  };


export const BikeServices = {
	createBikeIntoDB,
	getAllBikesFromDB,
    updateBikes,
    deleteBikes
}
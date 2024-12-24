import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { getIngredientsState } from '../../services/slices/ingredients-slice/ingredients-slice';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const ingredientsSelector = useSelector(getIngredientsState);
  const { id } = useParams();
  console.log(id);
  const ingredientData = ingredientsSelector.ingredients.find(
    (el) => el._id === id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};

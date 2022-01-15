import { useEffect, useState } from 'react';
import { FiEdit3, FiTrash } from 'react-icons/fi';
import { Container } from './styles';
import { api } from '../../services/api';

interface FoodData {
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
  image: string;
}

interface FoodProps {
  food: FoodData;
  handleDelete: (id: number) => void;
  handleEditFood: (food: FoodData) => void;
}

export function Food({ food, handleDelete, handleEditFood } : FoodProps) {

  const [foodProps, setFoodProps] = useState(food);

  useEffect(() => {
    setFoodProps({...food});
  }, [food]);

  async function toggleAvailable() {

    const updatedFoodProps = {
      ...foodProps,
      available: !foodProps.available
    };

    api.put(`/foods/${foodProps.id}`, updatedFoodProps);
    setFoodProps(updatedFoodProps);
  }

  return (
    <Container available={foodProps.available} key={foodProps.id}>
      <header>
        <img src={foodProps.image} alt={foodProps.name} />
      </header>
      <section className="body">
        <h2>{foodProps.name}</h2>
        <p>{foodProps.description}</p>
        <p className="price">
          R$ <b>{foodProps.price}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={() => handleEditFood(foodProps)}
            data-testid={`edit-food-${foodProps.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(foodProps.id)}
            data-testid={`remove-food-${foodProps.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{foodProps.available ? 'Disponível' : 'Indisponível'}</p>

          <label htmlFor={`available-switch-${foodProps.id}`} className="switch">
            <input
              id={`available-switch-${foodProps.id}`}
              type="checkbox"
              checked={foodProps.available}
              onChange={toggleAvailable}
              data-testid={`change-status-food-${foodProps.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  )
}
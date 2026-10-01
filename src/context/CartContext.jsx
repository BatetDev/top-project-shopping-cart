import { createContext, useReducer } from 'react';

const initialState = [];

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.find(
        (item) => item.id === action.payload.product.id,
      );
      if (existing) {
        const updated = state.map((item) =>
          item.id === action.payload.product.id
            ? {
                ...item,
                quantity: Math.min(
                  item.quantity + action.payload.quantity,
                  action.payload.product.stock,
                ),
              }
            : item,
        );
        return updated;
      }
      const { id, title, price, thumbnail, stock } = action.payload.product;

      const added = [
        ...state,
        {
          id,
          title,
          price,
          thumbnail,
          stock,
          quantity: Math.min(action.payload.quantity, stock),
        },
      ];
      return added;
    }

    case 'REMOVE_ITEM': {
      return state.filter((item) => item.id !== action.payload);
    }

    case 'INCREASE_QUANTITY': {
      return state.map((item) =>
        item.id === action.payload
          ? {
              ...item,
              quantity: Math.min(item.quantity + 1, item.stock),
            }
          : item,
      );
    }

    case 'DECREASE_QUANTITY': {
      return state.map((item) =>
        item.id === action.payload
          ? {
              ...item,
              quantity: Math.max(item.quantity - 1, 1),
            }
          : item,
      );
    }

    case 'CLEAR_CART':
      return [];

    default:
      return state;
  }
}

import React, { useContext, Fragment } from "react";
import { Item, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { IngredientListItem } from "./IngredientListItem";
import IngredientStore from "../../app/stores/ingredientStore";

// const RecipeList: React.FC = () => {
//   const ingredientStore = useContext(IngredientStore);
//   const {ingredientsByDate} = ingredientStore;
//   return (
//     <Fragment>
//       {ingredientsByDate.map(([group, ingredients]) => (
//         <Fragment key={group} >
//           <Label size="large" color="blue">
//             {group}
//           </Label>
//           {/*  clearing removes any float to prevent flaoting funkiness */}
//           {/* adds divider between each item */}
//           <Item.Group divided>
//             {ingredients.map((ingredient) => (
//               <IngredientListItem key={ingredient.id} ingredient={ingredient} />
//             ))}
//           </Item.Group>
//         </Fragment>
//       ))}
//     </Fragment>
//   );
// };

// export default observer(RecipeList);
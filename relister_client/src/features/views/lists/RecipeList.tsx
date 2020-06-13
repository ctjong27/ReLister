import React, { useContext, Fragment } from "react";
import { Item, Label, Modal, Button, Header } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { IngredientListItem } from "../listitems/IngredientListItem";
import IngredientStore from "../../../app/stores/ingredientStore";
import AddRecipe from "../modals/AddRecipe";

const RecipeList = () => (
  <Modal trigger={<Button>Add Group</Button>}>
    <Modal.Header>Select a Photo</Modal.Header>
    <Modal.Content image>
      {/* <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' /> */}
      <Modal.Description>
        <Header>Default Profile Image</Header>
        <p>
          We've found the followiasdfng gravatar image associated with your e-mail
          address.
        </p>
        <p>Is it okay to use this photo?asdf</p>
        <Modal.Actions>
          <AddRecipe />
        </Modal.Actions>
      </Modal.Description>
    </Modal.Content>
  </Modal>
);

export default observer(RecipeList);

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

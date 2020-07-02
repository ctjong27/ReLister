import { useContext, useState } from "react";
import { Modal, Button } from "semantic-ui-react";
import React from "react";
import RecipeForm from "../forms/RecipeForm";
import { observer } from "mobx-react-lite";
import IngredientForm from "../forms/IngredientForm";
import UpdateAmountForm from "../forms/UpdateAmountForm";

interface IProps {
    ingredientId: string;
    actualAmount: number;
    filterType: string;
  }

const UpdateAmountModal: React.FC<IProps> = ({ingredientId, actualAmount, filterType}) => {
  const [modelIsOpen, triggerModalView] = useState<boolean>(false);

  const buttonLabel = (filterType==="shopping"?'Buy':'Use')

  return (
    <Modal
      onClose={() => triggerModalView(false)}
      closeIcon
      open={modelIsOpen}
      trigger={
        <Button
          floated="right"
          color="green"
          onClick={() => triggerModalView(true)}
        //   as="a"
          style={{ marginLeft: "0.5em" }}
        >
          {buttonLabel}
        </Button>
      }
    >
      <Modal.Header>{buttonLabel} Ingredient</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <UpdateAmountForm triggerModalView={triggerModalView} ingredientId={ingredientId} actualAmount={actualAmount} filterType={filterType}/>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default observer(UpdateAmountModal);

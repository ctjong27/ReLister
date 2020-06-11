import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

export const LoadingComponent: React.FC<{ // properties are not added as interface but are an object in type parameter
  inverted?: boolean;
  content?: string;
}> = ({ inverted=true, content }) => {
  return (
    <div>
      {/* dimmer will only show when it is active */}
      <Dimmer active inverted={inverted}>
        <Loader content={content} />
      </Dimmer>
    </div>
  );
};

import React, { useState, useEffect } from "react";
import { Container, Segment, Header, Button, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import NavBar from "../nav/NavBar";

const HomePage = () => {
  const [trigger, setTrigger] = useState<Boolean>(false);

  useEffect(() => {
    if (false) {
      setTrigger(true);
    } else {
      setTrigger(false);
    }
  }, []);

  var homebutton;
  if (trigger) {
    homebutton = (
      <Button as={Link} to="/activities" size="huge" inverted>
        Sign In to the ReLister!
      </Button>
    );
  } else {
    homebutton = (
      <Button as={Link} to="/shopping_list" size="huge" inverted>
        View Shopping Cart!
      </Button>
    );
  }

  return (
    // <Header as="h1" inverted>hello</Header>
    <Segment inverted textAlign="center" vertical className="masthead">
      <NavBar />
      <Container text>
        <Header as="h1" inverted>
          ReLister
        </Header>
        <Header
          as="h2"
          inverted
          content="Welcome to your shopping list, reimagined."
        />

        {homebutton}
      </Container>
    </Segment>
  );
};

export default HomePage;

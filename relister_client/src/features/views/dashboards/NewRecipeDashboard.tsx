import { Component } from "react"
import React from "react"
import { Button, Icon, Modal, ButtonGroup } from "semantic-ui-react"

class NewRecipeDashboard extends Component {
    state = { open: false }
  
    open = () => this.setState({ open: true })
    close = () => this.setState({ open: false })
  
    render() {
      const { open } = this.state
  
      return (
        <Modal
          open={open}
          onOpen={this.open}
          onClose={this.close}
          size='small'
          trigger={
            <ButtonGroup floated='right'>
              <Button 
            // primary 
            icon color='green'>
              Add New Recipe
              {/* <Icon name='right chevron' /> */}
              </Button>
            </ButtonGroup>
          }
        >
          <Modal.Header>Modal #2</Modal.Header>
          <Modal.Content>
            <p>That's everything!</p>
          </Modal.Content>
          <Modal.Actions>
            <Button icon='check' content='All Done' onClick={this.close} />
          </Modal.Actions>
        </Modal>
      )
    }
  }

export default NewRecipeDashboard